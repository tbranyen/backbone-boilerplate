![Boilerplate](https://github.com/tbranyen/backbone-boilerplate/raw/assets/header.png)

Backbone Boilerplate
====================

This boilerplate is the product of much research and frustration.  Existing
boilerplates freely modify Backbone core, lack a build process, and are very
prescriptive; Backbone Boilerplate changes that.

Organize your application with a logical file structure, develop your
Models/Collections/Views/Routers inside modules, and build knowing you have
efficient code that will not bottleneck your users.

Thanks to our
[Contributors](https://github.com/tbranyen/backbone-boilerplate/contributors)!

Special Thanks to: [cowboy](http://github.com/cowboy),
[iros](http://github.com/iros), [nimbupani](http://github.com/nimbupani),
[wookiehangover](http://github.com/wookiehangover), and
[jugglinmike](http://github.com/jugglinmike) for helping me create this project.

Extra Special Thanks to: [Paul Guinan](http://bigredhair.com/work/paul.html)
for giving me usage rights to his fantastic Boilerplate character.

## Getting started ##

The easiest way to get started is to install Git and clone the repository:

``` bash
# Create a new project directory and enter it.
mkdir myproject && cd myproject

# Using Git, fetch only the last few commits.  You don't need the full history
# for your project.
git clone --q --depth 0 git@github.com:tbranyen/backbone-boilerplate.git .

# Optionally, you may want to install grunt & grunt-bbb.
npm install

# Make sure you install grunt-cli globally.  Depending on your user account you
# may need to gain elevated privileges using something like sudo.
npm install grunt-cli -g
```

## Documentation ##

View the Backbone Boilerplate documentation here:

[GitHub Wiki](https://github.com/tbranyen/backbone-boilerplate/wiki)

## Build process ##

To use the new and improved build process, please visit the 
[grunt-bbb](https://github.com/backbone-boilerplate/grunt-bbb)
plugin repo and follow the instructions to install.  Basing your project off
this repo will allow the `bbb` commands to work out-of-the-box.


## License
Copyright (c) 2013 Tim Branyen (@tbranyen)  
Licensed under the MIT license.
