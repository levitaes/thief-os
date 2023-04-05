import {INode, File, SysLink, Device, Directory} from "./INode.js";

class FileSystem {
    static instance = null;
    root = null;

    constructor() {
        console.log("FileSystem constructor");
        if (FileSystem.instance == null) {
            FileSystem.instance = this;
            this.root = new Directory("/", null);
        }
        return FileSystem.instance;
    }
}
const fs = new FileSystem();
window.fs = fs;

export default FileSystem;