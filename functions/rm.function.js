import {Directory} from "../filesystem/INode.js";

export default {
    name: 'rm',
    description: 'remove (remove a file)',
    arguments: ["file"],
    execute(os, args) {
        const path = args.at(-1);
        console.log(path);
        const arg = args.length > 1 ? args[0] : null;
        try {
            const target = os.wd.getFile(path);
            if(target instanceof Directory && arg !== "-R") {
                os.say(`rm: cannot remove '${path}': It is a directory`);
                return;
            }
            target.delete();
        } catch (e) {
            os.say(`rm: cannot remove '${path}'`);
        }
    }
};
