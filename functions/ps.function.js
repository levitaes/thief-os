import {AppManager} from "../appManager.js";
export default {
    name: 'ps',
    description: 'ps',
    execute(os, args) {
        const processes = AppManager.instance.runningApps;
        for(const [pid, process] of processes) {
            os.dialog.say(`PID: ${pid} | Name: ${process.process.name}`);
        }
        os.dialog.next();
    }
};
