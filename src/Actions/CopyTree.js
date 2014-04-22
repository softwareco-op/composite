///
// (C) 2014 SoftwareCo-oP
///

define(['Composition/Global', 'Actions/Action', 'lodash'], function(Global, Action, _) {

    function CopyTree(node) {
        _.merge(this, node);
    }
    _.extend(CopyTree.prototype, Action.prototype);

    CopyTree.prototype.perform = function(node, dag) {
        var copies;
        if (node.source === undefined || node.destination === undefined) {
            var parent = dag.getParent(node);
            var grandparent = dag.getParent(parent);
            copies = dag.copyTreeTo(grandparent, grandparent);
        } else {
            var source = dag.get(node.source);
            var destination = dag.get(node.destination);
            copies = dag.copyTreeTo(source, destination);
        }

        _.map(copies, Global.pipeline, Global.pipeline);
    }


    return CopyTree;

});
