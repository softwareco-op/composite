/*
 * (C) 2014 SoftwareCo-oP
 */

(function(COMPOSITE, http, express, WebSocketServer, WebSocket) {

    /*
     * A websocket server that serves static content
     */
    function WsStaticServer(options) {
        this.port = options.port;
        this.path = options.path;
        this.wsPath = options.wsPath;
    }
    COMPOSITE.WsStaticServer = WsStaticServer;

    WsStaticServer.prototype.listen = function(onListen) {
        this.app = express();
        this.server = http.createServer(this.app);

        var self = this;
        this.server.listen(this.port, function() {
            self.wss = new WebSocketServer({server : self.server, path:self.wsPath});
            onListen(self.wss);
        })
    }

    WsStaticServer.prototype.close = function() {
        this.wss.close();
        this.server.close();
    }

    return WsStaticServer;

})(COMPOSITE, http, express, WebSocketServer, WebSocket)
