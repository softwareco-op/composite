//
// (C) 2014 SoftwareCo-oP
//

define(['rsvp', 'underscore','backbone'], function(RSVP, _, Backbone) {

    /*
     * A Directed Acyclic Graph of objects.
     */
    function OBJDAG() {
        this.dagObjects = {};
        this.defaultTimeout = 600;
    }
    _.extend(OBJDAG.prototype, Backbone.Events);

    //
    // Add object to OBJDAG
    //
    OBJDAG.prototype.add = function(object) {
        if (object.id === undefined) {
            throw new Error('object missing id');
        } else if (object.parent === undefined) {
            throw new Error('parent id undefined');
        } else if (object.children === undefined) {
            throw new Error('children list undefined');
        }
        this.dagObjects[object.id] = object;
        this.trigger('add', object);
    }

    //
    // Test if an object with the given id exists in this data structure
    //
    // @param {String} id to test existance
    // @return true if the object exists in the object dag, else false
    //
    OBJDAG.prototype.exists = function(id) {
        var object = this.dagObjects[id];
        return object !== undefined
    }

    //
    // Retrieves an object.
    //
    // @param {String} id of object to retrieve
    //
    OBJDAG.prototype.get = function(id) {
        return this.dagObjects[id];
    }

    //
    // Retrieve the parent.
    //
    // @return the parent of the object with the given id
    //
    OBJDAG.prototype.getParent = function(object) {
        return this.get(object.parent);
    }

    //
    // Deletes the object.
    //
    OBJDAG.prototype.remove = function(object) {
        delete this.dagObjects[object.id];
        this.trigger('remove', object);
    }

    /*
     * Retrieves the children of an object.
     */
    OBJDAG.prototype.getChildren = function(object) {
        var get = _.bind(this.get, this);
        return object.children.map(get);
    }

    return OBJDAG;

})
