///
// (C) 2014 SoftwareCo-oP
///

(function(COMPOSITE, Path, Action, DAGUtil, Pipeline, _) {

    function CopyTree(node) {
        this.node = node;
    }
    _.extend(CopyTree.prototype, Action.prototype);

    /*
     * Copies a tree from a source to a destination.
     * Sends the copy to the default head pipeline
     *
     */
    CopyTree.prototype.perform = function(node, dag) {
        var copies;

        var source = Path.getNode(dag, node, this.node.sourcePath);

        var destination = Path.getNode(dag, node, this.node.destinationPath);

        copies = DAGUtil.copyTreeTo(dag, source, destination);

        var head = dag.get('head');

        for (var i = 0 ; i < copies.length ; i++) {
            head.bin.mux.add(copies[i]);
        }

    }

    COMPOSITE.CopyTree = CopyTree;
    return CopyTree;

})(COMPOSITE, COMPOSITE.Path, COMPOSITE.Action, COMPOSITE.DAGUtil, COMPOSITE.Pipeline, _);
