/**
 * Class Representing Input/Output Dialogs
 */
export class Dialog {

    /**
     * Output a message
     * @param {string} message - The message to output
     * @param {Object} config - The configuration object
     */
    static say(message, config ){
        console.log(message);
    }

    /**
     * Output a raw message
     * @param {string} message - The message to output
     */
    static sayRaw(message){
        push(message);
        pushBr();
    }

    /**
     * Output a message and wait for user input
     * @param {string} message - The message to output
     * @param {Object} config - The configuration object
     * @returns {Promise<string>}
     */
    static ask(message, config){
        console.log(message);
        return new Promise();
    }

    /**
     * Output a raw message and wait for user input
     * @param {string} message - The message to output
     * @returns {Promise<string>}
     */
    static askRaw(message){
        console.log(message);
        return new Promise();
    }

    /**
     * Output a message and wait for a yes/no response
     * @param {string} message - The message to output
     * @param {Object} config - The configuration object
     * @returns {Promise<boolean>}
     */
    static askYesNo(message, config){
        console.log(message);
    }
}

/**
 * Push a value to the Terminal
 * @param value {string}
 */
function push(value) {
    let div = document.createElement("div");
    div.innerHTML = value;
    div.setAttribute("class", "line");
    document.body.appendChild(div);
}

/**
 * Push a line break to the Terminal
 */
function pushBr() {
    document.body.appendChild(document.createElement("br"));
}