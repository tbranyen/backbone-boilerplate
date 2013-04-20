var jam = {
    "packages": [
        {
            "name": "jquery",
            "location": "../vendor/jam/jquery",
            "main": "dist/jquery.js"
        },
        {
            "name": "underscore",
            "location": "../vendor/jam/underscore",
            "main": "underscore.js"
        },
        {
            "name": "backbone.layoutmanager",
            "location": "../vendor/jam/backbone.layoutmanager",
            "main": "backbone.layoutmanager.js"
        },
        {
            "name": "bbb-layoutmanager",
            "location": "../vendor/jam/bbb-layoutmanager",
            "main": "adapter.js"
        },
        {
            "name": "backbone",
            "location": "../vendor/jam/backbone",
            "main": "backbone.js"
        }
    ],
    "version": "0.2.17",
    "shim": {
        "underscore": {
            "exports": "_"
        },
        "backbone.layoutmanager": {
            "deps": [
                "jquery",
                "backbone",
                "underscore"
            ],
            "exports": "Backbone.Layout"
        },
        "backbone": {
            "deps": [
                "underscore",
                "jquery"
            ],
            "exports": "Backbone"
        }
    }
};

if (typeof require !== "undefined" && require.config) {
    require.config({
    "packages": [
        {
            "name": "jquery",
            "location": "../vendor/jam/jquery",
            "main": "dist/jquery.js"
        },
        {
            "name": "underscore",
            "location": "../vendor/jam/underscore",
            "main": "underscore.js"
        },
        {
            "name": "backbone.layoutmanager",
            "location": "../vendor/jam/backbone.layoutmanager",
            "main": "backbone.layoutmanager.js"
        },
        {
            "name": "bbb-layoutmanager",
            "location": "../vendor/jam/bbb-layoutmanager",
            "main": "adapter.js"
        },
        {
            "name": "backbone",
            "location": "../vendor/jam/backbone",
            "main": "backbone.js"
        }
    ],
    "shim": {
        "underscore": {
            "exports": "_"
        },
        "backbone.layoutmanager": {
            "deps": [
                "jquery",
                "backbone",
                "underscore"
            ],
            "exports": "Backbone.Layout"
        },
        "backbone": {
            "deps": [
                "underscore",
                "jquery"
            ],
            "exports": "Backbone"
        }
    }
});
}
else {
    var require = {
    "packages": [
        {
            "name": "jquery",
            "location": "../vendor/jam/jquery",
            "main": "dist/jquery.js"
        },
        {
            "name": "underscore",
            "location": "../vendor/jam/underscore",
            "main": "underscore.js"
        },
        {
            "name": "backbone.layoutmanager",
            "location": "../vendor/jam/backbone.layoutmanager",
            "main": "backbone.layoutmanager.js"
        },
        {
            "name": "bbb-layoutmanager",
            "location": "../vendor/jam/bbb-layoutmanager",
            "main": "adapter.js"
        },
        {
            "name": "backbone",
            "location": "../vendor/jam/backbone",
            "main": "backbone.js"
        }
    ],
    "shim": {
        "underscore": {
            "exports": "_"
        },
        "backbone.layoutmanager": {
            "deps": [
                "jquery",
                "backbone",
                "underscore"
            ],
            "exports": "Backbone.Layout"
        },
        "backbone": {
            "deps": [
                "underscore",
                "jquery"
            ],
            "exports": "Backbone"
        }
    }
};
}

if (typeof exports !== "undefined" && typeof module !== "undefined") {
    module.exports = jam;
}