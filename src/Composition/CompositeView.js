/**
* Copyright (C) 2014 TheSoftwareCo-oP
*/


/**
 * CompositeView is a composition of views.
 **/
define(['UI/View', 'underscore'], function(View, _) {

    /**
     * @param {Backbone.Collection} collection with serialized versions of the views this composite view contains.
     * @param {ViewSupplier} viewSupplier used to transform the serialized view into the proper View object.
     * @param {Backbone.Model} model backing this {CompositeView}
     */
    function CompositeView(collection, viewSupplier, model) {
        View.call(this.render);
        this.collection = collection;
        this.viewSupplier = viewSupplier;
        this.model = model;
    }
    _.extend(CompositeView.prototype, View.prototype);

    /**
     * @return the {Backbone.Model}s with parent set to this.id.
     */
    CompositeView.prototype.getChildren = function() {
        return _.where(this.collection, {parent: this.model.id});
    }

    CompositeView.prototype.setParent = function(parent) {
        this.model.parent = parent;
    }

    /**
     * @param {Document} dom to render this CompositeView into.
     * @return {CompositeView} this CompositeView
     */
    CompositeView.prototype.render = function(dom) {
        this.clear();
        var wrap = this.getWrap(dom);

        var children = this.getChildren();
        var self = this;
        children.forEach(function(child) {
            var view = self.viewSupplier.view(child);
            wrap.appendChild(view.render(dom).wrap);
        });
        return this;
    }

    CompositeView.prototype.getModel = function() {
        return this.model;
        //return {view:'UI/CompositeView', id:this.id, parent:this.parent};
    }

    CompositeView.prototype.getView = function(model) {
        return new CompositeView(this.collection, this.viewSupplier, model);
    }

    return CompositeView;

});
