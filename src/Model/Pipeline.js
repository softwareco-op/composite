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
         * A pipeline that notifies nodes that they have been added to the dag.
         */
        DAGNotify : function() {
            var dagNotify = {
                id : 'dagNotify',
                type : 'DAGNotify'
            }

            var inMemoryDag = this.append(dagNotify, this.uniqueMemoryDag());
            return inMemoryDag;
        },

        /*
         * A pipeline that renders nodes into a pagelet.
         */
        webPage : function() {
            var host = window.location.host;

            var ClientSocket = {
                type : 'ClientSocket',
                url : 'ws://' + host + '/node',
                browser : true
            }

            var Pagelet = {
                type : 'Pagelet',
                divName : 'composite',
                root : 'ballotBox'
            }

            var pipe = this.append(Pagelet, this.DAGNotify());
            pipe = this.append(ClientSocket, pipe);

            pipe.bin.dag.alias('head', 'unique');
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
         * Remove a function from the pipeline.
         *
         * @param {Object} node representing a function
         * @param {Object} pipeline to remove the node from.
         * @param {Object} pipeline.dag where the pipeline resides.
         * @return {Object} the head of the pipeline
         *
         */
        remove : function(nodeId, pipeline) {
            var dag = pipeline.bin.dag;
            var node = pipeline.bin.dag.get(nodeId);
            var children = dag.getChildren(node);
            var parent = dag.getParent(node);

            DAGUtil.unlinkChild(parent, node);

            for (var i = 0 ; i < children.length ; i++) {
                DAGUtil.setChild(parent, children[i]);
            }

            dag.remove(node);

            if (children.length === 1 ) {
                return this.head(dag, children[0]);
            } else if (children.length > 1) {
                throw new Error('removing ' + nodeId + ' would create a pipeline with ' + children.length + ' heads');
            }

            throw new Error('removing ' + nodeId + ' would create an empty pipeline.');
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
