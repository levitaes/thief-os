import {Logger} from "./utils/Logger.js";
import {Dialog} from "./utils/dialog.js";
import {AppManager} from "./appManager.js";
import {FileSystem} from "./filesystem/FileSystem.js";
import {Terminal} from "./terminal.js";

const dialog = Dialog.globalInstance;
const terminal = new Terminal();

const os = {
    functions: new Map(),
    promiseResolve: null,
    promiseReject: null,
    /**
     * @deprecated
     * os.dialog.say should be used instead
     */
    say: dialog.sayRaw,
    /**
     * @deprecated
     * os.dialog.ask should be used instead
     */
    ask: dialog.ask,
    /**
     * @deprecated
     * os.dialog.next can be used instead, or just return
     */
    next: dialog.next,
    logger: Logger,
    dialog: dialog,
    fs: FileSystem.instance,
    terminal: terminal,
    wd: terminal.wd,
}

/**
 * Loads the functions into the os
 * @returns {Promise<unknown>}
 */
os.load = async () => {
    const {appList} = await import('./functions/functionList.js');
    await Promise.all(appList.apps.map(async (app) => {
        const path = `./${appList.path}/${app}`;
        await AppManager.instance.addApp(path);
    }));
}

/**
 * Runs the command
 * @param data {string} The command to run
 */
const runO = (data) => {
    return new Promise(async (resolve, reject) => {
        let args = data.trim().split(' ');
        const command = args.shift().toLowerCase();
        let options = {
            pipe: false,
        };

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

        // check if pipe is used
        if (args.includes('|')) {
            options.pipe = true;
            args = args.filter(e => e !== '|');
        }

        if (args.includes('>')) {
            options.pipe = true;
            options.mode = ">";
            options.path = args[args.indexOf('>') + 1];
            // remove all args after the >
            args = args.slice(0, args.indexOf('>'));
        }
        if (args.includes('>>')) {
            options.pipe = true;
            options.mode = ">>";
            options.path = args[args.indexOf('>>') + 1];
            // remove all args after the >>
            args = args.slice(0, args.indexOf('>>'));
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
            const output = await AppManager.instance.run(command, os, args, options);

            if (options.mode === ">" || options.mode === ">>") {
                const file = os.wd.getOrCreateFile(options.path);
                if (options.mode === ">") {
                    file.setData(output.join('\n'));
                    resolve();
                }
                if (options.mode === ">>") {
                    file.appendData(output.join('\n'));
                    resolve();
                }
            }


            resolve(output);
        } catch (error) {
            dialog.next(error);
            console.log(error);
        }
        resolve();
    });
}

/**
 * Split the command by | and run each command
 * @param data {string} The commands to run
 */
os.run = (data) => {
    return new Promise(async (resolve, reject) => {
        const tmp = data.replaceAll('|', '|;:');
        const commands = tmp.split(';:');
        let lastOutput = [];

        for (let command of commands) {

            if (command === '') continue;

            let string = "";

            const parts = command.split(' ')
            // check for alias
            if (Terminal.instance.alias.has(parts[0])) {
               //replace alias with the command
                parts[0] = Terminal.instance.alias.get(parts[0]);
                command = parts.join(' ');
                console.log("alias", command);
            }

            // find > and >>, remove them from the command and put them at the end of the generated command
            if (command.includes('>')) {
                string = "> " + command.split('>')[1].trim();
                command = command.split('>')[0].trim();
            }
            if (command.includes('>>')) {
                string = ">> " + command.split('>>')[1].trim();
                command = command.split('>>')[0].trim();
            }

            const cmd = `${command} ${lastOutput.join(' ')} ${string}`
            lastOutput = await runO(cmd) ?? [];
        }
        resolve();
    });
}


await os.load();
export default os;
