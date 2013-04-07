
define('foo', function (require, exports, module) {
    return {
        locale: module.config().locale
    };
});

define('bar', ['module'], function (module) {
    return {
        color: module.config().color
    };
});

define('baz', ['module'], function (module) {
    return {
        doesNotExist: module.config().doesNotExist
    };
});
