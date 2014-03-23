var requirejs = require('requirejs');
var path = require('path');

var servePath = path.dirname(path.dirname(__dirname));

global.define = requirejs;

requirejs.config({
    nodeRequire: require,
    baseUrl : 'src',
    paths: {
        'jquery':'../bower_components/jquery/jquery',
        'localstorage':'../bower_components/backbone.localstorage/backbone.localStorage',
        'backbone': '../bower_components/backbone-amd/backbone',
        'underscore':'../bower_components/underscore-amd/underscore',
        'node-uuid':'../bower_components/node-uuid/uuid',
        'rsvp':'../bower_components/rsvp/rsvp.amd'
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
        },
        'backboneio': {
            deps: ["backbone", "socketio"]
        }
    }
});

requirejs(['Server/Server'], function(Server) {

    var server = new Server(servePath);
    server.backboneio();

});
