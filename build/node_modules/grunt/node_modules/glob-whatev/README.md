# Node Glob, Whatever

A quick and dirty synchronous file globbing utility based on [minimatch](https://github.com/isaacs/minimatch).

## Why another file globbing library?

I wanted to make [grunt](https://github.com/cowboy/grunt) work on Windows. Unfortunately, [node-glob](https://github.com/isaacs/node-glob) doesn't work on Windows, and [miniglob](https://github.com/isaacs/miniglob) isn't synchronous.

## Any issues?

I'd imagine that this works with any path that [minimatch](https://github.com/isaacs/minimatch) supports. While this includes some basic unit tests, I'm hoping that minimatch has good coverage.

This module isn't terribly efficient. But that's ok, because I'm using it for relatively small folder structures. Maybe someone will make this one better (patches welcome!). Or maybe even write a better one, and then I'll use that instead. But yeah, don't use this on a really large directory structure.

## Getting Started

This code should work just fine in Node.js:

First, install the module with: `npm install glob-whatev`

```javascript
var globsync = require('glob-whatev');
globsync.glob('foo/**/*.js') // some boolean

// Basically,
globsync.glob(globPattern [, minimatchOptions]) // some boolean
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt](https://github.com/cowboy/grunt).

## Release History

* 2012/02/14 - v0.1.2 - Fixed an issue with nonexistent directories.
* 2012/01/23 - v0.1.1 - Fixed an issue with stat and locked files.
* 2012/01/11 - v0.1.0 - First official release.

## License
Copyright (c) 2012 "Cowboy" Ben Alman  
Licensed under the MIT license.  
<http://benalman.com/about/license/>
