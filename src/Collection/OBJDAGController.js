//
// (C) 2014 SoftwareCo-oP
//

define([], function()  {

    function OBJDAGController(objectSupplier, objDag, context) {
        this.objectSupplier = objectSupplier;
        this.objDag = objDag;
        this.context = context;
    }

    //
    // Converts model into runtime objects
    //
    OBJDAGController.prototype.manage = function(collection) {
        var self = this;
        collection.on('add', function(model) {
            console.debug('add on ' + model.get('id'));
            var moduleName = model.get('type');
            var promise = self.objectSupplier.object(model, moduleName);

            promise.then(function(dagObject) {
                self.decorate(model, dagObject);
                self.objDag.add(dagObject);
                self.add(dagObject, model);
                self.objDag.get(dagObject.parent).then(function(parent) {
                    self.update(parent, model);
                });
            }).catch(function(error) {
                console.log(error);
                throw new Error(error);
            });
        });

        collection.on('update', function(model) {
            console.debug('update on ' + model.get('id'));
            self.objDag.get(model.get('id')).then(function(dagObject) {
                self.decorate(model, dagObject);
                if (dagObject.update !== undefined) {
                    dagObject.update(model, self.objDag, self.dag, self.context);
                }
            })
        });

        collection.on('delete', function(model) {
            var dagObject = self.objDag.getObject(model.get('id'));
            dagObject.destroy(model, self.objDag, self.dag, self.context);
            delete self.objDag.dagObjects[model.get('id')];
        });

        collection.on('change', function(model) {
            console.debug('change on ' + model.get('id'));
            self.objDag.get(model.get('id')).then(function(dagObject) {
                self.decorate(model, dagObject);
                if (dagObject.update !== undefined) {
                    dagObject.update(model, self.objDag, self.dag, self.context);
                }
            })
        })

        collection.on('all', function(name, model) {
            //console.log('event ' + name + ' on ' + model.get('id'));
        });

    }

    OBJDAGController.prototype.decorate = function(model, object) {
        model.pairs().map(function(pair) {
            object[pair[0]] = pair[1];
        })
    }

    OBJDAGController.prototype.add = function(dagObject, model) {
        if (dagObject.add !== undefined) {
            dagObject.add(model, this.objDag, this.dag, this.context);
        }
    }

    OBJDAGController.prototype.update = function(dagObject) {
        if (dagObject.update !== undefined) {
            dagObject.update(model, this.objDag, this.dag, this.context);
        }
    }

    return OBJDAGController;

});
