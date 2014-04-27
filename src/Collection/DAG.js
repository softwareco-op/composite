/**
* Copyright (C) 2014 TheSoftwareCo-oP
*/


/**
 * DAG is directed acyclic graph.
 **/

(function(Hasher, Cloner, _, uuid) {

    /**
     * @constructor
     */
    function DAG() {
        this.collection = {}
        this.hasher = new Hasher("SHA-256");
        this.cloner = new Cloner();
    }

    /**
     * @return the number of nodes in the DAG.
     */
    DAG.prototype.size = function() {
        return _.size(this.collection);
    }

    /**
     * Add a node to this DAG
     * @param {Node} node to add
     */
    DAG.prototype.add = function(node) {
        this.validateNode(node);
        this.collection[node.id] = node;
        return node;
    }

    DAG.prototype.addAll = function(nodes) {
        var self = this;
        return nodes.map(function(node) { self.add(node) });
    }

    /*
     * Validates a node's node attributes.  If attributes are missing, valid defaults are set.
     * @param {Node} node to validate
     */
    DAG.prototype.validateNode = function(node) {
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
    }

    /*
     * Remove a node from this DAG
     * @param {Node} to remove
     */
    DAG.prototype.remove = function(node) {
        delete this.collection[node.id];
    }

    /**
     * Unlink children of this node. The children are not removed from the DAG.
     * @param {Node} node with children.
     */
    DAG.prototype.unlinkChildren = function(node) {
        node.children = [];
        this.add(node);
        return node;
    }

    /**
     * Tests if a node exists in the DAG.
     * Note: collection should only contain DAG nodes, or node ids should be uuids.
     *
     * @param {Node} node in question.
     * @return true if the node exists in the DAG, else false.
     */
    DAG.prototype.exists = function(node) {
        return this.collection[node.id] !== undefined;
    }

    /*
     * Retrieve a node from the DAG.
     * @param {string} id of the node to retrieve.
     * @return the node requested. If the node was not found returns undefined.
     */
    DAG.prototype.get = function(id) {
        return this.collection[id];
    }

    /**
     * @param {Node} node containing children.
     * @return the {Node}s with parent set to this.id or an empty list.
     */
    DAG.prototype.getParent = function(node) {
        return this.get(node.parent);
    }

    /**
     * @param {Node} node containing children.
     * @return the {Node}s with parent set to this.id or an empty list.
     */
    DAG.prototype.getChildren = function(node) {
        var fn = _.bind(this.get, this);
        return _.map(node.children, fn);
    }

    /**
     * Add a child to this node
     * @param {Node} parent of child.
     * @param {Node} child to add to parent.
     */
    DAG.prototype.addChild = function(parent, child) {
        this.validateNode(parent);
        this.validateNode(child);
        this.setChild(parent, child);
        return child;
    }

    /*
     * Unlinks the child from the parent.  This does not remove the child from the dag.
     * @param {Node} parent of child.
     * @param {Node} child to remove from parent.
     */
    DAG.prototype.unlinkChild = function(parent, child) {
        var index = _.indexOf(parent.children, child);
        if (index < 0) {
            return false;
        }
        parent.childre = parent.children.splice(index, 1);
        return this.add(parent);
    }

    /**
     * Add a child to a parent.
     * @param {Node} parent of child.
     * @param {Node} child to add to parent.
     */
    DAG.prototype.setChild = function(parent, child) {
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
    }

    /**
     * Copy the given node.
     * @return a copy of the given node with a new id.
     */
    DAG.prototype.copy = function(node) {
        var copy = this.cloner.cloneNode(node);
        copy.id = uuid.v4();
        return copy;
    }


    /*
     * Clone a node.
     * @return a clone of the given node with the same id.
     */
    DAG.prototype.clone = function(node) {
        return this.cloner.cloneNode(node);
    }

    /**
     * Make a copy of the tree at the given node.
     * @return a list of copied nodes starting at node and traversing down the tree.
     */
    DAG.prototype.copyTree = function(node) {
        var copy = this.copy(node);

        //We'll reset and rebuild the children list on the copy.
        copy.children = [];

        var copiedNodes = [copy];

        var self = this;
        this.getChildren(node).map(function(child) {
            var copiedChildren = self.copyTree(child);
            self.addChild(copy, copiedChildren[0]);
            copiedNodes = copiedNodes.concat(copiedChildren);
        });

        return copiedNodes;
    }

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
    DAG.prototype.copyTreeTo = function(source, destination) {
        var destinationWithCopy = this.clone(destination);
        var copies = this.copyTree(source);
        this.addChild(destinationWithCopy, copies[0])
        copies.unshift(destinationWithCopy);
        return copies;
    }

    COMPOSITE.DAG = DAG;
    return DAG;

})(COMPOSITE.Hasher, COMPOSITE.Cloner, _, uuid)
