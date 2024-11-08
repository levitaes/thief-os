import {AppManager} from "../appManager.js";

export default {
    name: 'repo',
    description: [
        'repo count (output available functions as integer)',
        'repo list (list available functions)',
        'repo install (install function)',
        "repo add (add an repository",
        "repo re (add recommended repositories",
        'repo remove (remove function)',
        "repo purge (remove all data of function"], // arguments: 1,
    repositories: [["default", "/functions"], ["stable", "https://cdn.jsdelivr.net/gh/thief-hub/thief-os-stable/functions"]],
    arguments: [["count", "list", "install", "remove", "add", "purge", "re", "-h"]],
    async execute(os, args) {

        const addRepo = async (url) => {
            const tmp = await this.storage.get("repositories") ?? [];
            for (const ele of tmp) {
                if (ele[1] === args[1]) {
                    os.dialog.next("repository already exists");
                    return;
                }
            }
            tmp.push([`repo${tmp.length}`, url]);
            await this.storage.set("repositories", tmp);
            os.logger.info(`added repository ${url}`);
            os.dialog.say("repository added");
        }

        switch (args[0]) {
            case "count":
                os.next(AppManager.instance.apps.size);
                break;
            case "list":
                os.next(Array.from(AppManager.instance.apps.keys()).join(", "));
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
                if (!args[1].includes("https://")) {
                    os.next("please specify a valid url");
                    return;
                }

                await addRepo(args[1]);
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

            case "re":
                if (RECOMMENDED_REPOS.length === 0) {
                    os.dialog.say("No recommended Repos found")
                    break;
                }

                for (const index in RECOMMENDED_REPOS) {
                    const app = RECOMMENDED_REPOS[index];
                    os.dialog.say(`${index}: ${app.name}, ${app.description}`);
                }
                const ans = Number(await os.dialog.ask("Which repo to add?"));
                console.log(Number(ans));
                if (!Number.isNaN(ans)) {
                    console.log("add")
                    await addRepo(RECOMMENDED_REPOS[ans].url);
                }

                break;
            case "-h":
                for (const ele of this.description) {
                    os.dialog.say(ele);
                }
                os.next();
                break;
            default:
                os.next("argument doesnt exist");
                break;
        }

    },
};


const RECOMMENDED_REPOS = [
    {
        name: "Beniox",
        description: "a few more or less useful tools",
        url: "https://cdn.jsdelivr.net/gh/beniox/beniox-repository@latest/functions"
    }
]
