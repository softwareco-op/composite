/**
* Copyright (C) 2014 SoftwareCo-oP
*/


/**
 * NodeView is the base class for a Model existing in a tree.
 **/
define(['UI/View', 'underscore'], function(View, _) {

    function NodeView(parent, viewSupplier, dag, dom) {
        this.parent = parent;
        this.viewSupplier = viewSupplier;
        this.dag = dag;
        this.dom = dom;
        this.map = {};

        var self = this;
        this.dag.collection.on('add', function(model) {
            var viewBuilder = self.viewSupplier.view(model);
            var view = viewBuilder(model);
            self.map[model.get('id')] = view;
            view.render(self.dom);
        });
    }
    _.extend(NodeView.prototype, View.prototype);

    NodeView.prototype.viewSupplier = function() {
        if (viewSupplier === undefined) {
            this.parent.getViewSupplier();
        }
    }

    NodeView.prototype.renderModel = function(model, dom) {
        var viewSupplier = this.viewSupplier();
        var view = viewSupplier.view(model);
        return view.render(dom);
    }

    return NodeView;

})
