export default {
    name: 'cotob',
    description: 'consigned to oblivion',
    arguments: 0,
    clear: true,
    execute: async function (os) {
        os.dialog.clear();

        //vars
        let chapter;
        let response;
        let hp;
        let dmg;

        //first time setup
        if (this.storage.get('chapter') === undefined) {
            this.storage.set('chapter', 0);
            chapter = this.storage.get('chapter');
            this.storage.set('hp', 3);
            this.storage.set('dmg', 1);
        }
        //get save state
        else {
            chapter = this.storage.get('chapter');
            hp = this.storage.get('hp');
            dmg = this.storage.get('dmg');
        }

        switch (chapter) {
            case 0:
                os.say("Welcome Adventurer what is your name?")
                response = await os.ask(">>")
                let name = response.charAt(0).toUpperCase() + response.slice(1);
                this.storage.set('name', name);
                os.say(name + "? Your epic journey awaits!");
                this.storage.set('chapter', 1);
            case 1:
                os.say('~CHAPTER ONE~');
                os.say(this.storage.get('name') + "? Is that really you?")
                break;
            default:
                os.say('cotob: unknown error');
                break;
        }
        os.next();
    }
};