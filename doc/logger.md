# Logger

The Logger is a static class to log messages to the file system.

It stores the logs in `/var/log/log.txt`.

## Usage:

The logger has 4 levels of logging:

- info
- warn
- error
- debug

### Inside a function:

```js
this.logger.info("message");
```

The logger is available in the `this` object.

### Outside a function:

```js
import {Logger} from "./utils/Logger.js";
Logger.info("message");
```

The Logger has to be imported.