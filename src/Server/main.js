global.COMPOSITE = {}

var path = require('path');
var servePath = path.dirname(path.dirname(__dirname));
//var servePath = __dirname;
require('../../src/Server/NodeDeps');

(function(Pipeline) {
    console.log(servePath);
    try {
        Pipeline.bufferedServer(3000, servePath, 'nodeStream.json');
    } catch (error) {
        console.log('in catch');
        console.debug(error);
    }

})(COMPOSITE.Pipeline)

