/*
 * (C) 2014 SoftwareCo-oP
 */

var fs = require('fs');
var JSONStream = require('JSONStream');

var assert = chai.assert;

describe('File', function() {

    it('can copy a file', function(done) {
        fs.createReadStream('./test/FileTest.js').pipe(fs.createWriteStream('FileTest.js.copy'));
        fs.unlink('FileTest.js.copy');
        done();
    })

    it('can stream objects to file', function(done) {
        var jsonStream = JSONStream.stringify();
        jsonStream.pipe(fs.createWriteStream('objects.json', {'flags':'a'}));


        var jsonRead = JSONStream.parse('*');
        fs.createReadStream('objects.json').pipe(jsonRead)
        jsonRead.on('data', function(object) {
            assert.equal(object.id, 0);

        })
        jsonRead.on('end', function() {
            fs.unlink('objects.json');
        })
        jsonStream.write({id: '0'});
        jsonStream.end();

        done()
    })

})
