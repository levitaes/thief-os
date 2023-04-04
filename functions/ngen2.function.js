export default {
    name: 'ngen2',
    description: 'ngen2 [integer] (generate unique username with given length)',
    arguments: 1,
    execute: async function (os, args) {
        let vowel =
            ['a', 'e', 'i', 'o', 'u'];
        let conso =
            ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'x', 'z', 'w', 'y'];
        let last = "";
        let quit = false;

        let length = parseInt(args, 10);

        if (!Number.isInteger(length)) {
            os.next("NaN");
        }else {
            os.say("ngen2: press enter for next,");
            os.say("ngen2: or type quit");
            while (!quit) {
                os.say(ngen(length));
                let response = await os.ask("");
                if (response === "quit")
                    quit = true;
            }
            os.next("ngen2: bye");
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
