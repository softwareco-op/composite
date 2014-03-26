//
// (C) 2014 SoftwareCo-oP
//

define(['underscore'], function(_) {

    function OBJDAG(objectSupplier, dag, context) {
        this.objectSupplier = objectSupplier;
        this.dag = dag;
        this.context = context;
        this.dagObjects = {};

        var self = this;
        this.dag.collection.on('add', function(model) {
            var moduleName = model.get('type');
            var promise = self.objectSupplier.object(model, moduleName);

            promise.then(function(dagObject) {
                dagObject.id = model.get('id');
                dagObject.parent = model.get('parent');
                self.setObject(dagObject);
                dagObject.add(model, self, self.dag, context);
            }).catch(function(error) {
                console.log(error);
            });
        });

        this.dag.collection.on('update', function(model) {
            var dagObject = self.getObject(model.get('id'));
            dagObject.update(model, self, self.dag, context);
        });

        this.dag.collection.on('delete', function(model) {
            var dagObject = self.getObject(model.get('id'));
            dagObject.destroy(model, self, self.dag, context);
            delete self.dagObjects[model.get('id')];
        });

    }

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
    OBJDAG.prototype.getParent = function(id) {
        var obj = this.getObject(id);
        return this.getObject(obj.parent);
    }

    //
    // Deletes the object with the given id
    //
    OBJDAG.prototype.deleteObject = function(id) {
        delete this.dagObjects[id];
    }

    OBJDAG.prototype.getChildren = function(id) {
        return _.filter(this.dagObjects, function(object) {
            return object.parent == id;
        });
    }

    return OBJDAG;

})
