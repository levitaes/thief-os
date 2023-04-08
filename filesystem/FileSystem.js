import {INode, File, SysLink, Device, Directory} from "./INode.js";

/**
 * @class FileSystem
 * @description The file system is a singleton class that represents the file system.
 * It is a tree of directories and files.
 */
export class FileSystem {
    static instance = null;
    /**
     * @property {Directory} root
     * @description The root directory of the file system.
     */
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

// const fs = new FileSystem();
// window.fs = fs;

// export default FileSystem;