export default {
    name: 'roguealike',
    description: 'roguealike (start epic adventure)',
    arguments: 0,
    clear: true,
    execute: async function (os) {
        clear();
        let response;
        //stats
        let hp = 3;
        let dmg = 1;

        switch (this.storage.get('chapter')) {
            case 0:
                os.say("龴ↀ◡ↀ龴: Welcome Adventurer what is your name?")
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
                this.storage.set('chapter', 0);
                await this.execute(os);
        }
        os.next();
    }
};

function clear() {
    let divs = document.getElementsByTagName("div");
    let brs = document.getElementsByTagName("br");
    let length = divs.length;
    let lengthBrs = brs.length;
    for (let i = 0; i < length; i++) {
        divs[0].remove();
    }
    for (let i = 0; i < lengthBrs; i++) {
        brs[0].remove();
    }
}
