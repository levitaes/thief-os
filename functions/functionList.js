import help from './help.function.js';
import about from './about.function.js';
import man from './man.function.js'

const list = {
    help,
    about,
    man
}

const functionList = new Map();

for (const [key, value] of Object.entries(list)) {
    functionList.set(key, value);
}

export default functionList;