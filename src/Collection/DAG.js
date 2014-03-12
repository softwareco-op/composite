/**
* Copyright (C) 2014 TheSoftwareCo-oP
*/


/**
 * DAG is directed acyclic graph on a backbone collection.
 **/
define(['underscore'], function(_) {

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
     * Add a child to this model
     * @param {Backbone.Model} model parent of child.
     * @param {Backbone.Model} child to add to parent.
     */
    DAG.prototype.addChild = function(model, child) {
        child.save({parent: model.get('id')});
    }

    return DAG;


});
