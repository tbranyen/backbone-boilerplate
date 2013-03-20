![Boilerplate](https://github.com/tbranyen/backbone-boilerplate/raw/assets/header.png)

Backbone Boilerplate
====================

This boilerplate is the product of much research and frustration.  Existing
boilerplates freely modify Backbone core, lack a build process, and are very
prescriptive; Backbone Boilerplate changes that.

The Backbone Boilerplate is a way of organizing a web application with
opinionated defaults: such as Backbone, Underscore, jQuery, RequireJS, JamJS,
Grunt, and the HTML5 Boilerplate styles.

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

## Documentation ##

View the Backbone Boilerplate documentation here:

[GitHub Wiki](https://github.com/tbranyen/backbone-boilerplate/wiki)

## Getting started ##

The easiest way to get started is to install Git and clone the repository:

``` bash
# Create a new project directory and enter it.
mkdir myproject && cd myproject

# Using Git, fetch only the last few commits.  You don't need the full history
# for your project.
git clone --depth 0 git@github.com:tbranyen/backbone-boilerplate.git .
```

## Build process ##

The build process consists of numerous Grunt plugin tasks that work together
to optimize your application.

``` bash
# Install latest Grunt & useful Grunt plugins. 
npm install

# Make sure you install grunt-cli globally.  Depending on your user account you
# may need to gain elevated privileges using something like `sudo`.
npm install grunt-cli -g
```

## License
Copyright (c) 2013 Tim Branyen (@tbranyen)  
Licensed under the MIT license.
