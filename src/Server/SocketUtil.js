/*
 * (C) 2014 SoftwareCo-oP
 */

(function(COMPOSITE, Cloner) {
    COMPOSITE.SocketUtil = {

        cloner : new Cloner(),

        /*
         * Send a node to through a socket.
         */
        sendNode : function(socket, node) {
            var toSend = this.cloner.stripNode(node);
            try {
                socket.send(JSON.stringify(toSend));
            } catch (error) {
                console.error(error);
                console.error("SocketUtil: trying to send to a busted web socket.  maybe it's not open yet?");
            }
        }

    }

})(COMPOSITE, COMPOSITE.Cloner)
