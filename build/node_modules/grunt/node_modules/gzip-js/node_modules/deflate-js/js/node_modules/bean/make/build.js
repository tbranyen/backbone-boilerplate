require('smoosh').config({
  "JAVASCRIPT": {
    "DIST_DIR": "./",
    "bean": [
      "./src/copyright.js",
      "./src/bean.js"
    ]
  },
  "JSHINT_OPTS": {
    "boss": true,
    "forin": false,
    "curly": false,
    "debug": false,
    "devel": false,
    "evil": false,
    "regexp": false,
    "undef": false,
    "sub": true,
    "white": false,
    "indent": 2,
    "whitespace": true,
    "asi": true
  }
}).run().build().analyze();