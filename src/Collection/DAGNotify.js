/*
 * (C) 2014 SoftwareCo-oP
 */

(function(COMPOSITE, DAG) {

    /*
     * DAGNotify notifies neighboring nodes when a node is added to the DAG.
     */
    function DAGNotify(dag) {
        this.dag = dag || new DAG();
    }

    DAGNotify.prototype.install = function(pipeline) {
        var self = this;

        var updaterPipeline = function(node) {
            node = pipeline(node);
            return self.add(node);
        }

        COMPOSITE.pipeline = pipeline;
        return pipeline;
    }

    DAGNotify.prototype.add = function(node) {
        var self = this;
        var parent = this.dag.getParent(node);

        if (node.object && node.object.add !== undefined) {
            node.object.add(node, this.dag, this.document);
        }

        if (parent && parent.object && parent.object.update !== undefined) {
            parent.object.update(parent, this.dag, this.document);
        }

        return node;
    }

    COMPOSITE.DAGNotify = DAGNotify;
    return DAGNotify;

})(COMPOSITE, COMPOSITE.DAG)
