/**
* Copyright (C) 2014 TheSoftwareCo-oP
*/


/**
 * DAG is directed acyclic graph on a backbone collection.
 **/
define(['Model/Hasher', 'underscore', 'node-uuid'], function(Hasher, _, uuid) {

    /**
     * @param {Backbone.Collection} collection used to store the nodes
     */
    function DAG(collection) {
        this.collection = collection
        this.hasher = new Hasher("SHA-256");
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
        this.validateNode(model);
        this.collection.add(model);
        model.save();
    }

    /*
     * Validates a model's node attributes.  If attributes are missing, valid defaults are set.
     * @param {Backbone.Model} model to validate
     */
    DAG.prototype.validateNode = function(model) {
        if (model.get('id') === undefined || model.get('id') === null) {
            model.set('id', uuid.v4());
        }
        if (model.get('parent') === undefined) {
            model.set('parent', null);
        }
        if (model.get('children') === undefined) {
            model.set('children', []);
        }
        if (model.get('hash') === undefined) {
            model.set('hash', this.hasher.hashModel(model));
        }
    }

    /**
     * Add a child to this model
     * @param {Backbone.Model} parent of child.
     * @param {Backbone.Model} child to add to parent.
     */
    DAG.prototype.addChild = function(parent, child) {
        this.validateNode(parent);
        this.validateNode(child);
        this.setChild(parent, child);
        this.collection.add(child);
        child.save();
        parent.save();
    }

    /**
     * Add a child to a parent.
     * @param {Backbone.Model} parent of child.
     * @param {Backbone.Model} child to add to parent.
     */
    DAG.prototype.setChild = function(parent, child) {
        child.set('parent', parent.get('id'));
        var children = parent.get('children') || [];
        //Make a copy of the list so that Backbone fires a change event.  This ought to be
        //accomplished in a better way.
        var copy = _.map(children, function(child) {return child;});
        copy.push(child.get('id'));
        parent.save({'children': copy});
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
            self.addChild(copy, copiedChild);
        });

        return copy;
    }

    return DAG;

});
