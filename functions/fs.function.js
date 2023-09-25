import {InputManager} from '../inputManager.js';

export default {
    name: 'fs',
    description: 'fs (file system) commands',
    arguments: 0,
    async execute(os, args) {
        os.dialog.say('fs commands:');
        os.dialog.say('1 - show stats ');
        os.dialog.say('2 - reset filesystem');
        os.dialog.say('3 - backup filesystem');
        os.dialog.say('4 - restore filesystem');

        // await InputManager.instance.waitFor("");

        const choice = await os.dialog.ask("Please enter a number:");

        switch (choice) {
            case '1': {
                os.say('stats:');
                const string = localStorage.getItem('FileSystem');
                const blob = new Blob([string]);
                const size = blob.size;
                os.say(`size: ${size} bytes`);
                break;
            }
            case '2': {
                const confirm = await os.ask("Are you sure? (y/n)");
                if (confirm.toLowerCase() !== 'y') {
                    os.say('filesystem not reset');
                    os.next();
                    return;
                }
                localStorage.removeItem('FileSystem');
                os.say('filesystem reset');
                window.location.reload();
                break;
            }
            case '3': {
                const string = localStorage.getItem('FileSystem') || ''
                await os.dialog.download(string, 'filesystem.json');

                os.say('filesystem backed up');
                break;
            }
            case '4':
                try {
                    await os.dialog.say('Please upload a json file');
                    const data = await os.dialog.upload('.json');
                    console.log(data);
                    localStorage.setItem('FileSystem', data);
                    os.say('filesystem restored');
                    window.location.reload();
                    break;
                } catch (e) {
                    os.say('filesystem not restored');
                    os.next();
                    return;
                }
                break;
            default:
                os.say('invalid choice');
                break;
        }

        os.next();
    }
};
