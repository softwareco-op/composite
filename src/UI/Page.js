/**
 * (C) 2014 SoftwareCo-oP
 */

/*
 * An object that integrates components into Page(let)
 */
define(['Model/ObjectSupplier',
        'Collection/OBJDAGController',
        'Collection/OBJDAG',
        'Collection/DAG',
        'backbone.io',
        'localstorage',
        'backbone'],
function(ObjectSupplier,
         OBJDAGController,
         OBJDAG,
         DAG,
         Backboneio,
         BackboneLocalStorage,
         Backbone) {

    // Store information into Backbone nodes
    var Node = Backbone.Model.extend({
        initialize: function() {
            this.on('error', function(model, res) {
                alert(res.error.message);
            });
        }
    });

    // Nodes exist in a Backbone collection
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

    /**
     * Constructs a page(let) consisting of composite nodes.
     *
     * @constructor
     * @param {Element} div where we put our composition
     * @param {Document} document containing our composition
     * @param {Backbone.Collection} collection containing node models
     * @param {String} rootNodeID references the node to add to the given div
     */
    function Page(div, document, rootNodeID, collection) {
        this.div = div;
        this.document = document;
        this.collection = collection;
        this.rootNodeID = rootNodeID;
    }

    Page.prototype.install = function() {
        this.collection = this.collection || new NodeCollection();
        this.dag = new DAG(this.collection);
        this.objectSupplier = new ObjectSupplier();
        this.objdag = new OBJDAG(this.objectSupplier, this.dag, this.document);
        this.objDagController = new OBJDAGController(this.objectSupplier, this.objdag, this.document);
        this.objDagController.manage(this.collection);
    }

    Page.prototype.getNode = function() {
        return Node;
    }

    Page.prototype.getDAG = function() {
        return this.dag;
    }

    Page.prototype.addNode = function(node) {
        if (node.id === this.rootNodeID) {
            var self = this;
            this.objdag.get(node.get('id')).then(function(object) {
                self.div.appendChild(object.getWrap(this.document));
            }).catch(function(error) {
                console.log(error);
                throw new Error('error appending first node to page element');
            });
        }
        this.dag.add(node);
    }

    Page.prototype.addNodes = function() {
        var p0 = new Node({id:0, parent:null, children: []});
        p0.set('type', 'Components/Div');
        p0.set('class', 'panel');
        this.addNode(p0);


        var p2 = new Node({id:2, children: []});
        p2.set('type', 'Components/Button');
        p2.set('name', 'Copy Component');
        p2.set('text', 'Copy Component');
        this.dag.addChild(p0, p2);

        var p6 = new Node({id:6, children: []});
        p6.set('type', 'Actions/CopyTree');
        p6.set('event', 'click');
        this.dag.addChild(p2, p6);

        // var p3 = new Node({id:3});
        // p3.set('type', 'Components/InputField');
        // p3.set('name', 'username');
        // p3.set('fieldType', 'text');
        // p3.set('value', 'username');
        // this.dag.addChild(p0, p3);

        // var p7 = new Node({id:7});
        // p7.set('type', 'Actions/StoreValue');
        // p7.set('event', 'onchange');
        // this.dag.addChild(p3, p7);

        // var p4 = new Node({id:4});
        // p4.set('type', 'Components/InputField');
        // p4.set('name', 'password');
        // p4.set('fieldType', 'password');
        // p4.set('value', '');
        // this.dag.addChild(p0, p4);

        // var p8 = new Node({id:8});
        // p8.set('type', 'Actions/StoreValue');
        // p8.set('event', 'onchange');
        // this.dag.addChild(p4, p8);

    }

    return Page;

});
