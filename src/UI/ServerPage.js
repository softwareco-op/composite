/*
 * (C) 2014 SoftwareCo-oP
 */

(function(COMPOSITE, Page, NodeSocket, socketioclient, _) {

    /*
     * ServerPage is a page that is connected to a server.
     */
    function ServerPage(page, url) {
        this.socket = socketioclient.connect(url);
        this.nodeSocket = new NodeSocket(this.socket);
        this.page = page;
    }

    ServerPage.prototype.install = function() {
        this.pipeline = this.page.install();
        this.nodeSocket.install(this.pipeline);
        this.pipeline = _.compose(_.bind(this.nodeSocket.add, this.nodeSocket),
                                  this.pipeline);
        COMPOSITE.pipeline = this.pipeline;
        return this.pipeline;
    }

    COMPOSITE.ServerPage = ServerPage;
    return ServerPage;

})(COMPOSITE, COMPOSITE.Page, COMPOSITE.NodeSocket, socketioclient, _)
