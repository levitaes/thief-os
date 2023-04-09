import {File} from '../filesystem/INode.js'
export default {
    name: 'cat',
    description: 'cat',
    arguments: 1,
    execute(os, args) {
        const path = args[0];
        const file = os.wd.getChild(path);
        if(file instanceof File) {
            os.say(file.getData());
        } else {
            os.say(`cat: ${path}: No such file`);
        }
        os.next();
    }
};
