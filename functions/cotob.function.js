export default {
    name: 'cotob',
    description: '~CONSIGNED TO OBLIVION~',
    arguments: 0,
    clear: true,
    execute: async function (os) {
        os.dialog.clear();

        //util
        let response;
        let speed = 1;

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
            await wait(1500);
        say("");

        switch (chapter) {
            case 0:
                say("~PROLOGUE~");
                    say("");
                    await wait(1500);
                await write("I am sorry for your loss..", 1000);
                    await wait(1000);
                await write("He was a remarkable Explorer.", 1000);
                    await wait(800);
                await write("And although he didn't have much your father lived life to the fullest!", 2000);
                    await wait(2000);
                await write("It is just disheartening he passed so prematurely..", 1000);
                    await wait(3000);
                await write("Listen,", 500);
                    await wait(300);
                await write("this is just a formality but i need your name to confirm you as the beneficiary.", 2000)
                await ask();
                    let name = response.charAt(0).toUpperCase() + response.slice(1);
                    this.storage.set('name', name);
                await write(name + " certainly is a name only your father could come up with.", 1000);
                    await wait(1000);
                await write("Now that the formalities are concluded we can start.",1000);
                    await wait(1000);
                    say("");
                say("«The executor hands you a piece of paper. You should be able to 'look' at it»");
                await action(['look','inspect']);
                    say("");
                say("«The top of the paper says 'Last Will and Testament'»");
                    await wait(1500);
                say("«It reads the following:'»");
                    await wait(800);
                    say("");
                await write("I, Jonathan Jones, native of Iocath,", 2000);
                await write("have been born on the 5th day of the 3rd Season of 522 BL,", 2500);
                await write("being of sound mind, and not acting under intimidation of whatever kind,", 3000);
                await write("do by these presents declare this to be my Last Will and Testament.", 3000);
                await write("And I hereby declare that:", 1500);
                await write("I. I desire that my remains be left to the animals according to the rites of my ancestors.", 3500);
                await write("II. I declare " + name + " as my sole beneficiary who shall acquire my beloved hut and all its contents.", 3500);
                await wait(4000);
                    say("");
            /* FALLTHROUGH */

            case 1:
                    this.storage.set('chapter', 1);
                say('~CHAPTER ONE~');
                    await wait(1500);
                    say("");
                say("«You are stood before an old shitty fucked up hut»");

                break;
            case 2:
                    this.storage.set('chapter', 2);
                    say("");
                say('~CHAPTER TWO~');
                    await wait(1500);

                break;
            default:
                say('cotob: unknown error');
                break;
        }
        os.next();

        //helper functions
        function say(phrase) { os.dialog.say(phrase); }
        async function write(phrase, time) { await os.dialog.typewriter(phrase, time) }
        async function wait(time) {
            time *= speed;
            await os.dialog.wait(time); }
        async function ask(phrase = "▷") { response = await os.ask(phrase); }
        async function action(keywords = []) {
            await ask()
            if (!keywords.includes(response)) {
                write("You can't do that", 300);
                await action(keywords);
            }
        }
    }
};