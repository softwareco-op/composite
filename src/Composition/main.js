require.config({
    nodeRequire: require,
    baseUrl : 'src',
    paths: {
        'jquery':'../bower_components/jquery/jquery',
        'localstorage':'../bower_components/backbone.localstorage/backbone.localStorage',
        'backbone': '../bower_components/backbone-amd/backbone',
        'underscore':'../bower_components/underscore-amd/underscore',
        'node-uuid':'../bower_components/node-uuid/uuid',
        'rsvp':'../bower_components/rsvp/rsvp.amd',
        'jssha':'../bower_components/jssha/src/sha256',
        'backbone.io':'../node_modules/backbone.io/lib/browser',
        'socketio':'../node_modules/socket.io/node_modules/socket.io-client/dist/socket.io'
    },
    shim: {
        socketio: {
            exports: 'io'
        },
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
        },
        'backbone.io': {
            deps: ['backbone', 'socketio']
        }
    }
});

require(['Composition/CompositionContext'], function(CompositionContext){
    var compositionElement = document.getElementById('composition');
    var compositionContext = new CompositionContext();

    compositionContext.run(compositionElement, document);
});
