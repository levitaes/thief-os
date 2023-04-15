// import help from './help.function.js';
// import about from './about.function.js';
// import man from './man.function.js';
// import time from './time.function.js';
// import print from './print.function.js';
// import clear from './clear.function.js';
// import repo from './repo.function.js';
// import curl from './curl.function.js';
// import rev from './rev.function.js';
// import ls from './ls.function.js';
// import cd from './cd.function.js';
// import mkdir from './mkdir.function.js';
// import cat from './cat.function.js';
// import touch from './touch.function.js';
//
// const list = {
//     help,
//     about,
//     man,
//     time,
//     print,
//     clear,
//     repo,
//     curl,
//     rev,
//     ls,
//     cd,
//     mkdir,
//     cat,
//     touch
// }

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
    "./touch.function.js"
]
/**
 * List of functions
 * @type {Map<string, Function>}
 */
const functionList = new Map();

// for (const [key, value] of Object.entries(list)) {
//     Object.defineProperty(value, "source", {value: `default/${key}.function.js`, writable: false});
//     functionList.set(key, value);
// }


/**
 * Load functions from paths
 */
for(const ele of arr) {
    try{
        const func = (await import(ele)).default;
        Object.defineProperty(func, "source", {value: ele, writable: false});
        Object.defineProperty(func, "nameSpace", {value: `default-${func.name}`, writable: false});
        const sto = new storage(func.nameSpace);
        Object.defineProperty(func, "storage", {value: sto , writable: false});
        functionList.set(func.name, func);
    }
    catch(e) {
        console.warn(`Failed to load function ${ele}`);
        console.warn(e);
    }
}




export default functionList;
