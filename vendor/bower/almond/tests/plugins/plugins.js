
(function () {

    function parse(name) {
        var parts = name.split('?'),
            index = parseInt(parts[0], 10),
            choices = parts[1].split(':'),
            choice = choices[index];

        return {
            index: index,
            choices: choices,
            choice: choice
        };
    }

    define('index',{
        pluginBuilder: './indexBuilder',
        normalize: function (name, normalize) {
            var parsed = parse(name),
                choices = parsed.choices;

            //Normalize each path choice.
            for (i = 0; i < choices.length; i++) {
                choices[i] = normalize(choices[i]);
            }

            return parsed.index + '?' + choices.join(':');
        },

        load: function (name, req, load, config) {
            req([parse(name).choice], function (value) {
                load(value);
            });
        }
    });

}());

define('a',{
    name: 'a'
});

define('c',{
    name: "c"
});

define('b',[],function () {
    return {
        name: "b"
    };
});

define('earth',['require','./index!0?./a:./b:./c','./index!2?./a:./b:./c','./index!1?./a:./b:./c'],function (require) {
   return {
        getA: function () {
            return require("./index!0?./a:./b:./c");
        },
        getC: function () {
            return require("./index!2?./a:./b:./c");
        },
        getB: function () {
            return require("./index!1?./a:./b:./c");
        }
   };
});

define('prime/a',{
    name: 'aPrime'
});

define('prime/c',{
    name: "cPrime"
});

define('prime/b',[],function () {
    return {
        name: "bPrime"
    };
});

define('prime/earth',['require','../index!0?./a:./b:./c','../index!2?./a:./b:./c','../index!1?./a:./b:./c'],function (require) {
   return {
        getA: function () {
            return require("../index!0?./a:./b:./c");
        },
        getC: function () {
            return require("../index!2?./a:./b:./c");
        },
        getB: function () {
            return require("../index!1?./a:./b:./c");
        }
   };
});
