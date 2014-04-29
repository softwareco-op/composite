/*
 * (C) 2014 SoftwareCo-oP
 */

(function(COMPOSITE, DAG) {

    function DAGUpdater(dag) {
        this.dag = dag || new DAG();
    }

    DAGUpdater.prototype.install = function(pipeline) {
        var self = this;

        var updaterPipeline = function(node) {
            node = pipeline(node);
            return self.add(node);
        }

        COMPOSITE.pipeline = pipeline;
        return pipeline;
    }

    DAGUpdater.prototype.add = function(node) {
        var self = this;
        var parent = this.dag.getParent(node);

        if (node.object.add !== undefined) {
            node.object.add(node, this.dag, this.document);
        }

        if (parent !== undefined) {
            if (parent.object.update !== undefined) {
                parent.object.update(parent, this.dag, this.document);
            }
        }
    }

})(COMPOSITE, COMPOSITE.DAG)
