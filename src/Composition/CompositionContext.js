/**
* Copyright (C) 2014 TheSoftwareCo-oP
*/



define(['Composition/CompositeView',
        'UI/ViewSupplier',
        'backboneLocalstorage',
        'backbone'],
function(CompositeView,
         ViewSupplier,
         BackboneLocalstorage,
         Backbone) {

    function CompositionContext() {}

    CompositionContext.prototype.run = function(element, document) {
        var compositeView = new CompositeView();
    }

    return CompositionContext;
});
