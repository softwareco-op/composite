/*
 * (C) 2014 SoftwareCo-oP
 */


global.COMPOSITE = {}

var path = require('path');
var servePath = path.dirname(path.dirname(__dirname));
var lodash = require('lodash');
var socketio = require('socket.io-client');
var Path = require('../src/Model/PathMod');
var sha = require('../bower_components/jssha/src/sha256');
var assert = require('../bower_components/chai/chai').assert;
var HttpServer = require('../src/Server/HttpServer');
var events = require('events');
var socketioclient = require('socket.io-client');
//socketioclient.connect is asynchrounous
//httpServer.startService appears to be synchronous.


describe('Server', function() {
    it('can say hello', function(done) {
        console.log('hello');
        console.log(Path);
        console.log(MODULE);
        var eventBus = new events.EventEmitter();
        var testPort = 4000;
        var httpServer = new COMPOSITE.HttpServer(testPort, eventBus, servePath);
        var io = httpServer.startService();

        io.on('connection', function(socket) {
            socket.on('node', function(node) {
                var str = JSON.stringify(node)
                console.log('got a node' + str);
                done();

            })
        })

        var sent = false;
        setTimeout(function() {
            var client = socketioclient.connect('http://localhost:' + testPort);
            client.emit('node',  {'msg': 'hi'});
            sent = true;
        }, 200);

        setTimeout(function() {
            if (!sent) {
                throw new Error('did not connect in time');
            }
        }, 300);

        console.log(new sha('hi', 'TEXT').getHash);
        var hi = MODULE.combine(['hello', 'world'], '/');
        assert.equal(hi, 'hello/world');
        console.log(hi);
    })
})

