/*
 * (C) 2014 SoftwareCo-oP
 */

(function(COMPOSITE, Cloner) {

    /*
     * NodeSocket transports nodes.
     */
    function NodeSocket(options) {
        this.url = socket.options;
        this.cloner = new Cloner();
        this.pipe();
    }
    COMPOSITE.NodeSocket = NodeSocket;

    /*
     * Transport a node
     * @param {Node} node to transport.
     */
    NodeSocket.prototype.add = function(node) {
        var toSend = this.cloner.stripNode(node);
        this.socket.send(JSON.stringify(toSend));
        return node;
    }

    /*
     * Start piping
     */
    NodeSocket.prototype.pipe = function() {
        var self = this;
        this.socket = new WebSocket(this.url);
        this.socket.on('open', function() {
            this.socket.on('message', function(node) {
                var toPipe = JSON.parse(node);
                self.bin.mux.add(toPipe);
            });
        })
    }

    NodeSocket.prototype.end = function() {
        this.socket.close();
    }

    return NodeSocket;

})(COMPOSITE, COMPOSITE.Cloner)
