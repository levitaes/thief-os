export default {
    name: 'cotob',
    description: '~CONSIGNED TO OBLIVION~',
    arguments: 0,
    clear: true,
    execute: async function (os) {
        os.dialog.clear();
        //util
        let ask = "▷";
        let response;

        //vars
        let chapter;
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

        switch (0) {
            case 0:
                os.say("~CONSIGNED TO OBLIVION~");
                    os.say("");
                os.say("~PROLOGUE~");
                    os.say("");
                    //os.wait(1000);
                os.say("I am sorry for your loss..");
                    //os.wait(1000);
                os.say("He was a remarkable Explorer.")
                    //os.wait(100);
                os.say("And although he didn't have much your father lived life to the fullest!")
                    //os.wait(100);
                os.say("It is just so disheartening he passed so prematurely..")
                    //os.wait(2000);
                os.say("Listen, this is just a formality but i need your name to confirm you as the beneficiary.")
                response = await os.ask(ask);
                    let name = response.charAt(0).toUpperCase() + response.slice(1);
                    this.storage.set('name', name);
                os.say(name + " certainly is a name only your father could come up with.");
                    //os.wait(3000);
                os.say("Now that the formalities are concluded we can start.");
                    //os.wait(100);
                os.say("«The executor hands you a piece of paper. You should be able to 'look' at it»");
                /*response = await os.ask(ask);
                    if (response.contains('look'))*/





            case 1:
                    this.storage.set('chapter', 1);
                    os.say("");
                os.say('~CHAPTER ONE~');

                break;
            case 2:
                    this.storage.set('chapter', 2);
                    os.say("");
                os.say('~CHAPTER TWO~');

                break;
            default:
                os.say('cotob: unknown error');
                break;
        }
        os.next();
    }
};