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
            var moduleName = model.get('type');
            var promise = self.objectSupplier.object(model, moduleName);

            promise.then(function(dagObject) {
                model.pairs().map(function(pair) {
                    dagObject[pair[0]] = pair[1];
                })
                self.objDag.add(dagObject);
                if (dagObject.add !== undefined) {
                    dagObject.add(model, self.objDag, self.dag, self.context);
                }
            }).catch(function(error) {
                console.log(error);
            });
        });

        collection.on('update', function(model) {
            self.objDag.get(model.get('id')).then(function(dagObject) {
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
            self.objDag.get(model.get('id')).then(function(dagObject) {
                if (dagObject.update !== undefined) {
                    dagObject.update(model, self.objDag, self.dag, self.context);
                }
            })
        })

    }

    return OBJDAGController;

});
