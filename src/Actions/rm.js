/*
 * (C) 2014 SoftwareCo-oP
 */

(function(COMPOSITE) {

    /*
     * rm recursively removes nodes from the DAG.
     */
    function rm(node) {
        this.node = node;
    }
    _.extend(rm.prototype, Action.prototype);

    /*
     * Removes nodes from the DAG.
     *
     * @param {string} node.sourcePath referencing the node to remove (e.g. '../../')
     */
    rm.prototype.perform = function(node, dag) {
        var source = Path.getNode(dag, node, this.node.sourcePath);

        DAGUtil.rmTree(dag, source);

        source.object.render(source);
    }

})(COMPOSITE, COMPOSITE.Path)
