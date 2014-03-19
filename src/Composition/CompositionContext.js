/**
* Copyright (C) 2014 TheSoftwareCo-oP
*/



define(['Composition/CompositeView',
        'Model/ObjectSupplier',
        'UI/UIContext',
        'UI/NodeView',
        'Collection/DAG',
        'Composition/Global',
        'UI/View',
        'localstorage',
        'backbone'],
function(CompositeView,
         ObjectSupplier,
         UIContext,
         NodeView,
         DAG,
         Global,
         View,
         BackboneLocalStorage,
         Backbone) {

    var Node = Backbone.Model.extend({});

    var NodeCollection = Backbone.Collection.extend({
        model: Node,
        localStorage:new BackboneLocalStorage('ViewDAG-test')
    });

    function CompositionContext() {}

    CompositionContext.prototype.compositeView = function() {
        var self = this;
        return function(model) {
            return new CompositeView(self.collection, self.viewSupplier, model);
        }
    }

    CompositionContext.prototype.run = function(element, document) {

        var collection = new NodeCollection();
        var dag = new DAG(collection);
        Global.dag = dag;
        var objectSupplier = new ObjectSupplier();

        var nodeView = new NodeView(0, objectSupplier, dag, element, document);

        var p = new Node({id:1});
        p.set('type', 'Components/Button');
        p.set('name', 'Hello World');
        p.set('text', 'Hello World');
        p.set('action', 'Actions/AddButton');

        dag.add(p);

    }

    return CompositionContext;

});
