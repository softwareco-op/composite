/*
 * (C) 2014 SoftwareCo-oP
 */

require('../../src/Server/NodeDeps.js');
require('../../src/Test/UnitTest.js');
var chai = require('chai');
var assert = chai.assert;
var fs = require('fs');
var WebSocket = require('ws');

(function(FileBuffer, Pipeline) {

    describe('FileBuffer', function() {

        it('can stream to disk', function(done) {
            var fileBuffer = {file : 'fileBufferTestObjects.json'};
            var fb = new COMPOSITE.FileBuffer(fileBuffer);
            fb.add({id : 'test'});
            fb.end();

            var dagNotify = Pipeline.DAGNotify();

            var testNode = {
                type : 'TestNode',
                testFunction : function (node) {
                    if (node.id === 'test') {
                        fs.unlink('fileBufferTestObjects.json');
                        done();
                    }
                }
            }

            var pipe = Pipeline.append(testNode, dagNotify);

            var testData = {
                type: 'JSONReader',
                file: 'fileBufferTestObjects.json'
            }

            pipe.bin.mux.add(testData);

            testData.object.resume();
        })

        it('closes the stream on sigint', function(done) {
            COMPOSITE.Process.onExit = function() {
                console.log('everything closed...not doing anything')
                fs.unlink('fileBufferCloseTest.json');
                done();
            };
            var fileBuffer = {file : 'fileBufferCloseTest.json'};
            var fb = new FileBuffer(fileBuffer);
            fb.add({id : 'test'});
            fb.add({id : 'test2'});
            process.emit('SIGINT');
        })

    })
})(COMPOSITE.FileBuffer, COMPOSITE.Pipeline)
