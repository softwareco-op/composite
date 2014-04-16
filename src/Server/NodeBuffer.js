/*
 * (C) 2014 SoftwareCo-oP
 */

define(['Collection/DAG', 'Model/Unique'],
function(DAG, Unique) {

    /*
     * NodeBuffer stores nodes consistently in a buffer.
     */
    function NodeBuffer(dag) {
        this.dag = dag || new DAG();
        this.unique = new Unique(this.dag);
    }

    NodeBuffer.prototype.install = function() {
        var pipeline = _.compose(_.bind(this.dag.add, this.dag),
                                 _.bind(this.unique.add, this.unique));
        return pipeline;
    }

    return NodeBuffer;

})
