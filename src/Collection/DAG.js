/**
* Copyright (C) 2014 TheSoftwareCo-oP
*/


(function(COMPOSITE, DAGUtil, _) {

    /*
     * DAG is a directed acyclic graph of nodes.  DAG is also represented in the graph of nodes as a node.
     * @constructor
     */
    function DAG(node) {
        this.collection = {}
        this.node = node || {id: 'dag'}
        COMPOSITE[this.node.id] = this;
    }
    COMPOSITE.DAG = DAG;

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
        DAGUtil.validateNode(node);
        this.collection[node.id] = node;
        return node;
    }

    DAG.prototype.addAll = function(nodes) {
        var self = this;
        return nodes.map(function(node) { self.add(node) });
    }

    /*
     * Remove a node from this DAG
     * @param {Node} to remove
     */
    DAG.prototype.remove = function(node) {
        delete this.collection[node.id];
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

    return COMPOSITE.DAG;

})(COMPOSITE, COMPOSITE.DAGUtil, _)
