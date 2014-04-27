/*
 * (C) 2014 SoftwareCo-oP
 */

(function(COMPOSITE) {

    /*
     * Unique tests if a node exists in a datastructure
     */
    function Unique(dag) {
        this.dag = dag;
    }

    /*
     * @param {Node} node to check for duplication.
     * @return the node if it is not a duplicate and null otherwise.
     */
    Unique.prototype.add = function(node) {
        if (this.dag.exists(node)) {
            var dagNode = this.dag.get(node.id);
            if (dagNode.hash === node.hash) {
                throw new Error('node already in memory: ' + node.id);
            }
        }
        return node;
    }

    COMPOSITE.Unique = Unique;
    return Unique;

})(COMPOSITE)
