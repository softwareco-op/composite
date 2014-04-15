var requirejs = require('requirejs');
var path = require('path');

var servePath = path.dirname(path.dirname(__dirname));

global.define = requirejs;

requirejs.config({
    nodeRequire: require,
    baseUrl : 'src',
    paths: {
        'underscore':'../bower_components/underscore-amd/underscore',
        'node-uuid':'../bower_components/node-uuid/uuid',
    },
    shim: {
        underscore: {
            exports: "_"
        }
    }
});

requirejs(['Server/HttpServer', 'events'], function(HttpServer, events) {
    var eventBus = new events.EventEmitter();
    var httpServer = new HttpServer(3000, eventBus, servePath);
    var io = httpServer.startService();

    io.on('connection', function(socket) {
        socket.on('node', function(node) {
            console.log(node);
        })
    })

});
