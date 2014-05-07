/*
 * (C) 2014 SoftwareCo-oP
 */

(function(ObjectSupplier, DAGUtil) {
    COMPOSITE.Pipeline = {
        /*
         * Constructs a pipeline using an object supplier and a DAG.  Additional nodes
         * are appended to the end of the pipeline.
         *
         * @param {Array} nodes containing nodes to append to the end of the pipeline.
         * @return a pipeline containing an object supplier with a DAG attached
         */
        inMemoryDag : function(nodes) {
            var memoryDag = this.memoryDag();
            var last = this.tail(COMPOSITE.dag, memoryDag);
            for (var i = 0 ; i < nodes.length ; i++) {
                DAGUtil.addChild(last, nodes[i]);
                memoryDag.bin.mux.add(nodes[i]);
            }

            return memoryDag;
        },

        memoryDag : function() {
            var objectSupplier = new ObjectSupplier();

            var dagNode = {
                id : 'dag',
                type : 'DAG'
            }

            var objectSupplierNode = {
                id : 'objectSupplier',
                type : 'ObjectSupplier'
            }

            DAGUtil.addChild(objectSupplierNode, dagNode);

            dagNode = objectSupplier.add(dagNode);
            objectSupplierNode = objectSupplier.add(objectSupplierNode);

            dagNode.bin.mux.add(dagNode);
            objectSupplierNode.bin.mux.add(objectSupplierNode);

            return objectSupplierNode;
        },

        /*
         * A pipeline that ensures a node is not a duplicate (i.e. exists in the dag)
         */
        uniqueMemoryDag : function() {
            var unique = {
                id : 'unique',
                type : 'Unique'
            };

            var pipeline = this.memoryDag();

            DAGUtil.addChild(unique, pipeline);
            return pipeline.bin.mux.add(unique);
        },

        tail : function(dag, pipeline) {
            var children = dag.getChildren(pipeline);
            if (children.length === 0) {
                return pipeline;
            }
            return this.tail(dag, children[0]);
        }

    }

})(COMPOSITE.ObjectSupplier, COMPOSITE.DAGUtil)
