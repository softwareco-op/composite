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
        'Composition/Global',
        'localstorage',
        'backbone'],
function(ObjectSupplier,
         OBJDAGController,
         OBJDAG,
         DAG,
         Global,
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
        this.dag = new DAG(this.collection);
        this.objectSupplier = new ObjectSupplier();
        this.objdag = new OBJDAG(this.objectSupplier, this.dag, this.document);
        this.objDagController = new OBJDAGController(this.objectSupplier, this.objdag, this.dag, this.document);

        //try turning this off for now
        //this.objDagController.manage(this.collection);
        Global.dag = this.dag;
        Global.objdag = this.objdag;
    }

    Page.prototype.getNode = function() {
        return Node;
    }

    Page.prototype.getDAG = function() {
        return this.dag;
    }

    Page.prototype.getOBJDAG = function() {
        return this.objdag;
    }

    Page.prototype.addNode = function(node) {
        var self = this;
        var nodePromise = this.objDagController.add(node).then(function(nodeObject) {
            if (nodeObject.id === self.rootNodeID) {
                self.div.appendChild(nodeObject.getWrap(this.document));
            }
            return nodeObject;
        }).catch(function(error) {
            console.log(error);
            throw new Error('error appending first node to page element');
        });

        //this.dag.add(node);
        return nodePromise;
    }

    Page.prototype.addNodes = function() {
        var p0 = new Node({id:0});
        p0.set('type', 'Components/Div');
        p0.set('class', 'panel');
        this.addNode(p0);

        var p2 = new Node();
        p2.set('type', 'Components/Button');
        p2.set('name', 'Copy Component');
        p2.set('text', 'Copy Component');
        this.dag.addChild(p0, p2);

        var p6 = new Node();
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
