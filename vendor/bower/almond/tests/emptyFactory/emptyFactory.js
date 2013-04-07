
define("bread", ['yeast'], function (yeast) {
    return {
        name: 'bread',
        ingredient: yeast
    };
});

//Test undefined exports.
define("water", function () {});

define("bin", ['water'], function (water) {
    return {
        name: 'bin',
        water: water
    };
});

define("yeast", ['water', 'bin'], function(water, bin) {
    return {
        name: 'yeast',
        water: water,
        bin: bin
    };
});

//Using sync require, but callback-require([], function(){}) is suggested.
//This form only used in some particular CommonJS module bundling.
var bread = require('bread');
