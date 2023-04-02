export default {
    name: 'curl',
    description: 'curl -X  [method] -H [headers] -d [body] [url]',
    async execute(os, args) {
        if (args.length === 0) {
            os.next('try curl -h for help');
            return;
        }

        const options = {
            method: 'GET',
        }

        for(let  i = 0; i < args.length; i++) {
            const arg = args[i];
            if (arg.startsWith('-')) {
                switch(arg) {
                    case '-X':
                        options.method = args.at(i+1);
                        break;
                    case '-H':
                        args.shift();
                        options.headers = args.at(i+1);
                        break;
                    case '-d':
                        args.shift();
                        options.body = args.at(i+1);
                        break;
                }
            } else {
                options.url = arg;
            }
        }

        try{
            const res = await fetch(options.url, options)
            const text = await res.text();
            os.next(text);
        }
        catch(err) {
            console.log(err);
            os.next( err);
        }
    }
};
