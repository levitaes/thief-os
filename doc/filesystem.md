# File System

The file system is a hierarchical structure that stores files and directories.
It is structured as a b*-tree. The root directory is the root of the file system.



## INode
The basic unit of the file system is the INode. It contains the following information:
- parent directory
- name
- metadata

### Directory
A directory is a special type of INode. It contains the following information:
- dir - a list of children INode

### File
A file is a special type of INode. It contains the following information:
- data - a string of data

## Working Directory
The working directory is a pointer to the current directory. It is used to navigate the file system.

For each Session a working directory should be created.

### Usage:
In functions
```js
os.wd.goDirUp() // go to parent directory
os.wd.goDir("dir") // go to child directory
os.wd.goDirByPath("/dir1/dir2") // go to directory by path
os.wd.getChildren() // get children of current directory
os.wd.getChild("dir") // get child of current directory by name
os.wd.getCurrent() // get current directory
```
