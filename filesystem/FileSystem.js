import {INode, File, SysLink, Device, Directory} from "./INode.js";

class FileSystem {
    static instance = null;
    root = null;

    constructor() {
        console.log("FileSystem constructor");
        if (FileSystem.instance == null) {
            FileSystem.instance = this;
            this.root = new Directory("/", null);
            new Directory("dev", this.root);
            const home =new Directory("home", this.root);
            new Directory("usr", this.root);
            new Directory("bin", this.root);
            new Directory("etc", this.root);
            new File("README.md", home, "This is a README file.");
        }
        return FileSystem.instance;
    }
}

const fs = new FileSystem();
window.fs = fs;

export default FileSystem;