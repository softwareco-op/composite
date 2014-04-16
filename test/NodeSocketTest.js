/*
 * (C) 2014 SoftwareCo-oP
 */


var requirejs = require('requirejs');
var path = require('path');
var servePath = path.dirname(path.dirname(__dirname));

requirejs.config({
    baseUrl: 'src',
    waitSeconds: 1,
    paths: {
      rsvp: '../bower_components/rsvp/rsvp.amd',
      chai: '../bower_components/chai/chai',
      sinon: '../node_modules/sinon/pkg/sinon',
      'jssha':'../bower_components/jssha/src/sha256',
      'node-uuid':'../bower_components/node-uuid/uuid',
      'lodash':'../node_modules/lodash/lodash'
    }
});

global.define = requirejs;

describe('NodeSocketTest', function() {

    var assert;
    var NodeSocket;
    var Node;
    var socketioclient;
    var HttpServer;
    var NodeBuffer;
    var HttpNodePipeline;
    var events;

    var pipeline;

    var setup = function(modules, done) {
        console.log(arguments);
    }

    var setupServer = function() {
        var eventBus = new events.EventEmitter();
        var httpServer = new HttpServer(3001, eventBus, servePath);
        var io = httpServer.startService();
        var nodeBuffer = new NodeBuffer();
        pipeline = nodeBuffer.install();
        return io;
    }

    beforeEach(function(done) {
        define(['socket.io-client', 'Model/Node', 'Server/NodeSocket', 'Server/HttpNodePipeline', 'chai'], function(socketioclientMod, NodeMod, NodeSocketMod, HttpNodePipelineMod, chai) {
            socketioclient = socketioclientMod;
            Node = NodeMod;
            NodeSocket = NodeSocketMod;
            HttpNodePipeline = HttpNodePipelineMod;
            assert = chai.assert;
            done();
        })
    })

    it('can start the server', function(done) {
        var testPort = 3001;
        var httpNodePipeline = new HttpNodePipeline(servePath, testPort);
        pipeline = httpNodePipeline.install();
        httpNodePipeline.io.on('connection', function(socket) {
            socket.on('node', function(node) {
                try {
                    var nodeOut = pipeline(node);
                } catch (error) {

                }
                if (node.id === 2) {
                    done();
                }

            })
        })
        var socket = socketioclient.connect('http://localhost:' + testPort);
        var nodeSocket = new NodeSocket(socket);
        var node = new Node({id:1});
        var node2 = new Node({id:2});
        nodeSocket.add(node);
        nodeSocket.add(node);
        nodeSocket.add(node2);

    });

    it('nodes are broadcasted', function(done) {
        var testPort = 3002;
        var httpNodePipeline = new HttpNodePipeline(servePath, testPort);
        pipeline = httpNodePipeline.install();
        httpNodePipeline.io.on('connection', function(socket) {
            socket.on('node', function(node) {

                try {
                    var nodeOut = pipeline(node);
                    httpNodePipeline.io.sockets.emit('node', nodeOut);
                    socket.broadcast.emit('node', nodeOut);
                } catch (error) {

                }

            })
        })
        var socket = socketioclient.connect('http://localhost:' + testPort);

        var socket2 = socketioclient.connect('http://localhost:' + testPort);
        socket2.on('node', function(clientNode) {
            if (clientNode.id === 2) {
                done();
            }

        });
        var nodeSocket = new NodeSocket(socket);
        var nodeSocket2 = new NodeSocket(socket2);
        var node = new Node({id:1});
        var node2 = new Node({id:2});
        nodeSocket2.add(node);
        nodeSocket2.add(node);
        nodeSocket2.add(node2);
    })

})
