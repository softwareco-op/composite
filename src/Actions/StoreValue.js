///
// (C) 2014 SoftwareCo-oP
///

(function(COMPOSITE, Global, Action, _) {

    function StoreValue(node) {this.node = node}
    _.extend(StoreValue.prototype, Action.prototype);

    StoreValue.prototype.perform = function(node, dag) {
        var input = dag.getParent(node);
        var toChange = this.dag.clone(input);
        toChange.value = input.object.el.value;
        this.dag.validateNode(toChange);
        var head = dag.get('head');
        head.bin.mux.add(toChange);
    }

    COMPOSITE.StoreValue = StoreValue;
    return StoreValue;

})(COMPOSITE, COMPOSITE.Global, COMPOSITE.Action, _);
