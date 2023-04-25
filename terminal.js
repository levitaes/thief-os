import {CommandLine, Dialog} from './utils/dialog.js'
import functionLoader from "./functionLoader.js";

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
    static sessions = [];

    /**
     * The current working directory
     * @type {WorkingDirectory}
     */
    wd = null;

    /**
     * This creates a new Session
     * @constructor
     *
     */
    constructor() {

        //Spawn the terminal
        // TODO: Make this a function

        // Saves the session
        Terminal.sessions.push(this);
        this.init();
    }

    /**
     * Initialize the terminal and start the main loop
     * @returns {Promise<void>}
     */
    async init() {
        Dialog.say("Welcome to the terminal");
        await this.loop();
    }

    /**
     * The main loop of the terminal
     * @returns {Promise<void>}
     */
    async loop (){
        while (true) {
            const input = await Dialog.ask(">");
            try {
                // save output of last command
                await functionLoader.run(input);
            } catch (e) {
                console.log(e);
                Dialog.say(e.message);
            }
        }
    }

}