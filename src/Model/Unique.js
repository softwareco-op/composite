/*
 * (C) 2014 SoftwareCo-oP
 */

(function(COMPOSITE, DAGUtil) {

    /*
     * Unique tests if a node exists in a datastructure
     */
    function Unique(node) {
        this.node = node;
    }

    /*
     * @param {Node} node to check for duplication.
     * @return the node if it is not a duplicate and null otherwise.
     */
    Unique.prototype.add = function(node) {
        if (this.node.bin.dag.exists(node)) {
            var dagNode = this.node.bin.dag.get(node.id);
            var dagNodeHash = dagNode.hash;

            node = DAGUtil.validateNode(node);

            if (dagNodeHash === node.hash) {
                throw new Error('node already in memory: ' + node.id);
            }
        }
        return node;
    }

    COMPOSITE.Unique = Unique;
    return Unique;

})(COMPOSITE, COMPOSITE.DAGUtil)
