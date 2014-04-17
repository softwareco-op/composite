///
// (C) 2014 SoftwareCo-oP
///

define(['Composition/Global', 'lodash'], function(Global, _) {

    function CopyTree(node) {
        _.merge(this, node);
    }

    CopyTree.prototype.perform = function(dag, node) {
        var parent = dag.getParent(node);
        var grandparent = dag.getParent(parent);
        var copies = dag.copyTreeTo(grandparent, grandparent);
        _.map(copies, Global.pipeline, Global.pipeline);
    }

    return CopyTree;

});
