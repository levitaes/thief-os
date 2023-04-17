import {FileSystem} from "./FileSystem.js";

/**
 * Abstract Inode class
 * @abstract
 * @class
 */
export class INode {
    /**
     * The parent inode
     * @type {INode}
     */
    parent = null;

    /**
     * The name of this inode
     * @type {string}
     */
    name = null;

    /**
     * The metadata for this inode
     * @type {Object}
     */
    metadata = {}

    /**
     * Create a new inode
     * @param name  {string} - the name of this inode
     * @param parent {INode} - the parent inode
     */
    constructor(name, parent) {
        if (parent) {
            errorIfChildWithNameExist(parent, name);
            parent.dir.set(name, this);
        }

        this.parent = parent;
        this.name = name;
        this.metadata = {
            permissions: {
                read: true, write: true, execute: true
            }, owner: {
                uid: 0, gid: 0
            }, created: new Date(), modified: new Date(), accessed: new Date()
        }
        return this;
    }

    /**
     * Get the parent INode
     * @returns {INode}
     */
    getParent() {
        return this.parent;
    }

    /**
     * Get name
     * @returns {string} - the name
     */
    getName() {
        return this.name;
    }

    /**
     * Get the metadata for this inode
     * @returns {Object} - the metadata
     */
    getMetadata() {
        return this.metadata;
    }

    /**
     * Rename this inode
     * @param name {string} - the new name
     */
    rename(name) {
        errorIfRoot(this);
        errorIfChildWithNameExist(this.parent, name);

        this.parent.dir.delete(this.name); // delete from parent
        this.parent.dir.set(name, this); // add to parent

        FileSystem.instance.save();
        this.name = name;
    }

    /**
     * Get full path
     * @returns {string} - the full path
     */
    getFullPath() {
        let path = this.name;
        let parent = this.parent;
        while (parent) {
            path = parent.name + '/' + path;
            parent = parent.parent;
        }
        return path;
    }

    /**
     * Move this inode to a new parent
     * @param newParent {INode} - the new parent
     */
    move(newParent) {
        errorIfRoot(this);
        errorIfChildWithNameExist(newParent, this.name);

        this.parent.dir.delete(this.name); // delete from old parent
        newParent.dir.set(this.name, this); // add to new parent

        this.parent = newParent; // update parent
        FileSystem.instance.save();
    }

    /**
     * Delete this inode
     */
    delete() {
        errorIfRoot(this);
        this.parent.dir.delete(this.name);
        delete this;
        FileSystem.instance.save();
    }

    /**
     * Test if INode is File
     * @returns {boolean} - true if file
     */
    isFile() {
        return (this === typeof File);
    }
}

/**
 * Class representing a file
 * @extends INode
 */
export class File extends INode {
    data = null;

    /**
     * Create a new file
     * @param name  {string} - the name of this file
     * @param parent {INode} - the parent directory
     * @param data {string}- the data for this file
     */
    constructor(name, parent, data = "") {
        super(name, parent);
        this.data = data;
    }

    /**
     * Get the data for this file
     * @returns {string} - the data
     */
    getData() {
        this.metadata.accessed = new Date();
        return this.data;
    }

    /**
     * Set the data for this file
     * @param data {string} - the data
     */
    setData(data) {
        this.data = data;
        this.metadata.modified = new Date();
        FileSystem.instance.save();
    }

    /**
     * Append data to this file
     * @param data {string} - the data
     */
    appendData(data) {
        this.data += data;
        this.metadata.modified = new Date();
        FileSystem.instance.save();
    }
}

/**
 * Class representing a directory
 * @extends INode
 */
export class Directory extends INode {
    /**
     * The entries in this directory
     * @type {Map<String, INode>}
     */
    dir = new Map();

    /**
     * Create a new directory
     * @param name {string}- the name of this directory
     * @param parent {INode} - the parent directory
     */
    constructor(name, parent) {
        errorIfInvalidDirName(name);

        super(name, parent);
    }

    /**
     * Get the inode for a name
     * @param name {string} - the name of the entry
     * @returns {INode}
     */
    getEntry(name) {
        return this.dir.get(name);
    }

    /**
     * Get the names of all entries in this directory
     * @returns {Map<String, INode>} - the entries
     */
    getEntries() {
        return this.dir;
    }

    /**
     * Add a child directory
     * @param name {string} - the name of the directory
     */
    addDirectory(name) {
        errorIfInvalidDirName(name);
        errorIfChildWithNameExist(this, name);

        let dir = new Directory(name, this);
        this.dir.set(name, dir);

        FileSystem.instance.save();
        return dir;
    }

    /**
     * Add a child file
     * @param name {string} - the name of the file
     * @param data {string} - the data for the file
     */
    addFile(name, data) {
        errorIfChildWithNameExist(this, name);

        let file = new File(name, this, data);
        this.dir.set(name, file);

        FileSystem.instance.save();
        return file;
    }
}

export class Device extends INode {
    constructor() {
        super();
    }
}

export class SysLink extends INode {
    constructor() {
        super();
    }
}


/**
 * Throw an error if the inode is the root directory
 * @param inode
 */
function errorIfRoot(inode) {
    if (inode.parent === null) {
        throw new Error('Cannot delete root directory');
    }
}

/**
 * Throw an error if the parent directory already has a child with the given name
 * @param dir {Directory} - the parent directory
 * @param name {string} - the name
 */
function errorIfChildWithNameExist(dir, name) {
    if (dir.dir.has(name)) {
        throw new Error('Name already exists: ' + name);
    }
}

/**
 * Throw an error if the name is invalid
 * @param name {string} - the name
 */
function errorIfInvalidDirName(name) {
    if (name === '.' || name === '..') {
        throw new Error('Invalid directory name: ' + name);
    }
}