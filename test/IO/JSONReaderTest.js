/*
 * (C) 2014 SoftwareCo-oP
 */

require('../../src/Server/NodeDeps.js');
require('../../src/Test/UnitTest.js');
var path = require('path');
var chai = require('chai');
var sinon = require('sinon');
var assert = chai.assert;
var fs = require('fs');

(function(Pipeline, JSONReader, FileBuffer) {

    describe('JSONReader', function() {

        it('reads JSON from a file', function(done) {
            var fileBuffer = new FileBuffer({file:'test.json'})
            fileBuffer.add({id:0, message:'hello world'})
            fileBuffer.end();

            var jsonReader = new JSONReader({file:'test.json'})

            var pipe = function(node) {
                assert.equal(node.id, 0);
                jsonReader.end();
                fs.unlink('test.json');
                done();
            }

            jsonReader.pipeTo(pipe);
        })

        it('pipes to a DAGNotify pipeline', function(done) {
            var fileBuffer = new FileBuffer({file:'test.json'})
            fileBuffer.add({id:0, message:'hello world'})
            fileBuffer.end();

            var dagNotify = Pipeline.DAGNotify();
            var jsonReader = {
                type : 'JSONReader',
                file : 'test.json'
            }

            var testNode = {
                type : 'TestNode',
                testFunction : function (node) {
                    if (node.message === 'hello world') {
                        assert.equal(node.id, 0);
                        done();
                    }
                }
            }

            var pipe = Pipeline.append(testNode, dagNotify);

            pipe.bin.mux.add(jsonReader);
        })

    })

})(COMPOSITE.Pipeline, COMPOSITE.JSONReader, COMPOSITE.FileBuffer)
