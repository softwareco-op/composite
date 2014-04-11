//
// (C) 2014 SoftwareCo-oP
//

define(['Model/Hasher'], function(Hasher)  {

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

        if (this.objDag.exists(model.get('id'))) {

            var dagObject = this.objDag.getNow(model.get('id'));

            if (dagObject.hash === modelHash) {
                return dagObject;
            }

            return false;

        }

        return false;
    }




    /*
     * Add a model into the object dag (directed acyclic graph).
     * @param {Backbone.Model} model to add.
     */
    OBJDAGController.prototype.add = function(model) {
        var self = this;
        return this.handleIncoming('add', model, function(model) {
            //create the object
            var moduleName = model.get('type');
            return self.objectSupplier.object(model, moduleName);
        })
    }

    OBJDAGController.prototype.update = function(model) {
        var self = this;
        return this.handleIncoming('update', model, function(model) {
            return self.objDag.get(model.get('id'));
        })
    }

    OBJDAGController.prototype.handleIncoming = function(type, model, fn) {
        var self = this;
        this.checkHash(model);
        var dagObject = this.isNew(model);

        if (dagObject) {
            return dagObject;
        }

        return fn(model).then(function(dagObject) {
            self.decorate(model, dagObject);
            self.objDag.add(dagObject);
            self.call(type, dagObject, model);
            var parentModel = self.dag.getParent(model);
            if (parentModel === undefined) {
                return dagObject;
            }
            self.objDag.get(dagObject.parent).then(function(parent) {
                self.call('update', parent, parentModel);
            }).catch(function(error) {
                console.log(error);
                throw new Error(error);
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
