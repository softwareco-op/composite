/*
 * (C) 2014 SoftwareCo-oP
 */

(function(COMPOSITE, HttpServer, NodeBuffer) {

    /*
     * HttpNodePipeline sends http traffic to a node pipeline
     */
    function HttpNodePipeline(node) {
        this.servePath = node.servePath;
        this.port = node.port;
        this.node = node;
        this.install();
    }
    COMPOSITE.HttpNodePipeline = HttpNodePipeline;

    /*
     * Start the http server and create the node pipeline.
     */
    HttpNodePipeline.prototype.install = function() {
        this.httpServer = new HttpServer(this.port, this.servePath);
        this.io = this.httpServer.startService({log:true});
    }

    /*
     * Route incoming nodes to the pipeline.
     */
    HttpNodePipeline.prototype.routeNodesToPipeline = function() {
        var self = this;

        this.io.sockets.on('connection', function(socket) {

            socket.on('node', function(node) {

                try {
                    var nodeOut = self.node.bin.mux.add(node);
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

})(COMPOSITE, COMPOSITE.HttpServer, COMPOSITE.NodeBuffer)
