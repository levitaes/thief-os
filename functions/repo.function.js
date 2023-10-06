import {AppManager} from "../appManager.js";

export default {
    name: 'repo',
    description: [
        'repo count (output available functions as integer)',
        'repo list (list available functions)',
        'repo install (install function)',
        'repo remove (remove function)'], // arguments: 1,
    repositories: [["default", "/functions"], ["stable", "https://cdn.jsdelivr.net/gh/thief-hub/thief-os-stable/functions"]],
    async execute(os, args) {
        switch (args[0]) {
            case "count":
                os.next(AppManager.instance.apps.size);
                break;
            case "list":
                os.next(Array.from(AppManager.instance.apps.keys()));
                break;
            case "install":
            case "i":
                if (args.length !== 2) {
                    os.next("please specify a command");
                    return;
                }

                const repositories = await this.storage.get("repositories") ?? []
                this.repositories.push(...repositories);

                const command = args[1];
                for (const ele of this.repositories) {
                    try {
                        const url = `${ele[1]}/${command}.function.js`;
                        const res = await fetch(url);
                        if (res.status === 200) {
                            await AppManager.instance.addApp(url);
                            os.next("command installed");
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
                if (AppManager.instance.apps.has(args[1])) {
                    AppManager.instance.removeApp(args[1]);
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
                if(!args[1].includes("https://")) {
                    os.next("please specify a valid url");
                    return;
                }

                const tmp = await this.storage.get("repositories") ?? [];
                for (const ele of tmp) {
                    if (ele[1] === args[1]) {
                        os.next("repository already exists");
                        return;
                    }
                }
                tmp.push([`repo${tmp.length}`, args[1]]);
                await this.storage.set("repositories", tmp);
                os.logger.info(`added repository ${args[1]}`);
                os.next("repository added");
                break;

            case "purge":
                if (args.length !== 2) {
                    os.next("please specify a function");
                    return;
                }

                if (AppManager.instance.apps.has(args[1])) {
                    AppManager.instance.apps.get(args[1]).storage.clear();
                    os.next("storage cleared");
                }
                break;

            default:
                os.next("argument doesnt exist");
                break;
        }
    },
};
