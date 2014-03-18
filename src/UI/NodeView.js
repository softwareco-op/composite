/**
* Copyright (C) 2014 SoftwareCo-oP
*/


/**
 * NodeView is the base class for a Model existing in a tree.
 **/
define(['UI/View', 'underscore'], function(View, _) {

    function NodeView(parent, objectSupplier, dag, parentElement, dom) {
        this.parent = parent;
        this.parentElement = parentElement;
        this.objectSupplier = objectSupplier;
        this.dag = dag;
        this.dom = dom;
        this.map = {};

        var self = this;
        this.dag.collection.on('add', function(model) {
            var moduleName = model.get('type');
            var promise = self.objectSupplier.object(model, moduleName);

            promise.then(function(view) {
                self.map[model.get('id')] = view;
                var parentView = self.map[model.get('parent')];
                var element = view.render(self.dom);
                element.setAttribute('id', model.get('id'));
                if (parentView !== undefined) {
                    parentView.getWrap(dom).appendChild(element);
                } else {
                    //should only occur at the root.
                    parentElement.appendChild(element);
                }

            }).catch(function(error) {
                console.log(error);
            });
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
