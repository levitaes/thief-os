# Documentation


## Functions

Functions are installable apps.

[Read more](./function.md)

## Dialog

The Dialog is a static class to show messages in the Terminal.

[Read more](./dialog.md)

## File System

The file system is a hierarchical structure that stores files and directories.

[Read more](./filesystem.md)

## Logger

The Logger is a static class to log messages to the file system.

[Read more](./logger.md)

## Customization

You can customize the shell




## To generate the documentation

```bash
jsdoc ./*
```
or
```bash
jsdooc -r ./
```

This will generate the documentation in the `out` directory.
Then you can open the `index.html` file in your browser.

This will guarantee that the documentation is up-to-date.