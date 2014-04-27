///
// (C) 2014 SoftwareCo-oP
///

(function(COMPOSITE, Path, Global, Action, _) {

    function CopyTree(node) {
        _.merge(this, node);
    }
    _.extend(CopyTree.prototype, Action.prototype);

    CopyTree.prototype.perform = function(node, dag) {
        var copies;

        var source;
        if (node.source) {
            source = dag.get(node.source);
        } else if (node.sourcePath) {
            source = Path.getNode(dag, node, node.sourcePath);
        } else {
            var parent = dag.getParent(node);
            source = dag.getParent(parent);
        }

        var destination;
        if (node.destination) {
            destination = dag.get(node.destination);
        } else if (node.destinationPath) {
            destination = Path.getNode(dag, node, node.destinationPath);
        } else {
            destination = source;
        }

        copies = dag.copyTreeTo(source, destination);

        _.map(copies, Global.pipeline, Global.pipeline);
    }

    COMPOSITE.CopyTree = CopyTree;
    return CopyTree;

})(COMPOSITE, COMPOSITE.Path, COMPOSITE.Global, COMPOSITE.Action, _);
