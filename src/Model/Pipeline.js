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

            var last = dagNode;
            for (var i = 0 ; i < nodes.length ; i++) {
                DAGUtil.addChild(last, nodes[i]);
                objectSupplierNode.bin.mux.add(nodes[i]);
            }

            return objectSupplierNode;
        }
    }

})(COMPOSITE.ObjectSupplier, COMPOSITE.DAGUtil)
