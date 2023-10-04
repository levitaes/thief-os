# Dialog

The class responsible for outputting data to the Terminal.

It is a static class, so you can use it without creating an instance.

## Usage
    
```js
Dialog.say("Hello World!");
```

## Usage within functions

```js
os.dialog
```
### os.dialog.sy(message, [options])

```js
os.dialog.say("Hello World!", options);
```

Show a message in the Terminal.

### os.dialog.sayRaw(message)

```js
os.dialog.sayRaw("Hello World!");
```

Show a message in the Terminal without any formatting as inner HTML.
This is useful if you want to show a message with HTML tags.

__Note:__ This function should be used with caution, as it can be used to inject malicious code into the Terminal.

### os.dialog.ask(message, [options])

```js
const answer = await os.dialog.ask("What is your name?", options);
```

Show a message in the Terminal and wait for user input.

### os.dialog.askRaw(message)

```js
const answer = await os.dialog.askRaw("What is your name?");
```

Show a message in the Terminal without any formatting as inner HTML and wait for user input.
This is useful if you want to show a message with HTML tags.

__Note:__ This function should be used with caution, as it can be used to inject malicious code into the Terminal.

### os.dialog.askYesNo(message, [options])

```js
const answer = await os.dialog.askYesNo("Do you like this?", options);
```

Show a message in the Terminal and wait for user input.
It will append `(y/n)` to the message.
The user can answer with "yes" or "no".
Returns `true` if the user answered "yes" and `false` if the user answered "no".

### os.dialog.next(message)

```js
os.dialog.next("Hello World!");
```

The last message to end the function.
__Note:__ Not necessary to and the function.

### os.dialog.download(data, filename)

```js
os.dialog.download("Hello World!", "hello.txt");
```

Download a file to the user's computer.

### os.dialog.upload(filetype)

```js
const file = await os.dialog.upload(fileType);
```

Upload a file from the user's computer.
It returns a `string`.
As a parameter, you can specify the file type, e.g. `.txt`.

Currently, only text files are supported.

### os.dialog.clear()

```js
os.dialog.clear();
```

Clear the Terminal.


## config

The config object is used to configure the Terminal.

```js
const config = {
    color: "white",
    newLine: false,
    autoComplete: "file|apps|[]"
    
}
```

If one of the properties is not set, the default value is used.

