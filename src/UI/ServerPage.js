/*
 * (C) 2014 SoftwareCo-oP
 */

define(
['UI/Page', 'Server/NodeSocket', 'Composition/Global', 'lodash'],
function(Page, NodeSocket, Global,  _) {

    /*
     * ServerPage is a page that is connected to a server.
     */
    function ServerPage(page, url) {
        this.nodeSocket = new NodeSocket(url);
        this.page = page;
    }

    ServerPage.prototype.install = function() {
        this.pipeline = this.page.install();
        this.pipeline = _.compose(_.bind(this.nodeSocket.add, this.nodeSocket),
                                  this.pipeline);
        Global.pipeline = this.pipeline;
        return this.pipeline;
    }

    return ServerPage;

})
