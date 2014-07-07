/*
 * (C) 2014 SoftwareCo-oP
 */

(function(COMPOSITE, Cloner, Process) {

    var JSONStream = require('JSONStream');
    var fs = require('fs');
    var RSVP = require('rsvp');

    /*
     * A file buffer that appends objects to a file in JSON format, then reads the
     * file, parses the JSON representation into an object, and passes the object to the muxer.
     */
    function JSONWriter(node) {
        this.node = node;
        this.file = node.file;
        this.cloner = new Cloner();
        this.resume();
    }
    COMPOSITE.JSONWriter = JSONWriter;

    /*
     * Resume creates the file and JSON streams.
     */
    JSONWriter.prototype.resume = function() {

        this.jsonStream = JSONStream.stringify();
        this.fileStream = fs.createWriteStream(this.file, {'flags':'a'});

        //append to our buffer file
        this.jsonStream.pipe(this.fileStream);

        var self = this;

        self.onExit = function(exitPromises) {
            var promise = self.end();
            exitPromises(promise);
        }

        Process.once('exit', self.onExit);
    }

    /*
     * Stop streaming and release system resources.  Call promise
     */
    JSONWriter.prototype.end = function(promise) {
        var self = this;

        Process.removeListener('exit', self.onExit);

        var jsonStreamFinish = new RSVP.Promise(function(resolve, reject) {
            self.jsonStream.on('finish', function() {
                resolve(true)
                console.log('dones it');
            })
        })

        var fileFinish = new RSVP.Promise(function(resolve, reject) {
            self.fileStream.on('finish', function() {
                resolve(true);
                console.log('done it');
            })
        })

        self.jsonStream.end();
        self.fileStream.end();

        return RSVP.all([jsonStreamFinish, fileFinish]);
    }

    JSONWriter.prototype.add = function(node) {
        this.jsonStream.write(this.cloner.stripNode(node));
        return node;
    }

    return JSONWriter;

})(COMPOSITE, COMPOSITE.Cloner, COMPOSITE.Process)
