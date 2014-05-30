/*
 * (C) 2014 SoftwareCo-oP
 */

(function(COMPOSITE, Hasher, Cloner) {
    COMPOSITE.DAGUtil = {
        hasher : new Hasher("SHA-256"),

        cloner : new Cloner(),

        /*
         * Validates a node's node attributes.  If attributes are missing, valid defaults are set.
         * @param {Object} node to validate
         * @return {Object} a valid node
         */
        validateNode : function(node) {
            if (node === null) {return node;}

            if (node.id === undefined || node.id === null) {
                node.id = uuid.v4();
            }
            if (node.parent === undefined) {
                node.parent = null;
            }
            if (node.children === undefined) {
                node.children = [];
            }

            node.hash = this.hasher.hashNode(node);
            return node;
        },

        /**
         * Add a child to this node
         * @param {Object} parent of child.
         * @param {Object} child to add to parent.
         * @return {Object} parent with child added
         */
        addChild : function(parent, child) {
            this.validateNode(parent);
            this.validateNode(child);
            this.setChild(parent, child);
            return parent;
        },

        /*
         * Unlinks the child from the parent.  This does not remove the child from the dag.
         * @param {Object} parent of child.
         * @param {Object} child to remove from parent.
         */
        unlinkChild : function(parent, child) {
            if (parent === null) {
                return parent;
            }

            var index = _.indexOf(parent.children, child.id);
            if (index < 0) {
                return false;
            }
            parent.children.splice(index, 1);
            child.parent = null;
            return parent;
        },

        /*
         * Unlink children of this node. The children are not removed from the DAG.
         * @param {Object} node with children.
         */
        unlinkChildren : function(node) {
            node.children = [];
            this.add(node);
            return node;
        },

        /*
         * Add a child to a parent.
         * @param {Object} parent of child.
         * @param {Object} child to add to parent.
         * @return {Object} parent with adopted child
         */
        setChild : function(parent, child) {
            if (parent === null) {
                child.parent = null;
                return parent;
            }

            child.parent = parent.id;
            var children = parent.children || [];
            children.push(child.id);
            parent.children = children;
            this.validateNode(parent);
            return parent;
        },

        /*
         * Copy the given node.
         * @return a copy of the given node with a new id.
         */
        copy : function(node) {
            var copy = this.cloner.cloneNode(node);
            copy.id = uuid.v4();
            return copy;
        },

        /*
         * Clone a node.
         * @return a clone of the given node with the same id.
         */
        clone : function(node) {
            return this.cloner.cloneNode(node);
        },

        /*
         * Make a copy of the tree at the given node.
         * @return a list of copied nodes starting at node and traversing down the tree.
         */
        copyTree : function(dag, node) {
            var copy = this.copy(node);

            //We'll reset and rebuild the children list on the copy.
            copy.children = [];

            var copiedNodes = [copy];

            var self = this;
            dag.getChildren(node).map(function(child) {
                var copiedChildren = self.copyTree(dag, child);
                self.addChild(copy, copiedChildren[0]);
                copiedNodes = copiedNodes.concat(copiedChildren);
            });

            return copiedNodes;
        },

        /*
         * Similar to copyTree.  Add the copied tree as a child
         * on the destination node.
         *
         * Similar to cp -r source dest/
         *
         * @param {Node} source to recursively copy
         * @param {Node} destination to add nodes to.
         * @return all copied and modified nodes.
         */
        copyTreeTo : function(dag, source, destination) {
            var destinationWithCopy = this.clone(destination);
            var copies = this.copyTree(dag, source);
            this.addChild(destinationWithCopy, copies[0])
            copies.unshift(destinationWithCopy);
            return copies;
        },

        /*
         * Search the dag for nodes that evaluate true for the
         * predicate.
         *
         * @param {DAG} dag to search
         * @param {Object} start is where searching begins
         * @param {Function} predicate is a function that can be true for some nodes,
         * all nodes, or no nodes in the dag.
         * @param {Number} depth to transverse in the dag. If less than zero, there is no depth limit.
         *
         * @return {Array} an array of objects that match the predicate.
         */
        searchSubTree : function(dag, start, predicate, depth) {
            var matches = []

            if (depth === 0) {
                return matches;
            }

            if (predicate(start)) {
                matches.push(start);
            }

            var children = dag.getChildren(start);

            for (var i = 0 ; i < children.length ; i++) {
                matches = matches.concat(this.searchSubTree(dag, children[i], predicate, depth - 1));
            }

            return matches;
        }

    }

    return COMPOSITE.DAGUtil;

})(COMPOSITE, COMPOSITE.Hasher, COMPOSITE.Cloner)
