/*
 * (C) 2014 SoftwareCo-oP
 */



(function(FileBuffer, Pipeline) {

    var assert = chai.assert;
    var fs = require('fs');

    describe('FileBuffer', function() {

        it('can stream to disk', function(done) {
            var fileBuffer = {file : 'fileBufferTestObjects.json'};
            var fb = new COMPOSITE.FileBuffer(fileBuffer);
            fb.add({id : 'test'});
            fb.end();
            fs.unlink('fileBufferTestObjects.json');
            done();
        })

        it('can buffer http traffic', function(done) {
            var WsPipeline = {
                type : 'WsPipeline',
                port : 3001,
                path : servePath,
                wsPath : '/node'
            }
            var FileBuffer = {
                type : 'FileBuffer',
                file : 'httpBufferTest.json'
            }
            Pipeline.prepend(FileBuffer, Pipeline.uniqueMemoryDag())
            Pipeline.prepend(WsPipeline, FileBuffer)

            var myWs = new WebSocket('ws://localhost:3001/node');

            var testNode = {
                id : 'testNode'
            }

            myWs.on('open', function() {
                myWs.send(JSON.stringify(testNode));
            });

            myWs.on('message', function(node) {
                node = JSON.parse(node);
                WsPipeline.object.end();
                FileBuffer.object.end();
                fs.unlink('httpBufferTest.json');
                assert.equal(node.id, 'testNode');
                assert.isDefined(COMPOSITE.dag.get('testNode'));
                assert.isUndefined(COMPOSITE.dag.get('testNode2'));
                done();
            });

        })

    })
})(COMPOSITE.FileBuffer, COMPOSITE.Pipeline)
