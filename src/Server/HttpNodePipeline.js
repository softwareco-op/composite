/*
 * (C) 2014 SoftwareCo-oP
 */

(function(COMPOSITE, HttpServer, NodeBuffer, events) {

    /*
     * HttpNodePipeline sends http traffic to a node pipeline
     */
    function HttpNodePipeline(servePath, port) {
        this.servePath = servePath;
        this.port = port;
    }

    /*
     * Start the http server and create the node pipeline.
     */
    HttpNodePipeline.prototype.install = function() {
        this.eventBus = new events.EventEmitter();
        this.httpServer = new HttpServer(this.port, this.eventBus, this.servePath);
        this.io = this.httpServer.startService({log:false});

        this.nodeBuffer = new NodeBuffer();
        this.pipeline = this.nodeBuffer.install();

        return this.pipeline;
    }


    /*
     * Route incoming nodes to the pipeline.
     */
    HttpNodePipeline.prototype.routeNodesToPipeline = function() {
        var self = this;

        this.io.sockets.on('connection', function(socket) {

            socket.on('node', function(node) {

                try {
                    var nodeOut = self.pipeline(node);
                    console.log(nodeOut);
                    console.log(self.httpServer.socketList.length);
                    self.httpServer.socketList.map(function(copyToSocket) {
                        if (copyToSocket !== socket) {
                            copyToSocket.emit('node', nodeOut);
                        }
                    })
                    //self.io.sockets.emit('node', nodeOut);

                } catch (error) {}

            })

        })
    }

    return HttpNodePipeline;

})(COMPOSITE, COMPOSITE.HttpServer, COMPOSITE.NodeBuffer, events)
