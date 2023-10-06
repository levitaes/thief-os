import {Logger} from "./utils/Logger.js";
import storage from "./utils/storage.js";
import {WorkingDirectory} from "./filesystem/FileSystem.js";
import {Dialog} from "./utils/dialog.js";

/**
 * AppManager class
 */
export class AppManager {

    /**
     * static instance of the class
     * @type {AppManager}
     */
    static instance = null;

    /**
     * List of apps
     * @type {Map<string, Object>}
     */
    apps = new Map();


    /**
     * List of running apps
     * @type {Map<Number, Process>}
     */
    runningApps = new Map();

    /**
     * The foreground app
     * @type {Process}
     */
    foregroundApp = null;


    lastPid = 0;

    constructor() {
        if (AppManager.instance === null) {
            AppManager.instance = this;
        }
        return AppManager.instance;
    }

    /**
     * Add an app to the os
     * @param url {string} - the function
     */
    async addApp(url) {
        try {
            if (this.hasApp(url)) {
                return;
            }
            /**
             * @type {Object}
             */
            const func = (await import(url)).default;
            Object.defineProperty(func, "source", {value: url, writable: false});
            Object.defineProperty(func, "nameSpace", {value: `default-${func.name}`, writable: false});
            const sto = new storage(func.nameSpace);
            Object.defineProperty(func, "storage", {value: sto, writable: false});
            this.apps.set(func.name, func);
        } catch (e) {
            Logger.error(`Failed to load function ${url}`);
        }
        this.save();
    }

    /**
     * Remove an app from the os
     * @param app {string} - the Name of the app
     * @returns {boolean} - true if the app was removed
     */
    removeApp(app) {
        if (this.apps.has(app)) {
            this.apps.delete(app);
            return true;
        }
        return false;
    }

    /**
     * Get app list
     * @returns {Map<string, Object>}
     */
    getAppList() {
        return this.apps;
    }

    /**
     * saves the apps to the apps.json file
     */
    save() {
        const wd = new WorkingDirectory();
        wd.goDirByPath("bin");
        const file = wd.getOrCreateFile("apps.json");
        let data = "";
        for (const [key, value] of this.apps) {
            data += value.source + "\n";
        }
        file.setData(data);
    }

    /**
     * Load the apps from the apps.json file
     * @returns {Promise<void>}
     */
    async load() {
        const wd = new WorkingDirectory();
        wd.goDirByPath("bin");
        const file = wd.getOrCreateFile("apps.json");
        const data = file.getData();
        const lines = data.split("\n");
        for (const line of lines) {
            if (line !== "") {
                await this.addApp(line);
            }
        }
    }


    /**
     * Check if the app is installed
     * @param url {string} - the url of the app
     * @returns {boolean} - true if the app is installed
     */
    hasApp(url) {
        for (const [key, value] of this.apps) {
            if (value.source === url) {
                return true;
            }
        }
        return false;
    }

    /**
     * Try to run the command
     * @param command {string}
     * @param context {Object}
     * @param args {string[]}
     * @param options {Object}
     */
    async run(command, context, args, options = {}) {
        try {
            if (!this.apps.has(command)) {
                return;
            }
            const obj = this.apps.get(command);
            const dia = new Dialog(options.pipe);
            // ToDo: creat just one os, see functionLoader.js
            const os = {
                wd: context.wd,
                functions: context.functions,
                promiseResolve: context.promiseResolve,
                promiseReject: context.promiseReject,
                logger: context.logger,
                fs: context.fs,
                terminal: context.terminal,
                dialog: dia,
                next: dia.next,
                say: dia.say,
                ask: dia.ask,
            }

            const app = new Process(obj, os, args);
            this.foregroundApp = app;
            await app.run();
            this.foregroundApp = null;
            this.runningApps.delete(app.pid);
            return app.os.dialog.buffer;

        } catch (e) {
            Logger.error(e);
        }
    }

    /**
     * Stop the foreground app
     * @returns {Promise<void>}
     */
    async stopForegroundApp() {
        if (this.foregroundApp !== null) {
            console.log("stop foreground app");
            console.log(this.foregroundApp);
            // this.foregroundApp.destructor();
            this.foregroundApp.stopPromise();
            this.foregroundApp = null;
        }
    }

}


class Process {
    /**
     * The pid of the process
     * @type {number}
     */
    pid

    /**
     *  The process Object
     */
    process = null;

    /**
     * The context of os
     */
    os = null;

    /**
     * The arguments of the process
     * @type {string[]}
     */
    args = null;

    /**
     * The promise to stop the process
     * @type {function}
     */
    stopPromise = null;

    /**
     * Constructor
     * @param process {Object} - The process object
     * @param os {Object} - The context of os
     * @param args {string[]} - The arguments of the process
     */
    constructor(process, os, args) {
        this.process = process;
        this.os = os;
        this.args = args;
        AppManager.instance.lastPid++;
        this.pid = AppManager.instance.lastPid;
        AppManager.instance.runningApps.set(this.pid, this);
        this.process.execute = this.process.execute.bind(this.process);
        Object.defineProperty(this.process, "pid", {value: this.pid, writable: true});
        // this.run();
        return this.pid;
    }

    /**
     * Destructor
     */
    destructor() {
        AppManager.instance.runningApps.delete(this.pid);
    }

    /**
     * Run the process
     * @returns {Promise<unknown>}
     */
    run() {
        // const originalExecute = this.process.execute;
        // this.process.execute = async () => {
        //
        //     const stopPromise = new Promise((resolve, reject) => {
        //         this.stopPromise = resolve;
        //
        //     });
        //     await Promise.race([originalExecute(this.os, this.args), stopPromise]);
        // }
        return new Promise(async (resolve, reject) => {
            await this.process.execute(this.os, this.args);
            resolve();
        });


    }


}
