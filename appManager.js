import {Logger} from "./utils/Logger.js";
import storage from "./utils/storage.js";
import {WorkingDirectory} from "./filesystem/FileSystem.js";

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
     * saves the apps
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
     * Load the apps
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
}