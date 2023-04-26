import {InputManager} from "../inputManager.js";
import {AppManager} from "../appManager.js";
import {WorkingDirectory} from "../filesystem/FileSystem.js";

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
        new CommandLine(message, {raw: true});
    }

    /**
     * Output a message and wait for user input
     * @param {string} message - The message to output
     * @param {{autoComplete: string}} config - The configuration object, not required
     // * @returns {Promise<string>}
     */
    static ask(message, config = {color: 'default', newline: true, autoComplete: null}){
        return new Promise(async (resolve, reject) => {
            const commandLine = new CommandLine(message, config);
            const data = await commandLine.onInput();
            resolve(data);
        });
    }

    /**
     * Output a raw message and wait for user input
     * @param {string} message - The message to output
     * @returns {Promise<string>}
     */
    static askRaw(message){
        return new Promise(async (resolve) => {
            const commandLine = new CommandLine(message, {raw: true});
            const data = await commandLine.onInput();
            resolve(data);
        });
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
        return new Promise((resolve) => {
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

    /**
     * Output the last message and exit
     * @param message {string}
     */
    static next(message = ''){
        if(message !== ''){
            Dialog.say(message);
        }
    }

}

/**
 * Write a value to the Terminal
 *
 */
export class CommandLine extends HTMLElement {
    /**
     * Configuration Object
     * @type {{color: string, newline: boolean, raw: boolean, autoComplete: string}}
     */
    config = {};

    /**
     * Create a new CommandLine
     * @param data {string}
     * @param config {Object}
     */
    constructor(data, config = {}) {
        // Always call super first in constructor
        super();

        this.classList.add('commandLine');

        this.data = data;
        this.config = config;

        // gets the template
        let tmpl = document.getElementById('commandLineTemplate');
        const p = tmpl.content.querySelector('p');
        if(config.raw === true){
            p.innerHTML = this.data;
        } else {
            p.innerText = this.data;
        }

        // creates a shadow root
        let shadow = this.attachShadow({mode: 'open'});
        shadow.appendChild(tmpl.content.cloneNode(true));

        // appends the element to the DOM
        let lines = document.getElementById("lines");
        lines.appendChild(this);
    }

    /**
     * creates a new input element and waits for Enter to be pressed
     * @returns {Promise<string>}
     */
    onInput(){
        return new Promise((resolve) => {
            const input = document.createElement('input');
            input.setAttribute('type', 'text');
            input.setAttribute('spellcheck', 'false');
            input.setAttribute('contenteditable', 'true');
            input.setAttribute('autofocus', 'true');
            input.classList.add('input');

            this.shadowRoot.appendChild(input);

            //focus
            input.focus();
            InputManager.instance.focusInput(input);

            const config = this.config;
            function autoCompleteCallBack() {
                if(config.autoComplete === "apps") {
                    const apps = AppManager.instance.getAppList();
                    const data = input.value;
                    apps.forEach((app) => {
                        if (app.name.startsWith(data)) {
                            input.value = app.name;
                        }
                    });
                }
                else if(config.autoComplete === "file") {
                    // TODO use the current working directory
                    const wd = new WorkingDirectory();
                    const files = wd.getChildren();
                    const data = input.value;
                    files.forEach((file) => {
                        if (file.name.startsWith(data)) {
                            input.value = file.name;
                        }
                    });
                }
                else if (Array.isArray(config.autoComplete)) {
                    const data = input.value;
                    config.autoComplete.forEach((item) => {
                        if (item.startsWith(data)) {
                            input.value = item;
                        }
                    });
                }
            }

            if(this.config.autoComplete !== null) {

                InputManager.instance.onKeyDown("Tab", autoCompleteCallBack);
            }

            InputManager.instance.waitFor("Enter").then(() => {
                const data = input.value;
                // display the input
                input.disabled = true;
                InputManager.instance.unFocusInput(input);
                InputManager.instance.removeKeyDown("Tab", autoCompleteCallBack);
                resolve(data);
            });
        });
    }
}



// define the custom element
window.customElements.define('command-line', CommandLine);