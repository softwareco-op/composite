///
// (C) 2014 SoftwareCo-oP
///

define(['Composition/Global'], function(Global) {

    function CopyTree(model) {this.model = model}

    CopyTree.prototype.perform = function() {

        var dag = Global.dag;
        var parent = dag.getParent(this.model);
        var copy = dag.copyTree(parent);
        dag.addChild(parent, copy);

    }

    return CopyTree;

});
