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

---

# API

<!-- TOC -->
* [File System](#file-system)
  * [INode](#inode)
    * [Directory](#directory)
    * [File](#file)
  * [Working Directory](#working-directory)
    * [Usage:](#usage)
* [API](#api)
  * [INode](#inode-1)
    * [Properties](#properties)
    * [Methods](#methods)
      * [INode()](#inode-2)
      * [getParent()](#getparent)
      * [getName()](#getname)
      * [getMetadata()](#getmetadata)
      * [rename()](#rename)
      * [getFullPath()](#getfullpath)
      * [move(newParent)](#movenewparent)
      * [delete()](#delete)
      * [isFile()](#isfile)
  * [Directory](#directory-1)
    * [Properties](#properties-1)
    * [Methods](#methods-1)
      * [Directory()](#directory-2)
      * [getCildren()](#getcildren)
      * [getChild()](#getchild)
      * [addDirectory()](#adddirectory)
      * [addFile()](#addfile)
  * [File](#file-1)
    * [Properties](#properties-2)
    * [Methods](#methods-2)
      * [File()](#file-2)
      * [getData()](#getdata)
      * [setData()](#setdata)
      * [appendData()](#appenddata)
  * [File System](#file-system-1)
    * [Properties](#properties-3)
    * [Methods](#methods-3)
      * [FileSystem()](#filesystem)
      * [save()](#save)
      * [load()](#load)
      * [serialize()](#serialize)
      * [serializeNode(node)](#serializenodenode)
      * [deserialize()](#deserialize)
      * [getNodeByPath(path)](#getnodebypathpath)
  * [Working Directory](#working-directory-1)
    * [Properties](#properties-4)
    * [Methods](#methods-4)
      * [WorkingDirectory()](#workingdirectory)
      * [goDirUp()](#godirup)
      * [goDir(name)](#godirname)
      * [goDirByPath(path)](#godirbypathpath)
      * [getChildren()](#getchildren)
      * [getChild(name)](#getchildname)
      * [getCurrent()](#getcurrent)
<!-- TOC -->


## INode
Is an abstract class that represents a file system node.

### Properties
- parent - parent directory
- name - name of the node
- metadata - metadata of the node

### Methods

#### INode()

```js
const inode = new INode( name, parent)
```
The constructor of the INode class.

#### getParent()

```js
const parent = inode.getParent()
```

Get the parent directory of the INode.

#### getName()

```js
const name = inode.getName()
```

Get the name of the INode.

#### getMetadata()

```js
const metadata = inode.getMetadata()
```

Get the metadata of the INode.

#### rename()

```js
inode.rename(newName)
```

Rename the INode.

#### getFullPath()

```js
const path = inode.getFullPath()
```

Get the full path of the INode.

#### move(newParent)

```js
inode.move(newParent)
```

Move the INode to a new parent directory.

#### delete()

```js
inode.delete()
```

Delete the INode.

#### isFile()

```js
const isFile = inode.isFile()
```

Check if the INode is a file.


---

## Directory

An Implementation of the INode class that represents a directory.

### Properties
- dir - a list of children INode

### Methods

#### Directory()

```js
const dir = new Directory( name, parent)
```

The constructor of the Directory class.

#### getCildren()

```js
const children = dir.getChildren()
```

Get the children of the Directory.

#### getChild()

```js
const child = dir.getChild(name)
```

Get a child of the Directory by name.

#### addDirectory()

```js
const newDir = dir.addDirectory(name)
```

Add a new directory to the Directory.

#### addFile()

```js
const newFile = dir.addFile(name)
```

Add a new file to the Directory.

---

## File

An Implementation of the INode class that represents a file.

### Properties
- data - a string of data

### Methods

#### File()

```js
const file = new File( name, parent, data)
```

The constructor of the File class.

#### getData()

```js
const data = file.getData()
```

Get the data of the File.

#### setData()

```js
file.setData(data)
```

Set the data of the File.

#### appendData()

```js
file.appendData(data)
```

Append data to the end of the File.

---

## File System


### Properties
- static instance - the instance of the file system
- root - the root directory

### Methods

#### FileSystem()

```js
const fs = new FileSystem()
```

The constructor of the FileSystem class.

#### save()

```js
fs.save()
```

Save the file system to the local storage.

#### load()

```js
fs.restore()
```

Load the file system from the local storage.

#### serialize()

```js
const serialized = fs.serialize()
```

Serialize the file system to a JSON string.

#### serializeNode(node)

```js
const serialized = fs.serializeNode(node)
```

Serialize a node to a JSON string.

#### deserialize()

```js
fs.deserialize(serialized)
```

Deserialize the file system from a JSON string.

#### getNodeByPath(path)

```js
const node = fs.getNodeByPath(path)
```

Get a node by path.


---

## Working Directory

The Working Directory is a pointer to the current directory. It is used to navigate the file system.

### Properties
- fs - the file system
- current - the current directory

### Methods

#### WorkingDirectory()

```js
const wd = new WorkingDirectory()
```

The constructor of the WorkingDirectory class.

#### goDirUp()

```js
const dir = wd.goDirUp()
```

Go to the parent directory.

#### goDir(name)

```js
const dir = wd.goDir(name)
```

Go to a child directory by name.

#### goDirByPath(path)

```js
const dir = wd.goDirByPath(path)
```

Go to a directory by path.

#### getChildren()

```js
const children = wd.getChildren()
```

Get the children of the current directory.

#### getChild(name)

```js
const child = wd.getChild(name)
```

Get a child of the current directory by name.

#### getCurrent()

```js
const dir = wd.getCurrent()
```

Get the current directory.




