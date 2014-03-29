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
                dagObject.id = model.get('id');
                dagObject.parent = model.get('parent');
                self.objDag.add(dagObject);
                dagObject.add(model, self.objDag, self.dag, self.context);
            }).catch(function(error) {
                console.log(error);
            });
        });

        collection.on('update', function(model) {
            var dagObject = self.objDag.getObject(model.get('id'));
            dagObject.update(model, self.objDag, self.dag, self.context);
        });

        collection.on('delete', function(model) {
            var dagObject = self.objDag.getObject(model.get('id'));
            dagObject.destroy(model, self.objDag, self.dag, self.context);
            delete self.objDag.dagObjects[model.get('id')];
        });
    }

    return OBJDAGController;

});
