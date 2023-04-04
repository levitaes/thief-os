export default {
    name: 'repo',
    description: ['repo count (output available functions as integer)', 'repo list (list available functions)'], // arguments: 1,
    repositories: new Map(),
    async execute(os, args) {
        switch (args[0]) {
            case "count":
                os.next(os.functions.size);
                break;
            case "list":
                os.next(Array.from(os.functions.keys()));
                break;
            case "install":
            case "i":
                if (args.length !== 2) {
                    os.next("please specify a command");
                    return;
                }

                // Standard repositories
                this.repositories.set("default", "/functions");
                this.repositories.set("stable", "https://cdn.jsdelivr.net/gh/thief-hub/thief-os-stable/functions"); // See https://stackoverflow.com/questions/17341122/link-and-execute-external-javascript-file-hosted-on-github

                const command = args[1];
                for (const [key, value] of this.repositories.entries()) {
                    console.log("checking repository " + key);
                    try {
                        const url = `${value}/${command}.function.js`;
                        const res = await fetch(url);
                        if (res.status === 200) {
                            const fn = await import(url);
                            os.functions.set(command, fn.default);
                            os.next("command installed");
                            console.log(os.functions);
                            return;
                        }
                    } catch (err) {
                    }
                }
                os.next(`could not find ${command} in any repository`);
                break;

            case "remove":
                if (args.length !== 2) {
                    os.next("please specify a function");
                    return;
                }
                if (os.functions.has(args[1])) {
                    os.functions.delete(args[1]);
                    os.next("command removed");
                } else {
                    os.next("command not found");
                }
                break;

            case "add":
                if (args.length !== 2) {
                    os.next("please specify a repository");
                    return;
                }
                console.log(args[1]);
                // TODO: check if repository exists
                this.repositories.set("custom", args[1]);
                console.log(this.repositories);
                os.next("repository added");
                break;
            default:
                os.next("argument doesnt exist");
                break;
        }
    },
};
