/*
 * (C) 2014 SoftwareCo-oP
 */

(function(COMPOSITE, Cloner) {

    var JSONStream = require('JSONStream');
    var fs = require('fs');
    var RSVP = require('rsvp');

    /*
     * A file buffer that appends objects to a file in JSON format, then reads the
     * file, parses the JSON representation into an object, and passes the object to the muxer.
     */
    function FileBuffer(node) {
        this.node = node;
        this.file = node.file;
        this.cloner = new Cloner();
        this.resume();
    }
    COMPOSITE.FileBuffer = FileBuffer;

    /*
     * Resume creates the file and JSON streams.
     */
    FileBuffer.prototype.resume = function() {

        this.jsonStream = JSONStream.stringify();
        this.fileStream = fs.createWriteStream(this.file, {'flags':'a'});

        //append to our buffer file
        this.jsonStream.pipe(this.fileStream);

        var self = this;
        //before we get interrupted, finish the JSON stream and close the file.
        process.on('SIGINT', function() {
            self.end();
        })
    }

    /*
     * Stop streaming and release system resources.
     */
    FileBuffer.prototype.end = function() {
        var self = this;
        var jsonFinish = new RSVP.Promise(function(resolve, reject) {
            self.jsonStream.on('finish', function() {
                resolve(true);
            })
            self.jsonStream.end();
        })

        var fileFinish = new RSVP.Promise(function(resolve, reject) {
            self.fileStream.on('finish', function() {
                resolve(true);
            })
            self.fs.end();
        })

        RSVP.all([jsonFinish, fileFinish]).then(function() {
            console.log('all done');
            process.exit()
        })
    }

    FileBuffer.prototype.add = function(node) {
        this.jsonStream.write(this.cloner.stripNode(node));
        return node;
    }

    return FileBuffer;

})(COMPOSITE, COMPOSITE.Cloner)
