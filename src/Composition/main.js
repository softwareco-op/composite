require.config({
    nodeRequire: require,
    baseUrl : 'src',
    'packages': [
        { 'name': 'lodash', 'location': '../bower_components/lodash-amd/compat' },
        { 'name': 'underscore', 'location': '../bower_components/lodash-amd/underscore' }
    ],
    paths: {
        'jquery':'../bower_components/jquery/jquery',
        'node-uuid':'../bower_components/node-uuid/uuid',
        'rsvp':'../bower_components/rsvp/rsvp.amd',
        'jssha':'../bower_components/jssha/src/sha256',
        'socketio':'../node_modules/socket.io/node_modules/socket.io-client/dist/socket.io',
        'socketioclient':'../node_modules/socket.io-client/dist/socket.io'
    },
    shim: {
        socketio: {
            exports: 'io'
        },
        underscore: {
            exports: "_"
        }
    }
});

require(['Composition/CompositionContext'], function(CompositionContext){
    var compositionElement = document.getElementById('composition');
    var compositionContext = new CompositionContext();

    compositionContext.run(compositionElement, document);
});
