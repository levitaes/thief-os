import {Directory, File} from "../filesystem/INode.js";

export default {
    name: 'stat',
    description: 'show stats of file',
    arguments: ["file"],
    execute(os, args) {
        const file = os.wd.fs.getNodeByPath(args[0]);
        if(!file) return os.dialog.next("File not found");

        os.dialog.say(`File: ${file.name}`);
        os.dialog.say(`Type: ${file.getType()}`);
        os.dialog.say(`Size: ${file.getSize()}`);
        os.dialog.say(`Owner: ${file.getMetadata().owner.uid}`);
        os.dialog.say(`Permissions: ${file.getMetadata().permissions.read ? 'r' : '-'}${file.getMetadata().permissions.write ? 'w' : '-'}${file.getMetadata().permissions.execute ? 'x' : '-'}`);
        os.dialog.say(`Created: ${new Date(file.getMetadata().created)}`);
        os.dialog.say(`Modified: ${new Date(file.getMetadata().modified)}`);
        os.dialog.say(`Accessed: ${new Date(file.getMetadata().accessed)}`);

        os.dialog.next();
    }
};
