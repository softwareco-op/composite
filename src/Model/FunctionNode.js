/*
 * (C) 2014 SoftwareCo-oP
 */

(function(COMPOSITE) {

    /*
     * FunctionNode performs a function and passes the result to child FunctionNodes
     *
     * @constructor
     */
    function FunctionNode() {}
    COMPOSITE.FunctionNode = FunctionNode;

    /*
     * Add a node to the function DAG
     *
     * @param {Object} node to process
     * @return {Object} node returned from perform
     */
    FunctionNode.prototype.add = function(node) {

        node = this.perform(node);

        if (!COMPOSITE.DAG) {
            return;
        }

        var children = COMPOSITE.DAG.getChildren(this);

        for (var i = 0 ; i < children.length ; i++) {
            var child = children[i]

            if (child.add) {
                child.add(node);
            }
        }

        return node;
    }

    return COMPOSITE.FunctionNode;

})(COMPOSITE)
