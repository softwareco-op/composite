/*
 * (C) 2014 SoftwareCo-oP
 */


require('../../src/Server/NodeDeps.js');
//require('../../src/Test/UnitTest.js');
var chai = require('chai');
var path = require('path');
//var servePath = process.cwd();
var request = require('supertest');

(function(WsStaticServer, chai) {

    var http = require('http');
    var WebSocketServer = require('ws').Server;
    var Server = require('http').Server;
    var WebSocket = require('ws');
    var express = require('express');

    var assert = chai.assert;
    var port = 6000;

    describe('Http', function() {

        it('can bind and release a port', function(done) {
            var server = Server();
            server.listen(port);
            server.close();


            var server2 = Server();
            server2.listen(port);
            server2.close();

            done();
        })

        it('can detect when the port is in use', function(done) {
            port++
            var server = Server();
            server.listen(port);

            var server2 = Server();
            server2.on('error', function(error) {
                server.close();
                done();
            })

            server2.listen(port);
        })

        it('can serve static content', function(done) {
            var app = express();

            app.get('/user', function(req, res){
                res.send(200, { name: 'tobi' });
            });

            app.use(express.static(servePath));

            request(app)
                .get('/main.js')
                .expect('Content-Type', 'application/javascript')
                .expect(200)
                .end(function(err, res){
                    if (err) throw err;
                    done();
                });
        })

        it('can create a websocket', function(done) {
            port++
            var wss = new WebSocketServer({port : port});
            wss.on('connection', function(ws) {
                ws.on('message', function(message) {
                    assert.equal('hi', message);
                    wss.close();
                    done();
                })
                ws.send('something');
            })
            var myWs = new WebSocket('ws://localhost:' + port);
            myWs.on('open', function() {
                myWs.send('hi');
            })

        })

        it('ws can use a http server', function(done) {
            port++
            var server = Server();

            server.listen(port, function() {
                wss = new WebSocketServer({server : server, path:'/ws'});
                wss.on('connection', function(ws) {
                    wss.close();
                    server.close();
                    done();
                })
            });

            var myWs = new WebSocket('ws://localhost:' + port + '/ws');
            myWs.on('open', function() {
                myWs.send('hi');
            });
        })

        it('ws can use a http server with express app', function(done) {
            port++;
            var app = express();
            var server = http.createServer(app);

            server.listen(port, function() {
                var wss = new WebSocketServer({server : server, path:'/ws'});
                wss.on('connection', function(ws) {
                    wss.close();
                    server.close();
                    done();
                })
            });

            var myWs = new WebSocket('ws://localhost:' + port + '/ws');
            myWs.on('open', function() {
                myWs.send('hi');
            });
        })

        it('can be combined into a WsStaticServer', function(done) {
            port++
            var options = { port : port, path : servePath, wsPath : '/ws'}
            var server = new WsStaticServer(options);
            server.listen(function(wss) {
                wss.on('connection', function(ws) {
                    server.close();
                    done();
                })
            });

            var myWs = new WebSocket('ws://localhost:' + port + '/ws');
            myWs.on('open', function() {
                //myWs.send('hi');
                console.log('connected');
            });
            myWs.on('error', function(err) {
                console.log(err);
            })
        })

    })

})(COMPOSITE.WsStaticServer, chai)
