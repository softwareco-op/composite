/*
 * (C) 2014 SoftwareCo-oP
 */

(function(COMPOSITE, WsStaticServer, Cloner) {

    /*
     * ServerSocket sends http traffic to a pipeline
     */
    function ServerSocket(node) {
        this.servePath = node.servePath;
        this.port = node.port;
        this.wsPath = node.wsPath;
        this.node = node;
        this.cloner = new Cloner();
        this.pipe();
    }
    COMPOSITE.ServerSocket = ServerSocket;

    /*
     * Start the http server and create the node pipeline.
     */
    ServerSocket.prototype.pipe = function() {
        this.wsStaticServer = new WsStaticServer(this.node);

        var self = this;

        this.wsStaticServer.listen(function(wss) {

            wss.on('connection', function(ws) {

                ws.on('message', function(node) {
                    node = JSON.parse(node);
                    try {
                        node.var = node.var || {}
                        node.var.socket = ws;
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

    ServerSocket.prototype.end = function() {
        this.wsStaticServer.close();
    }

    return ServerSocket;

})(COMPOSITE, COMPOSITE.WsStaticServer, COMPOSITE.Cloner)
