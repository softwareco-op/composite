/*
 * (C) 2014 SoftwareCo-oP
 */

require('../../src/Server/NodeDeps.js');
require('../../src/Test/UnitTest.js');
var RSVP = require('rsvp');
var chai = require('chai');
var assert = chai.assert;


(function(Process, Pipeline) {

    var fs = require('fs');

    describe('Process', function() {

        it('intercepts sig int', function(done) {

            COMPOSITE.Process.onExit = function() {
                console.log('process closed...not exiting')
                done();
            };

            COMPOSITE.Process.once('exit', function(exitPromises) {
                var exitProcess = new RSVP.Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve(true);
                    }, 100);
                });

                exitPromises(exitProcess);
            })

            process.emit('SIGINT');
        })

        it('closes an empty stream', function(done) {
            var testFilename = 'emptyJSONWriterExit.json';

            COMPOSITE.Process.onExit = function() {
                console.log('JSONWriter closed...not exiting')
                var emptyArray = fs.readFileSync(testFilename, 'utf8');
                assert.strictEqual(emptyArray, '[\n\n]\n');
                fs.unlink(testFilename);
                done();
            }

            var jsonWriter = new COMPOSITE.JSONWriter({file : testFilename});

            process.emit('SIGINT');
        })

        it('closes streams on sig int', function(done) {
            COMPOSITE.Process.onExit = function() {
                console.log('filebuffer closed...not exiting')

                var dagNotify = Pipeline.DAGNotify();

                var testNode = {
                    type : 'TestNode',
                    testFunction : function (node) {
                        if (node.id === 'test') {
                            fs.unlink('processJSONWriterTestObjects.json');
                            done();
                        }
                    }
                }

                var pipe = Pipeline.append(testNode, dagNotify);

                var testData = {
                    type: 'JSONReader',
                    file: 'processJSONWriterTestObjects.json'
                }

                pipe.bin.mux.add(testData);

                testData.object.resume();
            };

            var jsonWriter = {file : 'processJSONWriterTestObjects.json'};
            var fb = new COMPOSITE.JSONWriter(jsonWriter);
            fb.add({id : 'test'});
            process.emit('SIGINT');
        })

    })
})(COMPOSITE.Process, COMPOSITE.Pipeline)
