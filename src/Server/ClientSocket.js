/*
 * (C) 2014 SoftwareCo-oP
 */

(function(COMPOSITE, SocketUtil, Pipeline) {

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
        if (this.node.browser) {
            this.socket.onmessage = function(event) {
                self.forwardMessage(event.data);
            }
        } else {
            this.socket.on('open', function() {
                self.socket.on('message', function(data) {
                    self.forwardMessage(data);
                });
            })
        }
    }

    ClientSocket.prototype.forwardMessage = function(data) {
        var self = this;
        var toPipe = JSON.parse(data);
        if (self.head === undefined) {
            self.head = Pipeline.head(self.node.bin.dag, self.node)
        }
        self.head.bin.mux.add(toPipe);
    }

    ClientSocket.prototype.end = function() {
        this.socket.close();
    }

    return ClientSocket;

})(COMPOSITE, COMPOSITE.SocketUtil, COMPOSITE.Pipeline)
