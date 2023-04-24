import {Logger} from "./utils/Logger.js";
import {Dialog} from "./utils/dialog.js";
import {AppManager} from "./appManager.js";
import {FileSystem} from "./filesystem/FileSystem.js";

const os = {
    functions: new Map(),
    promiseResolve: null,
    promiseReject: null,
    /**
     * @deprecated
     * os.dialog.say should be used instead
     */
    say: Dialog.sayRaw,
    /**
     * @deprecated
     * os.dialog.ask should be used instead
     */
    ask: Dialog.ask,
    next: Dialog.next,
    logger: Logger,
    dialog: Dialog,
    fs: FileSystem.instance,
}

/**
 * Loads the functions into the os
 * @returns {Promise<unknown>}
 */
os.load = async() => {
    return new Promise(async (resolve, reject) => {
        const {appList} = await import('./functions/functionList.js');
        for (const app of appList.apps) {
            const path = `./${appList.path}/${app}`;
            await AppManager.instance.addApp(path);
        }
        resolve();
    });
}

/**
 * Runs the command
 * @param data {string} The command to run
 */
os.run = function (data) {
    return new Promise((resolve, reject) => {
        const args = data.split(' ');
        const command = args.shift().toLowerCase();

        // check if the command exists
        if (!AppManager.instance.apps.has(command)) {
            this.next('function doesnt exist');
            Logger.info(` ${command}: function doesnt exist`);
            resolve();
            return;
        }

        // check if the command has the correct amount of arguments
        if (AppManager.instance.apps.get(command).arguments !== -1) {

            if (args.length > AppManager.instance.apps.get(command).arguments) {
                os.next('too many arguments');
                resolve();
                return;
            }

            if (args.length < AppManager.instance.apps.get(command).arguments) {
                os.next('not enough arguments');
                resolve();
                return;
            }
        }

        try {
            // run the command
            AppManager.instance.apps.get(command).execute(this, args);
        } catch (error) {
            Dialog.next(error);
        }
        resolve();
    });

}

await os.load();
export default os;
