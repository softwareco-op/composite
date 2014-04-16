var requirejs = require('requirejs');
var path = require('path');

var servePath = path.dirname(path.dirname(__dirname));

global.define = requirejs;

requirejs.config({
    nodeRequire: require,
    baseUrl : 'src',
    paths: {
        'node-uuid':'../bower_components/node-uuid/uuid',
        'jssha':'../bower_components/jssha/src/sha256',
        'lodash':'../node_modules/lodash/lodash'
    }
});

requirejs(['Server/HttpServer', 'Server/NodeBuffer', 'events'], function(HttpServer, NodeBuffer, events) {
    var eventBus = new events.EventEmitter();
    var httpServer = new HttpServer(3000, eventBus, servePath);
    var io = httpServer.startService();
    var nodeBuffer = new NodeBuffer();
    var pipeline = nodeBuffer.install();

    io.on('connection', function(socket) {
        socket.on('node', function(node) {
            console.log(node);
            pipeline(node);
        })
    })

});
