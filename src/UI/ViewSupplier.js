/**
* Copyright (C) 2013 TheSoftwareCo-oP
*/


/**
 * ViewSupplier is a collection of models with an associated type.
 **/
define(['UI/ListView',
        'UI/UIContext',
        'UI/View',
        'underscore'],
       function(ListView,
                UIContext,
                View,
                _) {

    /**
     * @param {Object} viewSuppliers is an object with keys containing the names
     * of the views found in the model's view attribute and values containing
     * functions that can create a view from a model
     **/
    function ViewSupplier(viewSuppliers) {
        this.views = viewSuppliers;
    }

    /**
     * @param {Backbone.Model} model containing a view attribute whose value can
     * be found in this object's views keys.
     * @return {View} a view that can be rendered
     **/
    ViewSupplier.prototype.view = function(model) {
        var viewFactory = this.views[model.get('view')];
        if (viewFactory === undefined) {
            return new View(function(dom) {
                this.getWrap(dom).innerHTML = 'undefined view';
                return this;
            });
        }
        return viewFactory(model);
    }

    return ViewSupplier;

});
