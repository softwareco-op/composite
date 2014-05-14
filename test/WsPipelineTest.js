/*
 * (C) 2014 SoftwareCo-oP
 */

(function(COMPOSITE, Pipeline, chai, sinon) {

    var assert = chai.assert;

    describe('WsPipeline', function() {

        it('it can route messages through pipeline', function(done) {
            var WsPipeline = {
                type : 'WsPipeline',
                port : 3000,
                path : servePath,
                wsPath : '/node'
            }
            Pipeline.prepend(WsPipeline, Pipeline.uniqueMemoryDag())

            var myWs = new WebSocket('ws://localhost:3000/node');

            var testNode = {
                id : 'testNode'
            }

            myWs.on('open', function() {
                myWs.send(JSON.stringify(testNode));
            });

            myWs.on('message', function(node) {
                node = JSON.parse(node);
                WsPipeline.object.end();
                assert.equal(node.id, 'testNode');
                assert.isDefined(COMPOSITE.dag.get('testNode'));
                assert.isUndefined(COMPOSITE.dag.get('testNode2'));
                done();
            });

        })

    })

})(COMPOSITE, COMPOSITE.Pipeline, chai, sinon)
