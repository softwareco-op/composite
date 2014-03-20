///
// (C) 2014 SoftwareCo-oP
///

define(['Composition/Global'], function(Global) {

    function CopyTree(model) {this.model = model}

    CopyTree.prototype.perform = function() {

        var dag = Global.dag;
        dag.copyTree(this.model);

    }

    return CopyTree;

});
