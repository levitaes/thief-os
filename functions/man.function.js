import {AppManager} from "../appManager.js";

export default {
    name: 'man',
    description: 'man [string] (display manual of function)',
    arguments: ["apps"],
    execute(os, args) {
        const command = args.shift().toLowerCase();
        if (!AppManager.instance.apps.has(command)) {
            os.next('function not found');
            return;
        }

        if(Array.isArray(AppManager.instance.apps.get(command).description)) {
            let i;
            for(i = 0; i < (AppManager.instance.apps.get(command).description.length -1); i++)
                os.say(AppManager.instance.apps.get(command).description[i]);
            os.next(AppManager.instance.apps.get(command).description[i]);
        } 
        else
            os.next(AppManager.instance.apps.get(command).description);
    }
};
