/*
 * (C) 2014 SoftwareCo-oP
 */

require('../../src/Server/NodeDeps.js');
require('../../src/Test/UnitTest.js');
var chai = require('chai');
var assert = chai.assert;
var fs = require('fs');
var WebSocket = require('ws');

(function(JSONWriter, Pipeline) {

    describe('JSONWriter', function() {

        it('closes an empty stream', function(done) {
            var jsonTestFile = 'fileBufferEmpty.json';
            var fb = new COMPOSITE.JSONWriter({file : jsonTestFile});
            fb.end().then(function() {
                var emptyArray = fs.readFileSync(jsonTestFile, 'utf8');
                assert.strictEqual(emptyArray, '[\n\n]\n')
                fs.unlink(jsonTestFile);
                done();
            }).catch(function(err) {
                console.log(err);
            })

        })

        it('can stream to disk', function(done) {
            var fileBuffer = {file : 'fileBufferTestObjects.json'};
            var fb = new COMPOSITE.JSONWriter(fileBuffer);
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
            var fb = new JSONWriter(fileBuffer);
            fb.add({id : 'test'});
            fb.add({id : 'test2'});
            process.emit('SIGINT');
        })

    })
})(COMPOSITE.JSONWriter, COMPOSITE.Pipeline)
