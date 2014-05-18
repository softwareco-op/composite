/*
 * (C) 2014 SoftwareCo-oP
 */

(function(COMPOSITE, SocketUtil) {

    /*
     * ClientSocket transports nodes.
     */
    function ClientSocket(node) {
        this.node = node
        this.url = node.url;
        this.pipe();
    }
    COMPOSITE.ClientSocket = ClientSocket;

    /*
     * Transport a node
     * @param {Node} node to transport.
     */
    ClientSocket.prototype.add = function(node) {
        SocketUtil.sendNode(this.socket, node);
        return node;
    }

    /*
     * Start piping
     */
    ClientSocket.prototype.pipe = function() {
        var self = this;
        this.socket = new WebSocket(this.url);
        this.socket.on('open', function() {
            self.socket.on('message', function(node) {
                var toPipe = JSON.parse(node);
                self.node.bin.mux.add(toPipe);
            });
        })
    }

    ClientSocket.prototype.end = function() {
        this.socket.close();
    }

    return ClientSocket;

})(COMPOSITE, COMPOSITE.SocketUtil)
