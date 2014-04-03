/**
* Copyright (C) 2014 TheSoftwareCo-oP
*/



define(['Model/ObjectSupplier',
        'Collection/OBJDAGController',
        'Collection/OBJDAG',
        'Collection/DAG',
        'Composition/Global',
        'UI/View',
        'backbone.io',
        'localstorage',
        'backbone'],
function(ObjectSupplier,
         OBJDAGController,
         OBJDAG,
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
                    console.log('backend:add');
                    self.add(model);
                });
                this.bind('backend:update', function(model) {

                    console.log('backend:update');
                    var colModel = self.get(model.id);
                    if (colModel !== undefined) {
                        console.log(JSON.stringify(colModel));
                        colModel.set(model);
                        console.log(JSON.stringify(colModel));
                    } else {
                        self.set(model);
                    }
                });
                this.bind('backend:delete', function(model) {
                    console.log('backend:delete');
                    self.remove(model.id);
                });
                this.bind('backend', function(model, other) {
                    console.log('backend event');
                });
            }
        });

        var collection = new NodeCollection();
        var dag = new DAG(collection);
        Global.dag = dag;
        var objectSupplier = new ObjectSupplier();

        var objdag = new OBJDAG(objectSupplier, dag, document);
        var objDagController = new OBJDAGController(objectSupplier, objdag, document);
        objDagController.manage(collection);

        var parent = new View();
        parent.id = 1000
        parent.parent = null;
        parent.add = function() {};

        objdag.add(parent);

        element.appendChild(parent.getWrap(document));

        var p0 = new Node({id:0, parent:1000});
        p0.set('type', 'Components/Div');
        p0.set('class', 'panel');
        dag.add(p0);

        var p2 = new Node({id:2});
        p2.set('type', 'Components/Button');
        p2.set('name', 'Copy Component');
        p2.set('text', 'Copy Component');
        dag.addChild(p0, p2);

        var p6 = new Node({id:6});
        p6.set('type', 'Actions/CopyTree');
        p6.set('event', 'click');
        dag.addChild(p2, p6);

        var p3 = new Node({id:3});
        p3.set('type', 'Components/InputField');
        p3.set('name', 'username');
        p3.set('fieldType', 'text');
        p3.set('value', 'username');
        dag.addChild(p0, p3);

        var p7 = new Node({id:7});
        p7.set('type', 'Actions/StoreValue');
        p7.set('event', 'onchange');
        dag.addChild(p3, p7);

        var p4 = new Node({id:4});
        p4.set('type', 'Components/InputField');
        p4.set('name', 'password');
        p4.set('fieldType', 'password');
        p4.set('value', '');
        dag.addChild(p0, p4);

        var p8 = new Node({id:8});
        p8.set('type', 'Actions/StoreValue');
        p8.set('event', 'onchange');
        dag.addChild(p4, p8);


    }

    return CompositionContext;

});
