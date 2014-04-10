//
// (C) 2014 SoftwareCo-oP
//

define(['rsvp', 'underscore','backbone'], function(RSVP, _, Backbone) {

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
    // Retrieves an object asynchronously.
    //
    // @param {String} id of object to retrieve
    // @param {Number} timeout in milliseconds to wait before failing
    //
    OBJDAG.prototype.get = function(id, timeout) {
        var self = this;
        return new RSVP.Promise(function(resolve, reject) {
            if (self.exists(id)) {
                resolve(self.dagObjects[id]);
            }

            var callback = function(object) {
                if (object.id === id) {
                    self.off('add', callback);
                    resolve(self.dagObjects[id]);
                }
            }

            self.on('add', callback);

            //We call reject if more time elapsed than some threshold.
            var onTimeout = function() {
                reject('timed out waiting for object with id ' + id);
            }
            var timeToWait = timeout || self.defaultTimeout;
            setTimeout(onTimeout, timeToWait);
        });
    }

    //
    // Retrieve the parent asynchronously.
    //
    // @return the parent of the object with the given id
    //
    OBJDAG.prototype.getParent = function(object, timeout) {
        return this.get(object.parent, timeout);
    }

    //
    // Deletes the object with the given id
    //
    OBJDAG.prototype.remove = function(object) {
        delete this.dagObjects[object.id];
        this.trigger('remove', object);
    }

    OBJDAG.prototype.getChildren = function(object) {
        var get = _.bind(this.get, this);
        var promises = object.children.map(get);
        return RSVP.all(promises);
    }

    return OBJDAG;

})
