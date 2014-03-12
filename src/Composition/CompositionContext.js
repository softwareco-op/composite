/**
* Copyright (C) 2014 TheSoftwareCo-oP
*/



define(['Composition/CompositeView',
        'UI/ViewSupplier',
        'UI/TypedModelContext',
        'backboneLocalstorage',
        'backbone'],
function(CompositeView,
         ViewSupplier,
         TypedModelContext,
         BackboneLocalstorage,
         Backbone) {

    function CompositionContext() {
        this.typedModelContext = new TypedModelContext();
        var Collection = this.typedModelContext.collection();

        //initialize an empty view supplier
        this.views = {};
        this.viewSupplier = new ViewSupplier(views);

        //Add to the view map
        views['File/URLView'] = this.urlView(document);
        views['Composition/CompositeView'] = this.compositeView(document);

        this.collection = new Collection();
    }

    CompositionContext.prototype.compositeView = function() {
        var self = this;
        return function(model) {
            return new CompositeView(self.collection, self.viewSupplier, model);
        }
    }

    CompositionContext.prototype.run = function(element, document) {

        var compositeView = new CompositeView();

        element.appendChild(compositeView.render(document));
    }

    return CompositionContext;
});
