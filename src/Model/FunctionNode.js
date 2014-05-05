/*
 * (C) 2014 SoftwareCo-oP
 */

(function(COMPOSITE) {

    /*
     * FunctionNode performs a function and passes the result to child FunctionNodes
     *
     * @constructor
     */
    function FunctionNode(node) { this.node = node }
    COMPOSITE.FunctionNode = FunctionNode;

    /*
     * Add a node to the function DAG
     *
     * @param {Object} node to process
     * @return {Object} node returned from perform
     */
    FunctionNode.prototype.add = function(node) {

        if (this.node.object && this.node.object.add) {
            node = this.node.object.add(node);
        }

        if (!COMPOSITE.dag) {
            return;
        }

        var children = COMPOSITE.dag.getChildren(this.node);

        for (var i = 0 ; i < children.length ; i++) {
            var child = children[i]

            if (child.functionNode) {
                child.functionNode.add(node);
            }
        }

        return node;
    }

    return COMPOSITE.FunctionNode;

})(COMPOSITE)
