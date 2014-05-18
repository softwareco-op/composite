/*
 * (C) 2014 SoftwareCo-oP
 */

(function(COMPOSITE, DAGUtil) {

    /*
     * A DAGReplier fullfills requests for nodes on the DAGReplier's DAG
     */
    function DAGReplier(node) {
        this.node = node;
    }
    COMPOSITE.DAGReplier = DAGReplier;

    /*
     * Takes a request and responds with the requested portion
     * of the DAG.
     * @param {Object} request.socket is the origin of the request
     * @param {Object} request.subtree id of the parent
     * @param {Object} request.verb to act on
     */
    DAGReplier.prototype.add = function(request) {
        if (!(request.verb && request.subtree)) {
            return request;
        }

        var parent = this.node.bin.dag.get(request.subtree);

        if (!parent) {
            request.response = 404;
            return request;
        }

        var results = DAGUtil.searchSubTree(this.node.bin.dag, parent, function(node) {return true;}, -1);
        for (var i = 0 ; i < results.length ; i++) {
            SocketUtil.sendNode(request.socket, results[i]);
        }

        request.response = 200;

        return request;
    }

})(COMPOSITE, COMPOSITE.DAGUtil)
