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
        var pipe = Pipeline.DAGNotify();

        var application = {
            type: 'JSONReader',
            file: 'ballot.json'
        }

        //Remove ObjectSupplier.
        //We don't want to instantiate or execute any foreign objects that we haven't already installed.
        //Wait till after kernel has loaded.
        var loadApp = function() {
            pipe = Pipeline.remove('objectSupplier', pipe);
            application.object.resume();
        }

        var kernel = {
            type : 'JSONReader',
            file : 'bufferedServer.json',
            onEnd : loadApp
        }

        pipe.bin.mux.add(kernel);
        pipe.bin.mux.add(application);
        kernel.object.resume();

    } catch (error) {

        console.log('in catch');
        console.log(error);

    }

})(COMPOSITE.Pipeline)
