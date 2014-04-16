/*
 * (C) 2014 SoftwareCo-oP
 */

define(
['Model/Cloner'],
function(Cloner) {

    /*
     * NodeSocket transports nodes.
     */
    function NodeSocket(socket) {
        this.socket = socket;
        this.cloner = new Cloner();
    }

    /*
     * Transport a node
     * @param {Node} node to transport.
     */
    NodeSocket.prototype.add = function(node) {
        var toSend = this.cloner.stripNode(node);
        this.socket.emit('node', toSend);
    }

    /*
     * Install this on a node pipeline
     * @param {Function} pipeline to send nodes through.
     */
    NodeSocket.prototype.install = function(pipeline) {
        this.socket.on('node', function(node) {
            pipeline(node);
        });
    }

    return NodeSocket;

})
