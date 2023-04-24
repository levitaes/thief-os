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
        this.catchCtrlC(() =>{
            console.log("Ctrl+C");
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
                    resolve();
                }
            };
            window.addEventListener('keydown', callback);
        });
    }


}