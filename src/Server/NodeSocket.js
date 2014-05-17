/*
 * (C) 2014 SoftwareCo-oP
 */

(function(COMPOSITE, Cloner) {

    /*
     * NodeSocket transports nodes.
     */
    function NodeSocket(node) {
        this.node = node
        this.url = node.url;
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
        try {
            this.socket.send(JSON.stringify(toSend));
        } catch (error) {
            console.error("trying to send to a busted web socket.  maybe it's not open yet");
        }
        return node;
    }

    /*
     * Start piping
     */
    NodeSocket.prototype.pipe = function() {
        var self = this;
        this.socket = new WebSocket(this.url);
        this.socket.on('open', function() {
            self.socket.on('message', function(node) {
                var toPipe = JSON.parse(node);
                self.node.bin.mux.add(toPipe);
            });
        })
    }

    NodeSocket.prototype.end = function() {
        this.socket.close();
    }

    return NodeSocket;

})(COMPOSITE, COMPOSITE.Cloner)
