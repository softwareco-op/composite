/**
* Copyright (C) 2014 TheSoftwareCo-oP
*/


/**
 * DAG is directed acyclic graph on a backbone collection.
 **/
define(['underscore', 'node-uuid'], function(_, uuid) {

    /**
     * @param {Backbone.Collection} collection used to store the nodes
     */
    function DAG(collection) {
        this.collection = collection
    }

    /**
     * @param {Backbone.Model} model containing children.
     * @return the {Backbone.Model}s with parent set to this.id or an empty list.
     */
    DAG.prototype.getParent = function(model) {
        return this.collection.findWhere({id: model.get('parent')});
    }

    /**
     * @param {Backbone.Model} model containing children.
     * @return the {Backbone.Model}s with parent set to this.id or an empty list.
     */
    DAG.prototype.getChildren = function(model) {
        return this.collection.where({parent: model.get('id')});
    }

    /**
     * Remove all children of this model
     * @param {Backbone.Model} model with children.
     */
    DAG.prototype.removeChildren = function(model) {
        this.getChildren(model).map(function(child) {
            child.destroy();
        });
    }

    /**
     * Add a node to this DAG
     * @param {Backbone.Model} model to add
     */
    DAG.prototype.add = function(model) {
        this.collection.add(model);
        model.save();
    }

    /**
     * Add a child to this model
     * @param {Backbone.Model} parent of child.
     * @param {Backbone.Model} child to add to parent.
     */
    DAG.prototype.addChild = function(parent, child) {
        this.collection.add(child);
        child.save({parent: parent.get('id')});
        var children = parent.get('children') || [];
        children.push(child.get('id'));
        parent.set('children', children);
        parent.save();
    }

    /**
     * Tests if a node exists in the DAG.
     * Note: collection should only contain DAG nodes, or model ids should be uuids.
     *
     * @param {Backbone.Model} model in question.
     * @return true if the model exists in the DAG, else false.
     */
    DAG.prototype.exists = function(model) {
        return this.collection.get(model) !== undefined;
    }

    /**
     * Copy the given model.
     * @return a copy of the given model with a new id.
     */
    DAG.prototype.copy = function(model) {
        var copy = model.clone();
        copy.set('id', uuid.v4());
        this.add(copy);
        return copy;
    }

    /**
     * Make a copy of the tree at the given node.
     */
    DAG.prototype.copyTree = function(model) {
        var copy = this.copy(model);
        copy.set('children', []);

        var self = this;
        this.getChildren(model).map(function(child) {
            var copiedChild = self.copyTree(child);
            copiedChild.set('parent', copy.get('id'));
            
        });

        return copy;
    }

    return DAG;

});
