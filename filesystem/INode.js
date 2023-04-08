export class INode {
    parent = null;
    name = null;
    metadata = {}

    /**
     * Create a new inode
     * @param name  {string} - the name of this inode
     * @param parent {INode} - the parent inode
     */
    constructor(name, parent) {
        console.log('new inode');
        console.log(name);
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
        if (this.parent == null) {
            throw new Error('Cannot rename root directory');
        }
        if (this.parent.dir.has(name)) {
            throw new Error('Name already exists: ' + name);
        }

        this.parent.dir.delete(this.name); // delete from parent
        this.parent.dir.set(name, this); // add to parent

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
    constructor(name, parent, data) {
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
    }
}

/**
 * Class representing a directory
 * @extends INode
 */
export class Directory extends INode {
    dir = new Map();

    /**
     * Create a new directory
     * @param name {string}- the name of this directory
     * @param parent {INode} - the parent directory
     */
    constructor(name, parent) {
        if (name === '.' || name === '..') {
            throw new Error('Invalid directory name: ' + name);
        }

        console.log('new directory');
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
     * @returns {Map<name, INode>} - the entries
     */
    getEntries() {
        return this.dir;
    }

    /**
     * Add a child directory
     * @param name {string} - the name of the directory
     */
    addDirectory(name) {
        if (name === '.' || name === '..') {
            throw new Error('Invalid directory name: ' + name);
        }
        if (this.dir.has(name)) {
            throw new Error('Directory already exists: ' + name);
        }

        let dir = new Directory(name, this);
        this.dir.set(name, dir);
        return dir;
    }

    /**
     * Add a child file
     * @param name {string} - the name of the file
     * @param data {string} - the data for the file
     */
    addFile(name, data) {
        if (this.dir.has(name)) {
            throw new Error('File already exists: ' + name);
        }

        let file = new File(name, this, data);
        this.dir.set(name, file);
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
