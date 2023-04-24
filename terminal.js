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

    async init() {
        Dialog.say("Welcome to the terminal");
        // const input = await Dialog.ask(">");
        //
        // console.log(input);
        // functionLoader.run(input);

        await this.loop();
    }

    async loop (){
        while (true) {
            const input = await Dialog.ask(">");
           await functionLoader.run(input);
        }
    }

}