# Functions

## Create a new function

1.  Create a new file in the `functions` folder with name `yourNewFunction.function.js`

2.  Add the following code to the file

```js
export default {
  name: "function name",
  description: "function description",
  execute: async (os, args) => {
    // Your code here
  },
};
```

3. Add the function to `functions/functionList.js`

```js
import yourNewFunction from "./functions/yourNewFunction.function.js";
```

and add it to the array

```js
const list = {
  // ...
  yourNewFunction,
};
```

In the `execute` function you can use the `os` and `args` parameters.

Through the `os` parameter you have access to the following functions:

- `os.ask` - wait for user input
- `os.say` - print text to user
- `os.next` - last message to end function

The `args` parameter is an array of arguments passed to the function.

## Save Data
Each function has its own data storage. You can save data in the following way:

```js
this.storage.set("key", "value");
```

Other available functions:
    
```js
this.storage.get("key");
this.storage.delete("key");
this.storage.has("key");
```


