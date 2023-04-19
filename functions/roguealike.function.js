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

        os.say("龴ↀ◡ↀ龴: Welcome Adventurer what is your name?")
        response = await os.ask(">>")
        os.next(response + "? Your epic journey awaits!");
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
