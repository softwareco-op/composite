//
// (C) 2014 SoftwareCo-oP
//

define([], function()  {

    function OBJDAGController(objectSupplier, objDag, context) {
        this.objectSupplier = objectSupplier;
        this.objDag = objDag;
        this.context = context;
    }

    /*
     * Add a model into the object dag (directed acyclic graph).
     * @param {Backbone.Model} model to add.
     */
    OBJDAGController.prototype.add = function(model) {
        var self = this;
        var moduleName = model.get('type');
        var promise = this.objectSupplier.object(model, moduleName);

        return promise.then(function(dagObject) {
            self.decorate(model, dagObject);
            self.objDag.add(dagObject);
            self.call('add', dagObject, model);
            self.objDag.get(dagObject.parent).then(function(parent) {
                self.call('update', parent, model);
            });
            return dagObject;
        }).catch(function(error) {
            console.log(error);
            throw new Error(error);
        });
    }

    OBJDAGController.prototype.update = function(model) {
        var self = this;

        return self.objDag.get(model.get('id')).then(function(dagObject) {
            self.decorate(model, dagObject);
            self.call('update', dagObject, model);
            self.objDag.get(dagObject.parent).then(function(parent) {
                self.call('update', parent, model);
            });
            return dagObject;
        })
    }

    OBJDAGController.prototype.decorate = function(model, object) {
        model.pairs().map(function(pair) {
            object[pair[0]] = pair[1];
        })
    }

    OBJDAGController.prototype.call = function(name, dagObject, model) {
        if (dagObject[name] !== undefined) {
            var fn = dagObject[name];
            fn = _.bind(fn, dagObject);
            return fn(model, this.objDag, this.dag, this.context);
        }
    }

    //
    // Converts model into runtime objects
    //
    OBJDAGController.prototype.manage = function(collection) {
        var self = this;
        collection.on('add', function(model) {
            self.add(model);
        });

        collection.on('update', function(model) {
            self.update(model);
        });

        collection.on('delete', function(model) {
            var dagObject = self.objDag.getObject(model.get('id'));
            dagObject.destroy(model, self.objDag, self.dag, self.context);
            delete self.objDag.dagObjects[model.get('id')];
        });

        collection.on('change', function(model) {
            self.update(model);
        })
    }


    return OBJDAGController;

});
