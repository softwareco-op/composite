/*
 * (C) 2014 SoftwareCo-oP
 */

(function(COMPOSITE, DAG, Unique) {

    /*
     * NodeBuffer stores nodes consistently in a buffer.
     */
    function NodeBuffer(dag) {
        this.dag = dag || new DAG();
        this.unique = new Unique(this.dag);
    }
    COMPOSITE.NodeBuffer = NodeBuffer;

    NodeBuffer.prototype.install = function() {
        var pipeline = _.compose(_.bind(this.dag.add, this.dag),
                                 _.bind(this.unique.add, this.unique));
        return pipeline;
    }

    return NodeBuffer;

})(COMPOSITE, COMPOSITE.DAG, COMPOSITE.Unique);
