/*
 * (C) 2014 SoftwareCo-oP
 */
require('../../src/Server/NodeDeps.js');
//require('../../src/Test/UnitTest.js');
var chai = require('chai');
var assert = chai.assert;

(function(Pipeline, NodeSocket) {

    var WebSocket = require('ws');

    describe('ClientSocketTest', function() {

        it('can send to the server', function(done) {
            var ServerSocket = {
                type : 'ServerSocket',
                port : 4000,
                path : '.',
                wsPath : '/node'
            }

            var TestNode = {
                type : 'TestNode',
                testFunction : function(node) {
                    if (node.myval === '3') {
                        done()
                    }
                }
            }

            Pipeline.prepend(ServerSocket, Pipeline.uniqueMemoryDag())
            Pipeline.append(TestNode, ServerSocket);

            var ClientSocket = {
                type : 'ClientSocket',
                url : 'ws://localhost:4000/node'
            }
            var pipe = Pipeline.append(ClientSocket, Pipeline.uniqueMemoryDag());
            ClientSocket.object.socket.on('open', function() {
                var testNode = {myval : '3'}
                pipe.bin.mux.add(testNode)
                ClientSocket.object.end();
                setTimeout(function() { ServerSocket.object.end() }, 100);
            })




        });

    })
})(COMPOSITE.Pipeline, COMPOSITE.NodeSocket)
