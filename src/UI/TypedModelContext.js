/**
* Copyright (C) 2013 TheSoftwareCo-oP
*/


/**
 * TypedModel is a model with an associated type/view.
 **/
define(['Model/ModelContext','node-uuid'], function(ModelContext, uuid) {

    function TypedModelContext() {
        this.modelContext = new ModelContext();
    }

    TypedModelContext.prototype.model = function() {
        return this.modelContext.model({
            id: uuid.v1(),
            type: 'undefined',
            view: 'undefined'
        });
    }

    TypedModelContext.prototype.collection = function() {
        return this.modelContext.collection(this.model());
    }

    return TypedModelContext;

});
