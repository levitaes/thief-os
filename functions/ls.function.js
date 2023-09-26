import {Directory} from "../filesystem/INode.js";

export default {
    name: 'ls',
    description: 'ls (list files and directories)',
    arguments: 0,
    execute(os) {
        for(let [key, value] of os.wd.getChildren()) {
            const color = value instanceof Directory ? '#92AEBE' : '#C4D3B2';
            // os.dialog.sayRaw(`<span style="color: ${color}">${key}</span>`);
            os.dialog.say(key, {color: color});
        }

        os.next();
    }
};
