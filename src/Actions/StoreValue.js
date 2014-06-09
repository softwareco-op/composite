///
// (C) 2014 SoftwareCo-oP
///

(function(COMPOSITE, Action, DAGUtil, _) {

    function StoreValue(node) {this.node = node}
    _.extend(StoreValue.prototype, Action.prototype);
    COMPOSITE.StoreValue = StoreValue;

    /*
     * Store the value of a dom element (i.e. input field) on the node.  
     * Storing the value on the node helps persist data.
     */
    StoreValue.prototype.perform = function(node, dag) {
        var input = dag.getParent(node);
        var toChange = DAGUtil.clone(input);
        toChange.html.value = input.object.el.value;
        DAGUtil.validateNode(toChange);
        var head = dag.get('head');
        head.bin.mux.add(toChange);
    }

    return StoreValue;

})(COMPOSITE, COMPOSITE.Action, COMPOSITE.DAGUtil, _);
