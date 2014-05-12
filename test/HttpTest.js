/*
 * (C) 2014 SoftwareCo-oP
 */

var http = require('http').Server;
var request = require('supertest');
var WebSocketServer = require('ws').Server;
var WebSocket = require('ws');

(function(chai, sinon) {

    var assert = chai.assert;

    describe('Http', function() {

        it('can bind and release a port', function(done) {
            var server = http();
            server.listen(3000);
            server.close();


            var server2 = http();
            server2.listen(3000);
            server2.close();

            done();
        })

        it('can detect when the port is in use', function(done) {
            var server = http();
            server.listen(3000);


            var server2 = http();
            server2.on('error', function(error) {
                server.close();
                done();
            })

            server2.listen(3000);
        })

        var clientVersion = require('socket.io-client/package').version;

        it('can create a websocket', function(done) {
            wss = new WebSocketServer({port : 3333});
            wss.on('connection', function(ws) {
                ws.on('message', function(message) {
                    console.log('received: %s', message);
                    wss.close();
                })
                ws.send('something');
            })
            //var myWs = new WebSocket('ws://localhost:3333');
            //myWs.send('hi');
            done();
        })

    })

})(chai, sinon)
