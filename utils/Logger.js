import {FileSystem} from "../filesystem/FileSystem.js";

/**
 * Logger class
 *
 */
export class Logger {
    static logFile;
    static {
        const d = FileSystem.instance.getNodeByPath('/var/log');
        let f = d.getEntry("log.txt");
        if(f === undefined){
            f = d.addFile("log.txt");
        }
        this.logFile = f;
    }

    /**
     * Log debug message
     * @param message {string}
     */
    static debug(message) {
        const d = new Date();
        const msg = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}T DEBUG: ${message}\n`;
        this.logFile.appendData(msg)
    }

    /**
     * Log info message
     * @param message {string}
     */
    static info(message) {
        const d = new Date();
        const msg = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}T INFO: ${message}\n`;
        this.logFile.appendData(msg)
    }

    /**
     * Log warning message
     * @param message {string}
     */
    static warning(message) {
        const d = new Date();
        const msg = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}T WARNING: ${message}\n`;
        this.logFile.appendData(msg)
    }

    /**
     * Log error message
     * @param message {string}
     */
    static error(message) {
        const d = new Date();
        const msg = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}T ERROR: ${message}\n`;
        this.logFile.appendData(msg)
    }


}
