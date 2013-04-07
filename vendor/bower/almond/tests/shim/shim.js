//Taken from requirejs/tests/shim/built/basic-tests.js

(function (root) {
    root.A = {
        name: 'a'
    };
}(this));

define("a", (function (global) {
    return function () {
        var ret = global.A.name;
       var fn = function () {
                    window.globalA = this.A.name;
                };
        fn.apply(global, arguments);
        return ret;
    };
}(this)));

function D() {
    this.name = 'd';
};

define("d", function(){});

var B = {
    name: 'b',
    aValue: A.name,
    dValue: new D()
};

define("b", function(){});

var C = {
    name: 'c',
    a: A,
    b: B
};

define("c", ["a","b"], (function (global) {
    return function () {
        var ret = global.C;
        return ret;
    };
}(this)));

var e = {
    nested: {
        e: {
            name: 'e'
        }
    }
};

define("e", (function (global) {
    return function () {
        var ret = global.e.nested.e;
        return ret;
    };
}(this)));
