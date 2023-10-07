export default {
    name: 'cotob',
    description: '~CONSIGNED TO OBLIVION~',
    arguments: 0,
    clear: true,
    execute: async function (os) {
        os.dialog.clear();

        //util
        let response;

        //vars
        let chapter;
        let player = {hp : 3, dmg : 1};


        //first time setup
        if (this.storage.get('chapter') === undefined) {
            this.storage.set('chapter', 0);
            chapter = this.storage.get('chapter');
            this.storage.set('hp', player.hp);
            this.storage.set('dmg', player.dmg);
        }
        //get save state
        else {
            chapter = this.storage.get('chapter');
            player.hp = this.storage.get('hp');
            player.dmg = this.storage.get('dmg');
        }

        os.dialog.say("~CONSIGNED TO OBLIVION~", {newline: false});
        say("");

        switch (0) {
            case 0:
                say("~PROLOGUE~");
                    say("");
                    await wait(3000);
                await write("I am sorry for your loss..", 1000);
                    await wait(1000);
                await write("He was a remarkable Explorer.", 1000);
                    await wait(800);
                await write("And although he didn't have much your father lived life to the fullest!", 2000);
                    await wait(2000);
                await write("It is just so disheartening he passed so prematurely..", 1000);
                    await wait(3000);
                await write("Listen,", 500);
                    await wait(300);
                await write("this is just a formality but i need your name to confirm you as the beneficiary.", 2000)
                await ask();
                    let name = response.charAt(0).toUpperCase() + response.slice(1);
                    this.storage.set('name', name);
                say(name + " certainly is a name only your father could come up with.");
                    await wait(3000);
                say("Now that the formalities are concluded we can start.");
                    await wait(100);
                say("«The executor hands you a piece of paper. You should be able to 'look' at it»");
                /*response = await os.ask(ask);
                    if (response.contains('look'))*/





            case 1:
                    this.storage.set('chapter', 1);
                    say("");
                say('~CHAPTER ONE~');

                break;
            case 2:
                    this.storage.set('chapter', 2);
                    say("");
                say('~CHAPTER TWO~');

                break;
            default:
                say('cotob: unknown error');
                break;
        }
        os.next();

        //helper functions
        function say(phrase) { os.dialog.say(phrase); }
        async function write(phrase, time) { await os.dialog.typewriter(phrase, time) }
        async function wait(time) { await os.dialog.wait(time); }
        async function ask(phrase = "▷") { response = await os.ask(phrase); }
    }
};