///
// (C) 2014 SoftwareCo-oP
///

define(['Model/Path', 'Composition/Global', 'Actions/Action', 'lodash'], function(Path, Global, Action, _) {

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


    return CopyTree;

});
