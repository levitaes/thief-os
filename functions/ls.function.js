import {Directory} from "../filesystem/INode.js";

export default {
    name: 'ls',
    description: 'list files',
    arguments: 0,
    execute(os, args) {
        console.log(os.fs.root.getEntries());
        for(let [key, value] of os.wd.getChildren()) {
            const color = value instanceof Directory ? '#0000ff' : '#00ff00';
            os.say(`<span style="color: ${color}">${key}</span>`);
        }
        os.next();
    }
};
