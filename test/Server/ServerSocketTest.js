/*
 * (C) 2014 SoftwareCo-oP
 */

(function(COMPOSITE, Pipeline, chai, sinon) {

    var WebSocket = require('ws');

    var assert = chai.assert;

    describe('ServerSocket', function() {

        it('it can route messages through pipeline', function(done) {
            var ServerSocket = {
                type : 'ServerSocket',
                port : 5000,
                path : servePath,
                wsPath : '/node'
            }
            Pipeline.prepend(ServerSocket, Pipeline.uniqueMemoryDag())

            var myWs = new WebSocket('ws://localhost:5000/node');

            var testNode = {
                id : 'testNode'
            }

            myWs.on('open', function() {
                myWs.send(JSON.stringify(testNode));
            });

            myWs.on('message', function(node) {
                node = JSON.parse(node);
                ServerSocket.object.end();
                assert.equal(node.id, 'testNode');
                assert.isDefined(ServerSocket.bin.dag.get('testNode'));
                assert.isUndefined(ServerSocket.bin.dag.get('testNode2'));
                done();
            });

        })

    })

})(COMPOSITE, COMPOSITE.Pipeline, chai, sinon)
