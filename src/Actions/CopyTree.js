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
        var copies = dag.copyTree(grandparent);
        var copy = copies[0];
        dag.setChild(grandparent, copy);
        _.map(copies, Global.pipeline, Global.pipeline);
    }

    return CopyTree;

});
