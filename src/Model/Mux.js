/*
 * (C) 2014 SoftwareCo-oP
 */

(function(COMPOSITE) {

    /*
     * Mux performs a function and passes the result to child Muxes
     *
     * @constructor
     */
    function Mux(node) {
        this.node = node
        this.node.bin = this.node.bin || {}
        this.node.bin.mux = this;
    }
    COMPOSITE.Mux = Mux;

    /*
     * Add a node to a function DAG
     *
     * @param {Object} node to process
     * @return {Object} node returned from perform
     */
    Mux.prototype.add = function(node) {

        if (this.node.object && this.node.object.add) {
            node = this.node.object.add(node);
        }

        if (!this.node.bin.dag) {
            return;
        }

        var children = this.node.bin.dag.getChildren(this.node);

        for (var i = 0 ; i < children.length ; i++) {
            var child = children[i]

            if (child.bin && child.bin.mux) {
                child.bin.mux.add(node);
            }
        }

        return node;
    }

    return COMPOSITE.Mux;

})(COMPOSITE)
