export default {
    name: 'ngen2',
    description: 'generate unique username',
    execute: async function (os) {
        let vowel =
            ['a', 'e', 'i', 'o', 'u'];
        let conso =
            ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'x', 'z', 'w', 'y'];
        let last = "";
        let quit = false;

        os.say("enter desired length");
        let length = parseInt(await os.ask(">"), 10);

        if (!Number.isInteger(length)) {
            os.next("NaN");
        }else {
            os.say("press enter to get different name,");
            os.say("or anything else to quit");
            while (!quit) {
                os.say(ngen(length));
                let response = await os.ask(">");
                console.log(typeof response)
                if (!(response === ""))
                    quit = true;
            }
            os.next("bye");
        }

        function ngen(length) {
            let name = [""];
            switch (Math.floor(Math.random() * 2)) {
                case 0:
                    last = 'conso';
                    for (let c = 0; c < length; c++) {
                        if (last === 'conso') {
                            name[c] = vowel[Math.floor(Math.random() * vowel.length)];
                            last = 'vowel';
                        } else {
                            name[c] = conso[Math.floor(Math.random() * conso.length)];
                            last = 'conso';
                        }
                    }
                    break;
                case 1:
                    last = 'vowel';
                    for (let c = 0; c < length; c++) {
                        if (last === 'vowel') {
                            name[c] = conso[Math.floor(Math.random() * conso.length)];
                            last = 'conso';
                        } else {
                            name[c] = vowel[Math.floor(Math.random() * vowel.length)];
                            last = 'vowel';
                        }
                    }
                    break;
                default:
                    console.log('error');
            }
            return name.join("");
        }
    }
}
