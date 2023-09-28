import {CommandLine, Dialog} from './utils/dialog.js'
import functionLoader from "./functionLoader.js";
import {FileSystem, WorkingDirectory} from "./filesystem/FileSystem.js";

/**
 * The terminal class
 */
export class Terminal {
    /**
     * The HTML element of the terminal
     * @type {HTMLElement}
     */
    div = null;

    /**
     * All sessions of the terminal
     */
    // static sessions = [];

    /**
     * The current working directory
     * @type {WorkingDirectory}
     */
    wd = null;

    /**
     * History of the terminal
     * @type {String[]}
     */
    history = [];

    historyPointer = 0;

    static instance = null;

    /**
     * This creates a new Session
     * @constructor
     *
     */
    constructor() {

        //Spawn the terminal
        // TODO: Make this a function

        if (Terminal.instance === null) {
            Terminal.instance = this;
        } else {
            return Terminal.instance;
        }

        // Saves the session
        // Terminal.sessions.push(this);
    }

    /**
     * Initialize the terminal and start the main loop
     * @returns {Promise<void>}
     */
    async init() {
        Dialog.say("Welcome to the terminal");
        this.loadHistory();
        await this.loop();
    }

    /**
     * Push a new input to the history
     * @param input {string}
     */
    pushHistory(input) {
        const index = this.history.indexOf(input);
        if (index !== -1) {
            this.history.splice(index, 1);
        }
        this.history.push(input);
        this.saveHistory();
    }

    clearHistory() {
        this.history = [];
        this.saveHistory();
    }

    saveHistory() {
        const wwd = new WorkingDirectory();
        wwd.goDirByPath("var");
        const file = wwd.getOrCreateFile("history.json");
        file.setData(JSON.stringify(this.history));
    }

    loadHistory() {
        const wwd = new WorkingDirectory();
        wwd.goDirByPath("var");
        const file = wwd.getOrCreateFile("history.json");
        const data = file.getData();
        if(data === "") return;
        this.history = JSON.parse(data);
    }


    /**
     * The main loop of the terminal
     * @returns {Promise<void>}
     */
    async loop() {
        while (true) {
            this.historyPointer = this.history.length;
            const input = await Dialog.ask(`${this.wd.getPathAsString() || ""} >`, {autoComplete: "apps", history: true});
            try {
                // save output of last command
                this.pushHistory(input);
                await functionLoader.run(input);
            } catch (e) {
                console.log(e);
                Dialog.say(e.message);
            }
        }
    }

}