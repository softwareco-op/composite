/**
* Copyright (C) 2014 SoftwareCo-oP
*/


/**
 * ViewDAG is bridge between a directed acyclic graph of models and their volatile objects (views, dom, etc).
 **/
define(['Collection/DAG'], function(DAG) {

    /**
     * @param {DAG} dag storing the view models
     * @param {Document} dom where views are rendered.
     */
    function ViewDAG(dag, viewSupplier, dom) {
        this.dag = dag;
        this.dom = dom;
        this.viewSupplier = viewSupplier;
        this.map = {};

        var self = this;
        this.dag.collection.on('add', function(model) {
            var view = self.map[model.get('id')];
            view.render(dom);
        });
    }

    /**
     * @param {Backbone.Model} model to add to the DAG
     * @param {View} associated with this model
     */
    ViewDAG.prototype.add = function(model, view) {
        this.map[model.get('id')] = view;
        this.dag.add(model);
    }

    return ViewDAG;

});
