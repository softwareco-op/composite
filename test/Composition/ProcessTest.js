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
                console.log('everything closed...not exiting')
                done();
            };

            COMPOSITE.Process.on('exit', function(exitPromises) {
                var exitProcess = new RSVP.Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve(true);
                    }, 100);
                });

                exitPromises(exitProcess);
            })

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
                            fs.unlink('processFileBufferTestObjects.json');
                            done();
                        }
                    }
                }

                var pipe = Pipeline.append(testNode, dagNotify);

                var testData = {
                    type: 'JSONReader',
                    file: 'processFileBufferTestObjects.json'
                }

                pipe.bin.mux.add(testData);

                testData.object.resume();
            };

            var fileBuffer = {file : 'processFileBufferTestObjects.json'};
            var fb = new COMPOSITE.FileBuffer(fileBuffer);
            fb.add({id : 'test'});
            process.emit('SIGINT');
        })

    })
})(COMPOSITE.Process, COMPOSITE.Pipeline)
