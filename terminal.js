import {CommandLine, Dialog} from './utils/dialog.js'
import functionLoader from "./functionLoader.js";
import {WorkingDirectory} from "./filesystem/FileSystem.js";

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

    alias = new Map();
    motd = "";

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

        CommandLine.terminal = this;

        // Saves the session
        // Terminal.sessions.push(this);
    }


    /**
     * Initialize the terminal and start the main loop
     * @returns {Promise<void>}
     */
    async init() {

        this.loadSHRC();
        if (this.motd !== "") {
            Dialog.globalInstance.say(this.motd, {newline: false});
        } else {
            Dialog.globalInstance.say("Welcome to the terminal 龴ↀ◡ↀ龴", {newline: false});
        }
        this.loadHistory();
        await this.loop();
    }

    /**
     * Loads the sh.rc
     */
    loadSHRC() {
        const file = new WorkingDirectory().getFile("home/sh.rc");
        if (!file) return;

        const data = file.getData();
        if (data === "") return;
        const lines = data.split("\n");
        for (let line of lines) {
            // ignore comments via # and empty lines via regex
            if (line.startsWith("#") || line.match(/^\s*$/)) continue;

            // replace $TIME with the current time
            line = line.replace("\$TIME", new Date().toLocaleTimeString());
            // Replace $DAY with the current weekday
            line = line.replace("\$DAY", new Date().toLocaleDateString('en-US', {weekday: 'long'}));
            // Replace $DATE with the current date
            line = line.replace("\$DATE", new Date().toLocaleDateString());
            // Replace $USER with the current user
            line = line.replace("\$USER", "user");

            if (line.startsWith("alias ")) {
                // add alias
                const alias = line.split(" ").slice(1).join(" ").split("=");
                this.alias.set(alias[0], alias[1].replace(/"/g, ''));
                continue;
            }

            if (line.startsWith("motd ")) {
                this.motd = line.split(" ").slice(1).join(" ").replace(/"/g, '');
            }

        }
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

    /**
     * Clear the history
     */
    clearHistory() {
        this.history = [];
        this.saveHistory();
    }

    /**
     * Save the history to the filesystem
     */
    saveHistory() {
        const wwd = new WorkingDirectory();
        wwd.goDirByPath("var");
        const file = wwd.getOrCreateFile("history.json");
        file.setData(JSON.stringify(this.history));
    }

    /**
     * Load the history from the filesystem
     */
    loadHistory() {
        const wwd = new WorkingDirectory();
        wwd.goDirByPath("var");
        const file = wwd.getOrCreateFile("history.json");
        const data = file.getData();
        if (data === "") return;
        this.history = JSON.parse(data);
    }


    /**
     * The main loop of the terminal
     * @returns {Promise<void>}
     */
    async loop() {
        const lines = document.getElementById("lines");
        while (true) {
            this.historyPointer = this.history.length;
            const config = {autoComplete: "apps", history: true};
            if (lines.innerHTML === "") config.newline = false;
            const input = await Dialog.globalInstance.ask(`${this.wd.getPathAsString() || ""} >`, config);
            try {
                // save output of last command
                this.pushHistory(input);
                await functionLoader.run(input);
            } catch (e) {
                console.log(e);
                Dialog.globalInstance.say(e.message);
            }
        }
    }

}