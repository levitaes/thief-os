export default {
    name: 'fs',
    description: 'fs (file system) commands',
    arguments: 0,
    async execute(os, args) {
        os.say('fs commands:');
        os.say('1 - show stats ');
        os.say('2 - reset filesystem');
        os.say('3 - backup filesystem');
        os.say('4 - restore filesystem');

        const choice = await os.ask("Please enter a number:");

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
                try{
                    // upload a json file and read it
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = '.json';
                    input.addEventListener('change', (e) => {
                        const file = e.target.files[0];
                        const reader = new FileReader();

                        reader.onload = e => {
                            const text = e.target.result;
                            console.log(text);
                            localStorage.setItem('FileSystem', text);
                            os.say('filesystem restored');
                            window.location.reload();
                            os.next();
                        };
                        reader.readAsText(file);

                        console.log(file);
                    });
                    input.click();
                }
                catch (e) {
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
