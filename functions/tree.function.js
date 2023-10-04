import {WorkingDirectory} from "../filesystem/FileSystem.js";
import {Directory} from "../filesystem/INode.js";

export default {
    name: 'tree',
    description: 'show the file system tree',
    execute(os, args) {
        let wd = new WorkingDirectory()
        let root = wd.fs.root

        function draw(root, depth) {
            depth += "&nbsp;&nbsp;"
            let current = root
            let children = current.dir.values()
            for (let child of children) {
                if (child instanceof Directory) {
                    os.dialog.sayRaw(`${depth}└>${child.name}`);
                    draw(child, depth);
                } else {
                    os.dialog.sayRaw(`&nbsp;&nbsp;${depth}└>${child.name}`);
                }
            }
        }
        os.dialog.say(root.name);
        draw(root, "");

    }
};
