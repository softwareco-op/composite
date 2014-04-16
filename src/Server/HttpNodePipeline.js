/*
 * (C) 2014 SoftwareCo-oP
 */

define(
['Server/HttpServer', 'Server/NodeBuffer', 'events'],
function(HttpServer, NodeBuffer, events) {

    /*
     * HttpNodePipeline sends http traffic to a node pipeline
     */
    function HttpNodePipeline(servePath, port) {
        this.servePath = servePath;
        this.port = port;
    }

    HttpNodePipeline.prototype.install = function() {
        this.eventBus = new events.EventEmitter();
        this.httpServer = new HttpServer(this.port, this.eventBus, this.servePath);
        this.io = this.httpServer.startService({log:false});
        this.nodeBuffer = new NodeBuffer();
        this.pipeline = this.nodeBuffer.install();
        return this.pipeline;
    }

    return HttpNodePipeline;

})
