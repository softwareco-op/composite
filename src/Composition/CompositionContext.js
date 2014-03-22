/**
* Copyright (C) 2014 TheSoftwareCo-oP
*/



define(['Model/ObjectSupplier',
        'UI/UIContext',
        'UI/NodeView',
        'Collection/DAG',
        'Composition/Global',
        'UI/View',
        'backbone.io',
        'localstorage',
        'backbone'],
function(ObjectSupplier,
         UIContext,
         NodeView,
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

        var Node = Backbone.Model.extend({});

        var NodeCollection = Backbone.Collection.extend({
            model: Node,
            //localStorage:new BackboneLocalStorage('ViewDAG-test')
            backend: 'mybackend'
        });

        var collection = new NodeCollection();
        var dag = new DAG(collection);
        Global.dag = dag;
        var objectSupplier = new ObjectSupplier();

        var nodeView = new NodeView(0, objectSupplier, dag, element, document);

        var p0 = new Node({id:0});
        p0.set('type', 'Components/Div');
        p0.set('class', 'panel');

        var p1 = new Node({id:1, parent: 0});
        p1.set('type', 'Components/Button');
        p1.set('name', 'Add Button');
        p1.set('text', 'Add Button');
        p1.set('action', 'Actions/AddButton');

        var p2 = new Node({id:2, parent: 1});
        p2.set('type', 'Components/Button');
        p2.set('name', 'Copy Component');
        p2.set('text', 'Copy Component');
        p2.set('action', 'Actions/CopyTree');

        var p3 = new Node({id:3, parent: 1});
        p3.set('type', 'Components/InputField');
        p3.set('name', 'username');
        p3.set('fieldType', 'text');
        p3.set('onchange', 'Actions/StoreValue');
        p3.set('value', 'username');

        var p4 = new Node({id:4, parent: 1});
        p4.set('type', 'Components/InputField');
        p4.set('name', 'password');
        p4.set('fieldType', 'password');
        p4.set('onchange', 'Actions/StoreValue');
        p4.set('value', '');

        dag.add(p0);
        dag.add(p1);
        dag.add(p2);
        dag.add(p3);
        dag.add(p4);

    }

    return CompositionContext;

});
