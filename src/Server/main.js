global.COMPOSITE = {}

var path = require('path');
var servePath = path.dirname(path.dirname(__dirname));
//var servePath = __dirname;
require('../../src/Server/NodeDeps');

(function(Pipeline) {
    console.log(servePath);
    Pipeline.bufferedServer(3000, servePath, 'nodeStream.json');
})(COMPOSITE.Pipeline)

