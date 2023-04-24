/**
 * Class Representing Input/Output Dialogs
 */
export class Dialog {

    static defaultConfig = {
        color: 'default',
        newline: true,
    }

    /**
     * Output a message
     * @param {string} message - The message to output
     * @param {{newline: boolean, color: string}} config - The configuration object
     */
    static say(message, config = {} ){
        new CommandLine(message, config);
    }

    /**
     * Output a raw message
     * @param {string} message - The message to output
     */
    static sayRaw(message){
        new CommandLine(message);
    }

    /**
     * Output a message and wait for user input
     * @param {string} message - The message to output
     * @param {{newline: boolean, color: string}} config - The configuration object, not required
     // * @returns {Promise<string>}
     */
    static ask(message, config = {color: 'default', newline: true}){
        return new Promise((resolve, reject) => {
            const commandLine = new CommandLine(message, config);
            // commandLine.input = true;
            commandLine.onInput((data) => {

                resolve(data);
            });
        });
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
 * Push a line break to the Terminal
 */
function pushBr() {
    document.body.appendChild(document.createElement("br"));
}

/**
 * Write a value to the Terminal
 *
 */
class CommandLine extends HTMLElement {

    /**
     * Create a new CommandLine
     * @param data {string}
     * @param config {Object}
     */
    constructor(data, config = {}) {
        // Always call super first in constructor
        super();

        this.data = data;

        // gets the template
        let tmpl = document.getElementById('commandLineTemplate');
        const p = tmpl.content.querySelector('p');
        p.innerText = this.data;

        // creates a shadow root
        let shadow = this.attachShadow({mode: 'open'});
        shadow.appendChild(tmpl.content.cloneNode(true));

        // appends the element to the DOM
        let lines = document.getElementById("lines");
        lines.appendChild(this);
    }

    /**
     * On Input
     */
    onInput(callback){
        //
        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('spellcheck', 'false');
        input.setAttribute('contenteditable', 'true');
        input.setAttribute('autofocus', '');
        input.classList.add('input');

        this.shadowRoot.appendChild(input);
    }
}



// define the custom element
window.customElements.define('command-line', CommandLine);