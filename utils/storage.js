import {WorkingDirectory} from "../filesystem/FileSystem.js";

/**
 * A simple storage class
 * @Param {string} nameSpace
 */
export default class Storage {

    /**
     * @type {Map<string, Object>}
     */
    storage= new Map();

    /**
     * @type {string}
     */
    nameSpace = ""

    /**
     * @type {WorkingDirectory}
     */
    wd = null;

    constructor(nameSpace) {
        this.nameSpace = nameSpace;
        this.wd = new WorkingDirectory();
        this.wd.goDirByPath(`/var/opt`);
        this.load();
    }
    /**
     * Get the value of a key
     * @param {string} key
     * @returns {Object}
     */
    get(key) {
        return this.storage.get(key);
    }
    /**
     * Set the value of a key
     * @param {string} key
     * @param {Object} value
     */
    set(key, value) {
        this.storage.set(key, value);
        this.save();
    }
    /**
     * Delete a key
     * @param {string} key
     */
    delete(key) {
        this.storage.delete(key);
        this.save();
    }
    /**
     * Check if a key exists
     * @param {string} key
     * @returns {boolean}
     */
    has(key) {
        return this.storage.has(key);
    }

    /**
     * Save the storage to the disk
     */
    save() {
        const file  = this.wd.getChild(this.nameSpace) || this.wd?.getCurrent().addFile(this.nameSpace);
        file.setData(JSON.stringify([...this.storage]));
    }

    /**
     * Load the storage from the disk
     */
    load() {
        const file = this.wd.getChild(this.nameSpace);
        if (file) {
            this.storage = new Map(JSON.parse(file.getData()));
        }
    }

    /**
     * Clear the storage
     */
    clear() {
        this.storage.clear();
        this.save();
    }
}


