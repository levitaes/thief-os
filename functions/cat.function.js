import {File} from '../filesystem/INode.js'
export default {
    name: 'cat',
    description: 'cat (show file contents)',
    arguments: ["file"],
    execute(os, args) {
        const path = args[0];
        if(!path) return os.next();
        const file = os.wd.getFile(path);
        if(file instanceof File) {
            os.dialog.say(file.getData());
        } else {
            os.dialog.say(`cat: ${path}: No such file`);
        }
        os.next();
    }
};
