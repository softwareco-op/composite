/*
 * (C) 2014 SoftwareCo-oP
 */

require('../../src/Server/NodeDeps.js');
require('../../src/Test/UnitTest.js');
var chai = require('chai');
var assert = chai.assert;

(function(Pipeline) {
    describe('DAGReplier', function() {

        it('it sends dag nodes to a requestor', function(done) {
            var WsPipeline = {
                type : 'WsPipeline',
                port : 3000,
                path : '.',
                wsPath : '/node'
            }

            Pipeline.prepend(WsPipeline, Pipeline.uniqueMemoryDag())

            var WsNode = {
                type : 'NodeSocket',
                url : 'ws://localhost:3000/node'
            }
            var pipe = Pipeline.append(WsNode, Pipeline.uniqueMemoryDag());
            WsNode.object.socket.on('open', function() {
                var testNode = {verb : 'get', subtree:0}
                pipe.bin.mux.add(testNode)
            })

            done();
        })

    })
})(COMPOSITE.Pipeline)
