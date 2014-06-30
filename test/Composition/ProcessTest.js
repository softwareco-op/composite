/*
 * (C) 2014 SoftwareCo-oP
 */

require('../../src/Server/NodeDeps.js');
require('../../src/Test/UnitTest.js');
var RSVP = require('rsvp');
var chai = require('chai');
var assert = chai.assert;


(function(Process) {
    describe('Process', function() {

        it('intercepts sig int', function(done) {
            Process.on('exit', function(exitPromises) {
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
            var fileBuffer = {file : 'processFileBufferTestObjects.json'};
            var fb = new COMPOSITE.FileBuffer(fileBuffer);
            fb.add({id : 'test'});

            process.emit('SIGINT');

            fs.unlink('processFileBufferTestObjects.json');
            done();
        })

    })
})(COMPOSITE.Process)
