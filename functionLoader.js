import {Logger} from "./utils/Logger.js";
import {Dialog} from "./utils/dialog.js";
import {AppManager} from "./appManager.js";
import {FileSystem} from "./filesystem/FileSystem.js";
import {Terminal} from "./terminal.js";

import Fuse from 'https://cdn.jsdelivr.net/npm/fuse.js@6.6.2/dist/fuse.esm.js' // ToDo: use a local version instead


const dialog = Dialog;
const terminal = new Terminal();

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
    dialog: dialog,
    fs: FileSystem.instance,
    terminal: terminal,
}

/**
 * Loads the functions into the os
 * @returns {Promise<unknown>}
 */
os.load = async () => {
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
os.run =  (data) =>{
    return new Promise(async (resolve, reject) => {
        const args = data.trim().split(' ');
        const command = args.shift().toLowerCase();

        // check if the command exists
        if (!AppManager.instance.apps.has(command)) {
            os.dialog.next('function doesnt exist');
            Logger.info(` ${command}: function doesnt exist`);
            let keys = Array.from(AppManager.instance.apps.keys());
            const fuse = new Fuse(keys, {
                threshold: 0.8,
            });
            const result = fuse.search(command);
            if (result.length > 0) {
                os.dialog.next(`did you mean ${result[0].item}?`);
            }
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
            // await AppManager.instance.apps.get(command).execute(this, args);
            await AppManager.instance.run(command, os, args);
        } catch (error) {
            Dialog.next(error);
            console.log(error);
        }
        resolve();
    });
}


await os.load();
export default os;
