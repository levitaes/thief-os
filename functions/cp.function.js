import {Directory} from "../filesystem/INode.js";

export default {
    name: 'cp',
    description: 'copy file [source] [destination]',
    arguments: ["file", "file"],
    execute(os, args) {
        if (args.length < 2) return os.dialog.next("cp: missing file operand");
        const source = os.wd.fs.getNodeByPath(args[0]);
        if (!source) return os.dialog.next("Source not found");

        const destination = os.wd.fs.getNodeByPath(args[1]);
        if (!destination) return os.dialog.next("Directory not found");
        if (!(destination instanceof Directory)) return os.dialog.next("Destination is not a directory");

        if (source === destination) return os.dialog.next("Source and destination are the same");
        try {
            os.wd.fs.copy(source, destination);
        } catch (e) {
            os.dialog.next(e.message);
        }
    }
};
