/*
 * (C) 2014 SoftwareCo-oP
 */

(function(FileBuffer, Pipeline) {

    var assert = chai.assert;
    var fs = require('fs');
    var WebSocket = require('ws');

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
            var filename = 'httpBufferTest.json';
            var port = 3001;
            var bufferedServer = Pipeline.bufferedServer(port, servePath, filename);

            var myWs = new WebSocket('ws://localhost:3001/node');

            var testNode = {
                id : 'testNode'
            }

            myWs.on('open', function() {
                myWs.send(JSON.stringify(testNode));
            });

            myWs.on('message', function(node) {
                node = JSON.parse(node);
                bufferedServer.bin.dag.get('serverSocket').object.end();
                bufferedServer.bin.dag.get('fileBuffer').object.end();
                fs.unlink(filename);
                assert.equal(node.id, 'testNode');
                assert.isDefined(bufferedServer.bin.dag.get('testNode'));
                assert.isUndefined(bufferedServer.bin.dag.get('testNode2'));
                done();
            });

        })

    })
})(COMPOSITE.FileBuffer, COMPOSITE.Pipeline)
