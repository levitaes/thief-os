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

/**
 * @class WorkingDirectory
 * @description The working directory is a class that represents the current directory.
 */
export class WorkingDirectory {
    fs = null;
    current = null;

    constructor() {
        this.fs = FileSystem.instance;
        this.current = this.fs.root;
    }

    /**
     * go one Directory up
     * @returns {Directory}
     */
    goDirUp() {
        if (this.current.parent != null) {
            this.current = this.current.parent;
        }
        return this.current;
    }

    /**
     * go to a child directory
     * @param {String} name
     * @returns {Directory}
     */
    goDir(name) {
        const child = this.current.dir.get(name);
        if (child instanceof Directory) {
            this.current = child;
        }
        return this.current;
    }

    /**
     * go to directory by path
     * @param {String} path
     * @returns {Directory}
     */
    goDirByPath(path) {
        const parts = path.split("/");
        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            console.log(part);
            if (part === "..") {
                this.goDirUp();
            } else if(part === "") {
                this.current = this.fs.root;
            }else if (part !== "") {
                this.goDir(part);
            }
        }
        return this.current;
    }

    /**
     * get all children of the current directory
     * @returns {Map<String, INode>}
     */
    getChildren() {
        return this.current.dir;
    }

    /**
     * get a child of the current directory
     * @param {String} name
     * @returns {INode}
     */
    getChild(name) {
        return this.current.dir.get(name);
    }

    /**
     * get the current directory
     * @returns {Directory}
     */
    getCurrent() {
        return this.current;
    }
}