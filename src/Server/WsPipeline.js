/*
 * (C) 2014 SoftwareCo-oP
 */

(function(COMPOSITE, WsStaticServer, Cloner) {

    /*
     * WsPipeline sends http traffic to a pipeline
     */
    function WsPipeline(node) {
        this.servePath = node.servePath;
        this.port = node.port;
        this.wsPath = node.wsPath;
        this.node = node;
        this.cloner = new Cloner();
        this.pipe();
    }
    COMPOSITE.WsPipeline = WsPipeline;

    /*
     * Start the http server and create the node pipeline.
     */
    WsPipeline.prototype.pipe = function() {
        this.wsStaticServer = new WsStaticServer(this.node);

        var self = this;

        this.wsStaticServer.listen(function(wss) {

            wss.on('connection', function(ws) {

                ws.on('message', function(node) {
                    node = JSON.parse(node);
                    try {
                        var nodeOut = self.node.bin.mux.add(node);
                        var toSend = JSON.stringify(self.cloner.stripNode(nodeOut));
                        for (var client in wss.clients) {
                            wss.clients[client].send(toSend);
                        }
                    } catch (error) {
                        console.log(error);
                    }
                })

            })
        })
    }

    WsPipeline.prototype.end = function() {
        this.wsStaticServer.close();
    }

    return WsPipeline;

})(COMPOSITE, COMPOSITE.WsStaticServer, COMPOSITE.Cloner)
