const os = {
    functions: new Map(),
    promiseResolve: null,
    promiseReject: null,
    say: (message) => {
        console.log(message);
    },
    // fs: null,
}

/**
 * Loads the functions into the os
 * @returns {Promise<unknown>}
 */
os.load = () => {
    return new Promise(async (resolve, reject) => {
        import('./functions/functionList.js').then((module) => {
            os.functions = module.default;
            resolve();
        }).catch((error) => {
            reject(error);
        });
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
    if (!this.functions.has(command)) {
        this.next('function doesnt exist');
        return;
    }

    // check if the command has the correct amount of arguments
    if (this.functions.get(command).arguments !== -1) {
            
        if (args.length > this.functions.get(command).arguments) {
        os.next('too many arguments');
        return;
        }

        if (args.length < this.functions.get(command).arguments) {
            os.next('not enough arguments');
            return;
        }
    }

    try {
        // run the command
        this.functions.get(command).execute(this, args);
    }
    catch (error) {
        next(error);
    }

}

await os.load();
export default os;
