///
// (C) 2014 SoftwareCo-oP
///

define(['Composition/Global'], function(Global) {

    function StoreValue(node) {this.node = node}

    StoreValue.prototype.perform = function(input, node) {
        var toChange = this.dag.clone(node);
        toChange.value = input.value;
        this.dag.validateNode(toChange);
        Global.pipeline(toChange);
    }

    StoreValue.prototype.add = function(node, dag, dom) {
        this.dag = dag;
        return;
    }

    return StoreValue;

});
