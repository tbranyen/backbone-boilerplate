![Boilerplate](https://github.com/tbranyen/backbone-boilerplate/raw/assets/header.png)

Backbone Boilerplate
====================

This boilerplate is the product of much research and frustration.  Existing
boilerplates freely modify Backbone core, lack a build process, and are very
prescriptive; Backbone Boilerplate changes that.

The Backbone Boilerplate is a way of organizing a web application with some
opinionated defaults: such as Backbone, Lo-Dash, jQuery, RequireJS, JamJS,
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

# Using Git, fetch only the latest commits.  You won't need the full history
# for your project.
git clone --depth 0 git@github.com:tbranyen/backbone-boilerplate.git .
```

You will need to download and install [Node.js](http://nodejs.org/) if you want
to use the commands in the following sections.

## Updating dependencies ##

Third party packages may update independently from this main repo, so it's a
good idea to update after fetching.  There are two different package managers
that you need to install and call update on.

``` bash
# Install latest Grunt & useful Grunt plugins.
npm install

# Install Jam and Bower.  Depending on your user account you may need to gain
# elevated privileges using something like `sudo`.
npm install jamjs bower -g

# Updating the JamJS packages.
jam upgrade

# Updating the Bower packages.
bower update
```

## Build process ##

The build process consists of numerous Grunt plugin tasks that work together
to optimize your application.

``` bash
# Make sure you install grunt-cli globally.  Depending on your user account you
# may need to gain elevated privileges using something like `sudo`.
npm install grunt-cli -g

# To test the build process works, try running the following command.
grunt release
```

## License ##
Copyright (c) 2013 Tim Branyen (@tbranyen)  
Licensed under the MIT license.
