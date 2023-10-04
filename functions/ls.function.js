import {Directory} from "../filesystem/INode.js";

export default {
    name: 'ls',
    description: 'ls (list files and directories)',
    execute(os, args) {
        const arg = args[0];
        if (arg && arg.startsWith('-')) {
            const option = arg.substring(1);
            if (option === 'a') {
                for (let [key, value] of os.wd.getChildren()) {
                    const color = value instanceof Directory ? '#92AEBE' : '#C4D3B2';
                    const metadata = value.getMetadata();
                    const html = ` <span>${metadata.permissions.read ? 'r' : '-'}${metadata.permissions.write ? 'w' : '-'}${metadata.permissions.execute ? 'x' : '-'} ${metadata.owner.uid}      ${metadata.modified.toDateString()} ${metadata.modified.getHours()}:${metadata.modified.getMinutes()} </span><span style="color: ${color}">${key}</span>`;
                    os.dialog.sayRaw(html);
                }
            } else {
                os.dialog.say(`ls: invalid option -- '${option}'`);
            }

        } else {
            for (let [key, value] of os.wd.getChildren()) {
                const color = value instanceof Directory ? '#92AEBE' : '#C4D3B2';
                os.dialog.say(key, {color: color});
            }
        }
        os.next();
    }
};
