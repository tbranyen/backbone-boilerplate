
define("bread", function(require, exports, module) {
    exports.name = 'bread';
    exports.ingredient = require('yeast').name;
});

//Test undefined exports.
define("water", function () {});

define("bin", function(require, exports, module) {
    exports.name = "bin";
    exports.water = require("water");
});

define("yeast", function(require,exports,module){
    module.exports = {
        name: 'yeast',
        water: require("water"),
        bin: require("bin")
    };
});

//Using sync require, but callback-require([], function(){}) is suggested.
//This form only used in some particular CommonJS module bundling.
var bread = require('bread');
