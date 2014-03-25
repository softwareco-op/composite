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

        var Node = Backbone.Model.extend({
            initialize: function() {
                this.on('error', function(model, res) {
                    alert(res.error.message);
                });
            }
        });

        var NodeCollection = Backbone.Collection.extend({
            backend: 'mybackend',

            model: Node,
            //localStorage:new BackboneLocalStorage('ViewDAG-test')

            initialize: function() {
                var self = this;
                this.bind('create', function(model) {
                    console.log('create');
                });
                this.bind('add', function(model) {
                    console.log('add');
                });
                this.bind('update', function(model) {
                    console.log('update');
                });
                this.bind('backend:create', function(model) {
                    console.log('got create');
                    self.add(model);
                });
                this.bind('backend:add', function(model) {
                    console.log('got add');
                    self.add(model);
                });
                this.bind('backend:update', function(model) {
                    console.log('got update');
                    var colModel = self.get(model.id);
                    console.log(JSON.stringify(colModel));
                    colModel.set(model);
                    console.log(JSON.stringify(colModel));
                    self.trigger('update', colModel);
                });
                this.bind('backend:delete', function(model) {
                    console.log('got delete');
                    self.remove(model.id);
                });
            }
        });

        var collection = new NodeCollection();
        var dag = new DAG(collection);
        Global.dag = dag;
        var objectSupplier = new ObjectSupplier();

        var nodeView = new NodeView(0, objectSupplier, dag, element, document);
        collection.fetch();

        var p0 = new Node({id:0});
        p0.set('type', 'Components/Div');
        p0.set('class', 'panel');
        dag.add(p0);
        p0.save();

        var p1 = new Node({id:1, parent: 0});
        p1.set('type', 'Components/Button');
        p1.set('name', 'Add Button');
        p1.set('text', 'Add Button');
        p1.set('action', 'Actions/AddButton');
        dag.add(p1);

        var p2 = new Node({id:2, parent: 1});
        p2.set('type', 'Components/Button');
        p2.set('name', 'Copy Component');
        p2.set('text', 'Copy Component');
        p2.set('action', 'Actions/CopyTree');
        dag.add(p2);

        var p3 = new Node({id:3, parent: 1});
        p3.set('type', 'Components/InputField');
        p3.set('name', 'username');
        p3.set('fieldType', 'text');
        p3.set('onchange', 'Actions/StoreValue');
        p3.set('value', 'username');
        dag.add(p3);

        var p4 = new Node({id:4, parent: 1});
        p4.set('type', 'Components/InputField');
        p4.set('name', 'password');
        p4.set('fieldType', 'password');
        p4.set('onchange', 'Actions/StoreValue');
        p4.set('value', '');
        dag.add(p4);






    }

    return CompositionContext;

});
