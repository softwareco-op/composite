/*
 * (C) 2014 SoftwareCo-oP
 */

require('../../src/Server/NodeDeps.js');
//require('../../src/Test/UnitTest.js');
var chai = require('chai');
var assert = chai.assert;

(function(Pipeline) {
    describe('DAGReplier', function() {

        it('it sends dag nodes to a requestor', function(done) {

            var ServerSocket = {
                type : 'ServerSocket',
                port : 7000,
                path : '.',
                wsPath : '/node'
            }

            var DAGReplier = {
                type : 'DAGReplier'
            }

            var serverPipeline = Pipeline.prepend(ServerSocket, Pipeline.uniqueMemoryDag())
            Pipeline.append(DAGReplier, serverPipeline);

            serverPipeline.bin.mux.add({id:0, comment:'you are home'})

            var ClientSocket = {
                type : 'ClientSocket',
                url : 'ws://localhost:7000/node'
            }

            var TestNode = {
                type : 'TestNode',
                testFunction : function(node) {
                    if (node.id === 0) {
                        ClientSocket.object.end();
                        setTimeout(function() { ServerSocket.object.end() }, 200);
                        done();
                    }
                    return node;
                }
            }

            var pipe = Pipeline.prepend(TestNode, Pipeline.uniqueMemoryDag());
            pipe = Pipeline.append(ClientSocket, pipe);

            ClientSocket.object.socket.on('open', function() {
                var testNode = {verb : 'get', subtree:0}
                ClientSocket.bin.mux.add(testNode)
            })

        })

    })
})(COMPOSITE.Pipeline)
