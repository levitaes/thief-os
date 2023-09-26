import {AppManager} from "./appManager.js";

/**
 * @class InputManager
 * @description Manages the input of the user
 */
export class InputManager {
    /**
     * The instance of the InputManager
     * @type {InputManager}
     */
    static instance = null;

    constructor() {
        if (InputManager.instance === null) {
            InputManager.instance = this;
        }

        // this.disableContextMenu();
        this.catchCtrlC(() => {
            console.log("Ctrl+C");
            AppManager.instance.stopForegroundApp().then(r => {
            });
        })

        return InputManager.instance;
    }

    /**
     * Disable the context menu
     */
    disableContextMenu() {
        window.addEventListener('contextmenu', (event) => {
            event.preventDefault();
        });
    }

    /**
     * catch strg + c
     * @param {function} callback - The callback function
     */
    catchCtrlC(callback) {
        window.addEventListener('keydown', (event) => {
            if (event.key === 'c' && event.ctrlKey) {
                callback();
            }
        });
    }


    /**
     * Wait for specific key press
     * @param {string} key - The key to wait for
     */
    async waitFor(key = "") {
        return new Promise((resolve) => {
            const callback = (event) => {
                if (event.key === key || key === "") {
                    window.removeEventListener('keydown', callback);
                    //prevent default
                    event.preventDefault();
                    resolve();
                }
            };
            window.addEventListener('keydown', callback);
        });
    }

    /**
     * Add a key Down listener
     * @param {string} key - The key to listen for
     */
    waitKeyRaw(key) {
        return new Promise((resolve) => {
            const callback = (event) => {
                if (event.key === key) {
                    event.preventDefault();
                    resolve();
                }
            };
            window.addEventListener('keydown', callback);
        });
    }

    /**
     * Add a key Down listener
     * @param key
     * @param callback
     */
    onKeyDown(key, callback) {
        const callback2 = (event) => {
            if (event.key === key) {
                event.preventDefault();
                callback(event);
            }
        };
        window.addEventListener('keydown', callback2);
    }

    /**
     * Remove a event listener
     * @param key {string} - The key to remove
     * @param callback {function} - The callback function
     */
    removeKeyDown(key, callback) {
        window.removeEventListener(key, callback);
    }

    /**
     * focus the input on left click
     * @param {HTMLInputElement} input - The input to focus
     */
    focusInput(input) {
        window.addEventListener('click', () => {
            input.focus();

        });
    }

    /**
     * unFocus the input on left click
     * @param {HTMLInputElement} input - The input to unfocus
     */
    unFocusInput(input) {
        window.removeEventListener('click', () => {
        });
    }


}