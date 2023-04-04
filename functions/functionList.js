import help from './help.function.js';
import about from './about.function.js';
import man from './man.function.js';
import time from './time.function.js';
import print from './print.function.js';
import clear from './clear.function.js';
import repo from './repo.function.js';
import curl from './curl.function.js';
import rev from './rev.function.js';
import neofetch from './neofetch.function.js';

const list = {
    help,
    about,
    man,
    time,
    print,
    clear,
    repo,
    curl,
    rev,
    neofetch,
}

const functionList = new Map();

for (const [key, value] of Object.entries(list)) {
    functionList.set(key, value);
}

export default functionList;
