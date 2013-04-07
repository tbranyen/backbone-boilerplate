
define('plugin/plugin',{
    load: function (id, require, load, config) {
        load(id);
    }
});


require({
    map: {
        '*': {
            'plugin': 'plugin/plugin'
        }
    }
}, ['plugin!foo'], function (value) {

    doh.register(
        'pluginMapSameName',
        [
            function pluginMapSameName(t){
                t.is('foo', value);
            }
        ]
    );
    doh.run();

});

define("pluginMapSameName-tests", function(){});
