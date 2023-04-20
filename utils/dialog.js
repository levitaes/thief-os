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
        //TODO
    }

    /**
     * Output a raw message
     * @param {string} message - The message to output
     */
    static sayRaw(message){
        //TODO
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
        //TODO
        console.log(message);
        return new Promise();
    }

    /**
     * Output a raw message and wait for user input
     * @param {string} message - The message to output
     * @returns {Promise<string>}
     */
    static askRaw(message){
        //TODO
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
        //TODO
        console.log(message);
    }

    /**
     * Download a file
     * @param {string} data - The data to download
     * @param {string} filename - The filename to download as
     * @returns {Promise<void>}
     */
    static download(data, filename){
        return new Promise((resolve, reject) => {
            const element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
            element.setAttribute('download', filename);

            element.style.display = 'none';
            document.body.appendChild(element);

            element.click();

            document.body.removeChild(element);
            resolve();
        });

    }

    /**
     * Upload a file
     * @param {string} type - The file type to upload
     * @returns {Promise<string>}
     */
    static upload(type){
        //TODO
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