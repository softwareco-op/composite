///
// (C) 2014 SoftwareCo-oP
///

define(['Composition/Global'], function(Global) {

    function CopyTree(model) {
        this.model = model;
    }

    CopyTree.prototype.perform = function() {

        var self = this;
        var dag = Global.dag;

        var parent = dag.getParent(this.model);
        var grandparent = dag.getParent(parent);
        var copy = dag.copyTree(grandparent);
        dag.setChild(grandparent, copy);
        console.log(JSON.stringify(dag.collection));
    }

    return CopyTree;

});
