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
//        var pipe = Pipeline.bufferedServer(3000, servePath, 'nodeStream.json');
        var pipe = Pipeline.DAGNotify();
        var reader = {
                type : 'JSONReader',
                file : 'bufferedServer.json'
        }
        pipe.bin.mux.add(reader);
    } catch (error) {
        console.log('in catch');
        console.log(error);
    }

})(COMPOSITE.Pipeline)
