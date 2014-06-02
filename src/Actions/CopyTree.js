///
// (C) 2014 SoftwareCo-oP
///

(function(COMPOSITE, Path, Global, Action, DAGUtil, _) {

    function CopyTree(node) {
        this.node = node;
    }
    _.extend(CopyTree.prototype, Action.prototype);

    /*
     * Copies a tree from a source to a destination.
     */
    CopyTree.prototype.perform = function(node, dag) {
        var copies;

        var source;
        if (this.node.source) {
            source = dag.get(node.source);
        } else if (this.node.sourcePath) {
            source = Path.getNode(dag, node, this.node.sourcePath);
        } else {
            var parent = dag.getParent(node);
            source = dag.getParent(parent);
        }

        var destination;
        if (this.node.destination) {
            destination = dag.get(node.destination);
        } else if (this.node.destinationPath) {
            destination = Path.getNode(dag, node, this.node.destinationPath);
        } else {
            destination = source;
        }

        copies = DAGUtil.copyTreeTo(dag, source, destination);

        _.map(copies, Global.pipeline, Global.pipeline);
    }

    COMPOSITE.CopyTree = CopyTree;
    return CopyTree;

})(COMPOSITE, COMPOSITE.Path, COMPOSITE.Global, COMPOSITE.Action, COMPOSITE.DAGUtil, _);
