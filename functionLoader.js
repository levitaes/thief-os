
const app = {
    functions: new Map(),
    promiseResolve: null,
    promiseReject: null,
    say: (message) => {
        console.log(message);
    }
}

app.load = () => {
    return new Promise(async (resolve, reject) => {
        import('./functions/functionList.js').then((module) => {
            app.functions = module.default;
            resolve();
        }).catch((error) => {
            reject(error);
        });
    });
}

app.run = function (data) {
    const args = data.split(' ');
    const command = args.shift().toLowerCase();

    if (!this.functions.has(command)) {
        this.ask('Command not found');
        return;
    }

    try {
        if (args[0] === '-h') {
            this.say(this.functions.get(command).description);
            return;
        }

        this.functions.get(command).execute(this, args);
    }
    catch (error) {
        say(error);
    }

}

app.load();

export default app;