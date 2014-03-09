require.config({
    nodeRequire: require,
    baseUrl : 'src',
    paths: {
        'jquery':'../bower_components/jquery/jquery',
        'backboneLocalstorage':'../bower_components/backbone.localstorage/backbone.localStorage',
        'backbone': '../bower_components/backbone-amd/backbone',
        'underscore':'../node_modules/underscore/underscore',
        'node-uuid':'../bower_components/node-uuid/uuid'
    },
    shim: {
        underscore: {
            exports: "_"
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'backbone.localStorage': {
            deps: ['backbone'],
            exports: 'Backbone'
        }
    }
});

require(['Composition/CompositionContext'], function(CompositionContext){
    var compositionElement = document.getElementById('composition');
    var compositionContext = new CompositionContext();

    compositionContext.run(compositionElement, document);
});
