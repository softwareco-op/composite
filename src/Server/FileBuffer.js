/*
 * (C) 2014 SoftwareCo-oP
 */

(function(COMPOSITE, Cloner) {

    var JSONStream = require('JSONStream');
    var fs = require('fs');

    /*
     * A file buffer that appends objects to a file in JSON format, then reads the
     * file, parses the JSON representation into an object, and passes the object to the muxer.
     */
    function FileBuffer(options) {
        this.file = options.file;
        this.cloner = new Cloner();
        this.resume();
    }
    COMPOSITE.FileBuffer = FileBuffer;

    /*
     * Resume creates the file and JSON streams.
     */
    FileBuffer.prototype.resume = function() {
        this.jsonStream = JSONStream.stringify();
        //append to our buffer file
        this.jsonStream.pipe(fs.createWriteStream(this.file, {'flags':'a'}));

        /*
        this.jsonRead = JSONStream.parse('*');
        this.fileRead = fs.createReadStream(this.file);
        this.fileRead.pipe(this.jsonRead)
        */
    }

    /*
     * Stop streaming and release system resources.
     */
    FileBuffer.prototype.end = function() {
        this.jsonStream.end();
        //this.jsonRead.end();
    }

    FileBuffer.prototype.add = function(node) {
        this.jsonStream.write(this.cloner.stripNode(node));
        return node;
    }

    return FileBuffer;

})(COMPOSITE, COMPOSITE.Cloner)
