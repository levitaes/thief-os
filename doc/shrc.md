# sh.rc

You can customize the shell by editing the sh.rc file in the home directory.

The sh.rc file is a shell script that is executed when the shell starts.

## Usage


### Aliases

```sh
alias ll="ls -l"
```

### motd

You can change the shell message

```sh
motd "Welcome to the shell. Today is $DAY, $DATE, $TIME"
``` 

#### Variables

```shell
$TIME - Current time
$DATE - Current date
$DAY - Current weekday
$USER - Current user
```

## Comments

You can add comments to the sh.rc file

```sh
# This is a comment
```




