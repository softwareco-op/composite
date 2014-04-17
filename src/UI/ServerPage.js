/*
 * (C) 2014 SoftwareCo-oP
 */

define(
['UI/Page', 'Server/NodeSocket', 'socketioclient', 'Composition/Global', 'lodash'],
function(Page, NodeSocket, socketioclient, Global,  _) {

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
        Global.pipeline = this.pipeline;
        return this.pipeline;
    }

    return ServerPage;

})
