
const os = {
    functions: new Map(),
    promiseResolve: null,
    promiseReject: null,
    say: (message) => {
        console.log(message);
    }
}

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

os.run = function (data) {
    const args = data.split(' ');
    const command = args.shift().toLowerCase();

    if (!this.functions.has(command)) {
        this.next('command not found');
        return;
    }

    try {
        if (args[0] === '-h') {
            this.next(this.functions.get(command).description);
            return;
        }

        this.functions.get(command).execute(this, args);
    }
    catch (error) {
        say(error);
    }

}

os.load();
export default os;
