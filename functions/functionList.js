import storage from "../utils/storage.js";

/**
 * List of paths to functions
 * @type {string[]}
 */
const arr = [
    "./help.function.js",
    "./about.function.js",
    "./man.function.js",
    "./time.function.js",
    "./print.function.js",
    "./clear.function.js",
    "./repo.function.js",
    "./curl.function.js",
    "./rev.function.js",
    "./ls.function.js",
    "./cd.function.js",
    "./mkdir.function.js",
    "./cat.function.js",
    "./touch.function.js",
    "./fs.function.js",
]
/**
 * List of functions
 * @type {Map<string, Function>}
 */
const functionList = new Map();

/**
 * Load functions from paths
 */
for (const ele of arr) {
    try {
        const func = (await import(ele)).default;
        Object.defineProperty(func, "source", {value: ele, writable: false});
        Object.defineProperty(func, "nameSpace", {value: `default-${func.name}`, writable: false});
        const sto = new storage(func.nameSpace);
        Object.defineProperty(func, "storage", {value: sto, writable: false});
        functionList.set(func.name, func);
    } catch (e) {
        console.warn(`Failed to load function ${ele}`);
        console.warn(e);
    }
}


export default functionList;
