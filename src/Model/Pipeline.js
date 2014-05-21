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
         * A pipeline with a bound socket, file buffer, in memory dag and DAGReplier
         */
        bufferedServer : function(port, servePath, bufferFilename) {
            var ServerSocket = {
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

            var DAGReplier = {
                type : 'DAGReplier'
            }

            this.append(DAGReplier, this.uniqueMemoryDag())
            this.prepend(FileBuffer, DAGReplier)
            return this.prepend(ServerSocket, FileBuffer)
        },

        webPage : function() {
            var host = window.location.host;

            var ClientSocket = {
                type : 'ClientSocket',
                url : 'ws://' + host + '/node',
                browser : true
            }

            var pipe = this.append(ClientSocket, this.uniqueMemoryDag());

            return pipe;
        },

        /*
         * Prepend a function to a pipeline.
         * @param {Object} node representing a function
         * @param {Object} pipeline to prepend node.
         * @return {Object} the head of the pipeline
         */
        prepend : function(node, pipeline) {
            var head = this.head(pipeline.bin.dag, pipeline);
            DAGUtil.addChild(node, head);
            head.bin.mux.add(node);
            return node;
        },

        /*
         * Append a function to a pipeline.
         * @param {Object} node representing a function
         * @param {Object} pipeline to append node.
         * @param {Object} pipeline.dag where the pipeline resides.
         * @return {Object} the head of the pipeline
         */
        append : function(node, pipeline) {
            var head = this.head(pipeline.bin.dag, pipeline);
            var tail = this.tail(pipeline.bin.dag, pipeline);
            DAGUtil.addChild(tail, node);
            head.bin.mux.add(node);
            return head;
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
        },

        /*
         * Return the first function in a pipeline.
         * @return {Object} function node at the head of the pipeline.
         */
        head : function(dag, pipeline) {
            var parent = dag.getParent(pipeline)
            if (parent === undefined) {
                return pipeline;
            } else {
                return this.head(dag, parent);
            }
        }

    }

})(COMPOSITE.ObjectSupplier, COMPOSITE.DAGUtil)
