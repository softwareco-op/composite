/**
* Copyright (C) 2014 TheSoftwareCo-oP
*/



define(['Model/ObjectSupplier',
        'Collection/OBJDAGController',
        'Collection/OBJDAG',
        'Collection/DAG',
        'Composition/Global',
        'UI/View',
        'backbone.io',
        'localstorage',
        'backbone'],
function(ObjectSupplier,
         OBJDAGController,
         OBJDAG,
         DAG,
         Global,
         View,
         Backboneio,
         BackboneLocalStorage,
         Backbone) {


    function CompositionContext() {}

    CompositionContext.prototype.compositeView = function() {
        var self = this;
        return function(model) {
            return new CompositeView(self.collection, self.viewSupplier, model);
        }
    }

    CompositionContext.prototype.run = function(element, document) {

        Backbone.io.connect();

        var page = new Page(element, document);

        page.install();

        page.addNodes();

    }

    return CompositionContext;

});
