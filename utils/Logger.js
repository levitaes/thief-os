import {FileSystem} from "../filesystem/FileSystem.js";

/**
 * Logger
 */
export class Logger {
    static logFile;
    static {
        const d = FileSystem.instance.getNodeByPath('/var/log');
        let f = d.getEntry("log.txt");
        if(f === undefined){
            f = d.addFile("log.txt");
        }
        console.log(f)
        this.logFile = f;
    }

    /**
     * Log info
     * @param message {string}
     */
    static info(message) {
        console.log(message);
        const d = new Date();
        const msg = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}T INFO: ${message}\n`;
        this.logFile.appendData(msg)
    }


}
