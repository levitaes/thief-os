import {Logger} from "./utils/Logger.js";
import {Dialog} from "./utils/dialog.js";
import {AppManager} from "./appManager.js";

const os = {
    functions: new Map(),
    promiseResolve: null,
    promiseReject: null,
    say: (message) => {
        console.log(message);
    },
    logger: Logger,
    dialog: Dialog,
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
    const args = data.split(' ');
    const command = args.shift().toLowerCase();

    // check if the command exists
    if (!AppManager.instance.apps.has(command)) {
        this.next('function doesnt exist');
        Logger.info(` ${command}: function doesnt exist`);
        return;
    }

    // check if the command has the correct amount of arguments
    if (AppManager.instance.apps.get(command).arguments !== -1) {

        if (args.length > AppManager.instance.apps.get(command).arguments) {
            os.next('too many arguments');
            return;
        }

        if (args.length < AppManager.instance.apps.get(command).arguments) {
            os.next('not enough arguments');
            return;
        }
    }

    try {
        // run the command
        AppManager.instance.apps.get(command).execute(this, args);
    } catch (error) {
        next(error);
    }

}

await os.load();
export default os;
