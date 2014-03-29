//
// (C) 2014 SoftwareCo-oP
//

define(['underscore','backbone'], function(_, Backbone) {

    function OBJDAG() {
        this.dagObjects = {};
    }
    _.extend(OBJDAG.prototype, Backbone.Events);

    //
    // Add object to OBJDAG
    //
    OBJDAG.prototype.setObject = function(object) {
        if (object.id === undefined) {
            throw 'object missing id'
        } else if (object.parent === undefined) {
            throw 'parent id undefined'
        }
        this.dagObjects[object.id] = object;
    }

    //
    // @return undefined if the object does not exist, else the object
    //
    OBJDAG.prototype.getObject = function(id) {
        return this.dagObjects[id];
    }

    //
    // @return the parent of the object with the given id
    //
    OBJDAG.prototype.getParent = function(object) {
        return this.getObject(object.parent);
    }

    //
    // Deletes the object with the given id
    //
    OBJDAG.prototype.deleteObject = function(object) {
        delete this.dagObjects[object.id];
    }

    OBJDAG.prototype.getChildren = function(object) {
        return _.filter(this.dagObjects, function(dagObject) {
            return dagObject.parent == object.id;
        });
    }

    return OBJDAG;

})
