/*
 * (C) 2014 SoftwareCo-oP
 */

(function(COMPOSITE, DAGUtil) {

    /*
     * Unique tests if a node exists in a datastructure
     */
    function Unique() {
    }

    /*
     * @param {Node} node to check for duplication.
     * @return the node if it is not a duplicate and null otherwise.
     */
    Unique.prototype.add = function(node) {
        if (COMPOSITE.dag.exists(node)) {
            node = DAGUtil.validateNode(node);
            var dagNode = COMPOSITE.dag.get(node.id);
            if (dagNode.hash === node.hash) {
                throw new Error('node already in memory: ' + node.id);
            }
        }
        return node;
    }

    COMPOSITE.Unique = Unique;
    return Unique;

})(COMPOSITE, COMPOSITE.DAGUtil)
