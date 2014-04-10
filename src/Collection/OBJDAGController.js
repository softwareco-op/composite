//
// (C) 2014 SoftwareCo-oP
//

define(['Model/Hasher', 'rsvp'], function(Hasher, RSVP)  {

    function OBJDAGController(objectSupplier, objDag, dag, hasher, context) {
        this.objectSupplier = objectSupplier;
        this.objDag = objDag;
        this.dag = dag;
        this.hasher = hasher;
        this.context = context;
    }


    /*
     * Check if the model has a hash attribute.  If not, create and set the hash value.
     *
     * @param {Backbone.Model} model to verify.
     * @return {String} hash value for the model.
     * and false if the object does not exist in the local cache.
     */
    OBJDAGController.prototype.checkHash = function(model) {
        var modelHash = model.get('hash');

        if (modelHash === undefined) {
            modelHash = this.hasher.hashModel(model);
            model.set('hash', modelHash);
        }

        return modelHash;
    }

    /*
     * Check if the object already exists.
     * @param {Backbone.Model} model to verify.
     * @return {RSVP.Promise} a promise that will resolve to true if the object does not exist in the local cache,
     * and false if the object does not exist in the local cache.
     */
    OBJDAGController.prototype.isNew = function(model) {
        var modelHash = model.get('hash');
        var promise = new RSVP.Promise(function(resolve, reject) { resolve(false); });

        if (this.objDag.exists(model.get('id'))) {

            return this.objDag.get(model.get('id')).then(function(dagObject) {

                if (dagObject.hash === modelHash) {
                    return dagObject;
                }

                return false;

            });

        }

        return promise;
    }




    /*
     * Add a model into the object dag (directed acyclic graph).
     * @param {Backbone.Model} model to add.
     */
    OBJDAGController.prototype.add = function(model) {
        var self = this;
        var moduleName = model.get('type');
        this.checkHash(model);
        return this.isNew(model).then(function(dagObject) {
            if (dagObject) {
                return dagObject;
            }

            return self.objectSupplier.object(model, moduleName);
        }).then(function(dagObject) {
            self.decorate(model, dagObject);
            self.objDag.add(dagObject);
            self.call('add', dagObject, model);
            var parentModel = self.dag.getParent(model);
            self.objDag.get(dagObject.parent).then(function(parent) {
                self.call('update', parent, parentModel);
            });
            return dagObject;
        }).catch(function(error) {
            console.log(error);
            throw new Error(error);
        });

    }

    OBJDAGController.prototype.update = function(model) {
        var self = this;
        this.checkHash(model);
        return this.isNew(model).then(function(dagObject) {
            if (dagObject) {
                return dagObject;
            }

            return self.objDag.get(model.get('id')).then(function(dagObject) {
                self.decorate(model, dagObject);
                self.call('update', dagObject, model);
                var parentModel = self.dag.getParent(model);
                self.objDag.get(dagObject.parent).then(function(parent) {
                    self.call('update', parent, parentModel);
                });
                return dagObject;
            })
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
