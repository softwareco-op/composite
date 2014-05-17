/*
 * (C) 2014 SoftwareCo-oP
 */
require('../src/Server/NodeDeps.js');
require('../src/Test/UnitTest.js');
var chai = require('chai');
var assert = chai.assert;

(function(Pipeline, NodeSocket) {

    var WebSocket = require('ws');

    describe('NodeSocketTest', function() {

        it('can start the server', function(done) {
            var WsPipeline = {
                type : 'WsPipeline',
                port : 3000,
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

            Pipeline.prepend(WsPipeline, Pipeline.uniqueMemoryDag())
            Pipeline.append(COMPOSITE.dag, TestNode, WsPipeline);

            var WsNode = {
                type : 'NodeSocket',
                url : 'ws://localhost:3000/node'
            }
            var pipe = Pipeline.append(COMPOSITE.dag, WsNode, Pipeline.uniqueMemoryDag());
            WsNode.object.socket.on('open', function() {
                var testNode = {myval : '3'}
                pipe.bin.mux.add(testNode)
            })

            //find WsPipeline dag
            //find WsNode dag
            //check if they contain testNode
        });

    })
})(COMPOSITE.Pipeline, COMPOSITE.NodeSocket)
