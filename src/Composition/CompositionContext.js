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

        var p1 = new Node({id:1});
        p1.set('type', 'Components/Button');
        p1.set('name', 'Hello World');
        p1.set('text', 'Hello World');
        p1.set('action', 'Actions/AddButton');

        var p2 = new Node({id:2, parent: 1});
        p2.set('type', 'Components/Button');
        p2.set('name', 'Hello World');
        p2.set('text', 'Hello World');
        p2.set('action', 'Actions/CopyTree');

        dag.add(p1);
        dag.add(p2);

    }

    return CompositionContext;

});
