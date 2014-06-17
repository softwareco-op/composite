/**
* Copyright (C) 2014 TheSoftwareCo-oP
*/


(function(COMPOSITE, DAGUtil, _) {

    /*
     * DAG is a directed acyclic graph of nodes.  DAG is also represented in the graph of nodes as a node.
     * @constructor
     */
    function DAG(node) {
        this.node = node;
        this.collection = {};
        this.aliases = {};
    }
    COMPOSITE.DAG = DAG;

    /**
     * @return the number of nodes in the DAG.
     */
    DAG.prototype.size = function() {
        return _.size(this.collection);
    }

    /**
     * Add a node to this DAG.  Add a link to this dag in the var directory of the node.
     * @param {Node} node to add
     */
    DAG.prototype.add = function(node) {
        DAGUtil.validateNode(node);

        node.bin = node.bin || {};
        node.bin.dag = this;

        this.collection[node.id] = node;
        return node;
    }

    /*
     * Add a list of nodes to the dag.
     */
    DAG.prototype.addAll = function(nodes) {
        var self = this;
        return nodes.map(function(node) { self.add(node) });
    }

    /*
     * Create a node alias
     */
    DAG.prototype.alias = function(alias, id) {
        this.collection[alias] = this.collection[id];
        var aliasList = this.aliases[id] || [];
        aliasList.push(alias);
        this.aliases[id] = aliasList;
    }

    /*
     * Remove a node from this DAG
     * @param {Node} to remove
     */
    DAG.prototype.remove = function(node) {
        delete this.collection[node.id];
        var aliasList = this.aliases[node.id];

        if (!aliasList) {
            return;
        }

        var self = this;
        aliasList.map(function(alias) {
            delete self.collection[alias];
        });
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
