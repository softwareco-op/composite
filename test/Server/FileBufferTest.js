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
            //fs.unlink('fileBufferTestObjects.json');
            done();
        })

        it('closes the stream on sigint', function(done) {
            var fileBuffer = {file : 'fileBufferCloseTest.json'};
            var fb = new FileBuffer(fileBuffer);
            fb.add({id : 'test'});
            fb.add({id : 'test2'});
            process.emit('SIGINT');
            done();
        })

    })
})(COMPOSITE.FileBuffer, COMPOSITE.Pipeline)
