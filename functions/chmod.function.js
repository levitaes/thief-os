import {INode} from "../filesystem/INode.js";

export default {
    name: 'chmod',
    description: 'chmod',
    arguments: [[], "file"],
    execute(os, args) {
        const arg = args[0];
        const first = arg[0];
        const path = args[1];
        if(arg === "-h"){
            os.dialog.say(`chmod: chmod [-/+][rwx]`);
            return;
        }

        if(first !== "+" && first !== "-"){
            os.dialog.say("wrong");
            os.next();
            return;
        }

        const node = os.wd.getFile(path);
        if(!(node instanceof INode)) {
            os.dialog.say(`chmod: cannot access '${path}: No such file or directory`);
            return false;
        }

        const arr = arg.substring(1).split('');
        const per = first === "+";
        for(const item of arr){
            if(item === "r") {
                node.metadata.permissions.read = per;
            }
            if(item === "w") {
                node.metadata.permissions.write = per;
            }
            if(item === "x") {
                node.metadata.permissions.write = per;
            }
        }
        os.next();
    }
};
