/*
 * (C) 2014 SoftwareCo-oP
 */

(function(COMPOSITE, Path, DAGUtil, Action, _) {

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

        var parent = dag.getParent(source);

        DAGUtil.unlinkChild(parent, source);

        DAGUtil.rmTree(dag, source);

        var head = dag.get('head');

        head.bin.mux.add(parent);

//        source.object.update(source);
    }

    COMPOSITE.rm = rm;
    return rm;

})(COMPOSITE, COMPOSITE.Path, COMPOSITE.DAGUtil, COMPOSITE.Action, _)
