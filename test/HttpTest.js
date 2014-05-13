/*
 * (C) 2014 SoftwareCo-oP
 */

(function(WsStaticServer, chai, sinon) {

    var assert = chai.assert;

    describe('Http', function() {

        it('can bind and release a port', function(done) {
            var server = Server();
            server.listen(3000);
            server.close();


            var server2 = Server();
            server2.listen(3000);
            server2.close();

            done();
        })

        it('can detect when the port is in use', function(done) {
            var server = Server();
            server.listen(3000);


            var server2 = Server();
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
                    assert.equal('hi', message);
                    wss.close();
                    done();
                })
                ws.send('something');
            })
            var myWs = new WebSocket('ws://localhost:3333');
            myWs.on('open', function() {
                myWs.send('hi');
            })

        })

        it('ws can use a http server', function(done) {
            var server = Server();

            server.listen(3000, function() {
                wss = new WebSocketServer({server : server, path:'/ws'});
                wss.on('connection', function(ws) {
                    wss.close();
                    server.close();
                    done();
                })
            });

            var myWs = new WebSocket('ws://localhost:3000/ws');
            myWs.on('open', function() {
                myWs.send('hi');
            });
        })

        it('ws can use a http server with express app', function(done) {
            var app = express();
            var server = http.createServer(app);

            server.listen(3000, function() {
                wss = new WebSocketServer({server : server, path:'/ws'});
                wss.on('connection', function(ws) {
                    wss.close();
                    server.close();
                    done();
                })
            });

            var myWs = new WebSocket('ws://localhost:3000/ws');
            myWs.on('open', function() {
                myWs.send('hi');
            });
        })

        it('can be combined into a WsStaticServer', function(done) {
            var options = { port : 3000, path : servePath, wsPath : '/ws'}
            var server = new WsStaticServer(options);
            server.listen(function(wss) {
                wss.on('connection', function(ws) {
                    server.close();
                    done();
                })
            });

            var myWs = new WebSocket('ws://localhost:3000/ws');
            myWs.on('open', function() {
                myWs.send('hi');
            });
        })
    })

})(COMPOSITE.WsStaticServer, chai, sinon)
