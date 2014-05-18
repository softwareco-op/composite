/*
 * (C) 2014 SoftwareCo-oP
 */

(function(ObjectSupplier, DAGUtil) {
    COMPOSITE.Pipeline = {

        /*
         * Constructs a pipeline using an object supplier and a DAG.  Additional nodes
         */
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
            dagNode.bin.mux.add(objectSupplierNode);

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

            return this.prepend(unique, this.memoryDag());
        },

        /*
         * A pipeline with a bound socket, file buffer and in memory dag
         */
        bufferedServer : function(port, servePath, bufferFilename) {
            var WsPipeline = {
                type : 'ServerSocket',
                id : 'serverSocket',
                port : port,
                path : servePath,
                wsPath : '/node'
            }
            var FileBuffer = {
                id : 'fileBuffer',
                type : 'FileBuffer',
                file : bufferFilename
            }
            this.prepend(FileBuffer, this.uniqueMemoryDag())
            return this.prepend(WsPipeline, FileBuffer)
        },

        webPage : function() {
            return this.uniqueMemoryDag();
        },

        /*
         * Prepend a function to a pipeline.
         * @param {Object} node representing a function
         * @param {Object} pipeline to prepend node.
         * @return {Object} the head of the pipeline
         */
        prepend : function(node, pipeline) {
            DAGUtil.addChild(node, pipeline);
            return pipeline.bin.mux.add(node);
        },

        /*
         * Append a function to a pipeline.
         * @param {Object} node representing a function
         * @param {Object} pipeline to append node.
         * @param {Object} pipeline.dag where the pipeline resides.
         * @return {Object} the head of the pipeline
         */
        append : function(node, pipeline) {
            var tail = this.tail(pipeline.bin.dag, pipeline);
            DAGUtil.addChild(tail, node);
            pipeline.bin.mux.add(node);
            return pipeline;
        },

        /*
         * Return the last function in a pipeline.
         * If there are branches, always uses the first child path.
         * @return {Object} function node at the end of the pipeline.
         */
        tail : function(dag, pipeline) {
            var children = dag.getChildren(pipeline);
            if (children.length === 0) {
                return pipeline;
            }
            return this.tail(dag, children[0]);
        }

    }

})(COMPOSITE.ObjectSupplier, COMPOSITE.DAGUtil)
