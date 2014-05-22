global.COMPOSITE = {}

var path = require('path');
var JSONStream = require('JSONStream');
var fs = require('fs');
var servePath = path.dirname(path.dirname(__dirname));

//var servePath = __dirname;
require('../../src/Server/NodeDeps');

(function(Pipeline) {
    console.log(servePath);
    try {
        var pipe = Pipeline.bufferedServer(3000, servePath, 'nodeStream.json');
        this.jsonRead = JSONStream.parse('*');
        this.fileRead = fs.createReadStream(this.file);
        this.jsonRead.on('data', function(node) {
            pipe.bin.mux.add(node);
        })
        this.fileRead.pipe(this.jsonRead)

    } catch (error) {
        console.log('in catch');
        console.log(error);
    }

})(COMPOSITE.Pipeline)

