/*
 * (C) 2014 SoftwareCo-oP
 */

(function(COMPOSITE, Pipeline) {

    var JSONStream = require('JSONStream');
    var fs = require('fs');

    /*
     * Reads a stream and pipes the result to a pipeline.
     * Can use DAGNotify to feed a pipeline upon passing through the pipeline.
     */
    function JSONReader(options) {
        this.options = options;
    }
    COMPOSITE.JSONReader = JSONReader;

    JSONReader.prototype.pipeTo = function(pipe) {
        this.jsonStream = JSONStream.parse('*');
        this.readStream = fs.createReadStream(this.options.file);

        this.readStream.pipe(this.jsonStream)

        this.jsonStream.on('data', function(object) {
            pipe(object);
        })
        this.readStream.resume();
    }

    JSONReader.prototype.end = function() {
        this.jsonStream.end();
        //this.readStream.end();
    }

    JSONReader.prototype.addNode = function() {
        var self = this;
        var fn = function(node) {
            var head = Pipeline.head(self.options.bin.dag, self.options.bin.dag.node);
            head.bin.mux.add(node)
        }
        this.pipeTo(fn);
    }

    return JSONReader;

})(COMPOSITE, COMPOSITE.Pipeline)
