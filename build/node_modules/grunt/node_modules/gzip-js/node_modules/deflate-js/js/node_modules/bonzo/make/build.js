require('smoosh').config({
  "JAVASCRIPT": {
      "DIST_DIR": "./"
    , "bonzo": [
          "./src/copyright.js"
        , "./src/bonzo.js"
      ]
  }
  , "JSHINT_OPTS": {
      "boss": true
    , "forin": false
    , "curly": false
    , "debug": false
    , "devel": false
    , "evil": false
    , "regexp": false
    , "undef": false
    , "sub": true
    , "white": false
    , "indent": 2
    , "whitespace": true
    , "asi": true
    , "laxbreak": true
    , "eqeqeq": false
    , "eqnull": true
  }
}).run().build().analyze()