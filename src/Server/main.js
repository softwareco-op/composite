global.COMPOSITE = {}

var path = require('path');
var servePath = path.dirname(path.dirname(__dirname));
//var servePath = __dirname;
require('../../src/Server/NodeDeps');

(function(Pipeline) {
    console.log(servePath);
    try {
        var pipe = Pipeline.bufferedServer(3000, servePath, 'nodeStream.json');
        pipe.bin.mux.add({id:0, message:'hello world'});
    } catch (error) {
        console.log('in catch');
        console.log(error);
    }

})(COMPOSITE.Pipeline)

