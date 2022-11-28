<h3 align='center'> OS.js </h3>

OS.js will be a hub to share functions made by
<a href="https://thief.page" target="_blank">thief</a>

#### Documentation:

<a href="https://thief.boomla.net/os.js" target="_blank">https://thief.boomla.net/os.js</a>

<br>

---

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
