import {InputManager} from "../inputManager.js";
import {AppManager} from "../appManager.js";
import {WorkingDirectory} from "../filesystem/FileSystem.js";
import {Terminal} from "../terminal.js";

/**
 * Class Representing Input/Output Dialogs
 */
export class Dialog {

    static defaultConfig = {
        color: 'white',
        newline: true,
    }

    /**
     * Output a message
     * @param {string} message - The message to output
     * @param {{newline: boolean, color: string}} config - The configuration object
     */
    static say(message, config = {}) {
        new CommandLine(message, config);
    }

    /**
     * Output a raw message
     * @param {string} message - The message to output
     */
    static sayRaw(message) {
        new CommandLine(message, {raw: true});
    }

    /**
     * Output a message and wait for user input
     * @param {string} message - The message to output
     * @param {{autoComplete: string}} config - The configuration object, not required
     // * @returns {Promise<string>}
     */
    static ask(message, config = {color: 'default', newline: true, autoComplete: null, history: false}) {
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
    static askRaw(message) {
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
    static askYesNo(message, config) {
        //TODO
        console.log(message);
        return new Promise(async (resolve) => {
            const msg = message + " (y/n)";
            while (true) {
                const commandLine = new CommandLine(msg, config);
                const data = await commandLine.onInput();
                if (data === "y" || data === "Y" || data === "yes" || data === "Yes" || data === "YES") {
                    resolve(true);
                    break;
                }
                if (data === "n" || data === "N" || data === "no" || data === "No" || data === "NO") {
                    resolve(false);
                    break;
                }
            }
        });
    }

    /**
     * Download a file
     * @param {string} data - The data to download
     * @param {string} filename - The filename to download as
     * @returns {Promise<void>}
     */
    static download(data, filename) {
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
     * Upload a file and return the content
     * @param {string} type - The file type to upload
     * @returns {Promise<String>} - The file that was uploaded as JavaScript File Object
     */
    static upload(type) {
        return new Promise((resolve, reject) => {
            // upload a json file and read it
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = type || '*';
            input.addEventListener('change', (e) => {
                const file = e.target.files[0];
                const reader = new FileReader();

                if (!file) {
                    reject(new Error('No file selected'));
                    return;
                }

                reader.onload = e => {
                    const text = e.target.result;
                    resolve(text);
                };

                reader.readAsText(file);

                console.log(file);
            });
            input.click();
        });
    }

    /**
     * Output the last message and exit
     * @param message {string}
     */
    static next(message = '') {
        if (message !== '') {
            Dialog.say(message);
        }
    }

    /**
     * Clear the terminal
     */
    static clear() {
        const lines = document.getElementById("lines");
        lines.innerHTML = "";
    }

}

/**
 * Write a value to the Terminal
 *
 */
export class CommandLine extends HTMLElement {
    /**
     * Configuration Object
     * @type {{color: string, newline: boolean, raw: boolean, autoComplete: string, history: boolean}}
     */
    config = {};


    active = false;

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


        try {

            // gets the template
            let tmpl = document.getElementById('commandLineTemplate');
            const p = tmpl.content.querySelector('p');
            if (config.raw === true) {
                p.innerHTML = this.data;
            } else {
                p.innerText = this.data;
            }

            if (config.color !== undefined) {
                p.style.color = config.color;
            }
            else {
                p.style.color = Dialog.defaultConfig.color;
            }

            // creates a shadow root
            let shadow = this.attachShadow({mode: 'open'});
            shadow.appendChild(tmpl.content.cloneNode(true));

            // appends the element to the DOM
            let lines = document.getElementById("lines");
            lines.appendChild(this);
        } catch (error) {
            console.log(error);

        }
    }

    /**
     * creates a new input element and waits for Enter to be pressed
     * @returns {Promise<string>}
     */
    onInput() {
        return new Promise((resolve) => {
            const input = document.createElement('input');
            input.setAttribute('type', 'text');
            input.setAttribute('spellcheck', 'false');
            input.setAttribute('contenteditable', 'true');
            input.setAttribute('autofocus', 'true');
            input.classList.add('input');
            this.active = true;

            this.shadowRoot.appendChild(input);

            //focus
            input.focus();
            InputManager.instance.focusInput(input);

            const config = this.config;

            const autoCompleteCallBack = () => {
                if(!this.active) return;
                if (config.autoComplete === "apps") {
                    const apps = AppManager.instance.getAppList();
                    const data = input.value;
                    apps.forEach((app) => {
                        if (app.name.startsWith(data)) {
                            input.value = app.name;
                        }
                    });
                } else if (config.autoComplete === "file") {
                    // TODO use the current working directory
                    const wd = new WorkingDirectory();
                    const files = wd.getChildren();
                    const data = input.value;
                    files.forEach((file) => {
                        if (file.name.startsWith(data)) {
                            input.value = file.name;
                        }
                    });
                } else if (Array.isArray(config.autoComplete)) {
                    const data = input.value;
                    config.autoComplete.forEach((item) => {
                        if (item.startsWith(data)) {
                            input.value = item;
                        }
                    });
                }
            }

            if (this.config.autoComplete !== null) {

                InputManager.instance.onKeyDown("Tab", autoCompleteCallBack);
            }

            const historyCallBack = (e) => {
                if(this.active === false) return;
                if (e.key === "ArrowUp") {
                    Terminal.instance.historyPointer--;
                    if (Terminal.instance.historyPointer < 0) {
                        Terminal.instance.historyPointer = 0;
                    }

                } else if (e.key === "ArrowDown") {
                    Terminal.instance.historyPointer++;
                    if (Terminal.instance.historyPointer > Terminal.instance.history.length) {
                        Terminal.instance.historyPointer = Terminal.instance.history.length;
                    }
                }
                input.value = Terminal.instance.history[Terminal.instance.historyPointer] || "";
            }

            if (this.config.history === true) {
                InputManager.instance.onKeyDown("ArrowUp", historyCallBack);
                InputManager.instance.onKeyDown("ArrowDown", historyCallBack);
            }

            InputManager.instance.waitFor("Enter").then(() => {
                const data = input.value;
                this.active = false;
                // display the input
                input.disabled = true;
                InputManager.instance.unFocusInput(input);
                // ToDO: remove the event listener
                InputManager.instance.removeKeyDown("Tab", autoCompleteCallBack);
                InputManager.instance.removeKeyDown("ArrowUp", historyCallBack);
                InputManager.instance.removeKeyDown("ArrowDown", historyCallBack);
                resolve(data);
            });
        });
    }
}


// define the custom element
window.customElements.define('command-line', CommandLine);