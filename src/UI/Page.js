/**
 * (C) 2014 SoftwareCo-oP
 */

/*
 * An HTML Page renderer.
 */
define(['Model/ObjectSupplier',
        'Collection/OBJDAGController',
        'Collection/OBJDAG',
        'Model/Hasher',
        'Collection/DAG',
        'Composition/Global',
        'localstorage',
        'backbone'],
function(ObjectSupplier,
         OBJDAGController,
         OBJDAG,
         Hasher,
         DAG,
         Global,
         BackboneLocalStorage,
         Backbone) {

    /**
     * Constructs a page(let) consisting of a composition of nodes.
     *
     * @constructor
     * @param {Element} div where we put our composition
     * @param {Document} document containing our composition
     * @param {DAG} DAG containing nodes
     * @param {String} root is the root node id of the node to add to div
     */
    function Page(div, document, root, dag) {
        this.div = div;
        this.document = document;
        this.dag = dag;
        this.root = root;
    }

    Page.prototype.install = function() {
        this.dag = this.dag || new DAG();
        this.objectSupplier = new ObjectSupplier();
        this.hasher = new Hasher("SHA-256");
        Global.dag = this.dag;
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

    Page.prototype.setRootNodeID = function(id) {
        this.rootNodeID = id;
    }

    Page.prototype.add = function(node) {
        var self = this;
        var nodeObject = dag.get(node.id);
        if (nodeObject.id === self.rootNodeID) {
            self.div.appendChild(nodeObject.getWrap(this.document));
            return nodeObject;
        }
        nodeObject.add(node, dag, dom);
        return nodeObject;
    }

    Page.prototype.addNodes = function() {
        var p0 = new Node({id:0});
        p0.type = 'Components/Div';
        p0class = 'panel';
        this.add(p0);

        var p2 = new Node();
        p2.type = 'Components/Button';
        p2.name = 'Copy Component';
        p2.text = 'Copy Component';
        this.dag.add(p2);

        var p6 = new Node();
        p6.type = 'Actions/CopyTree';
        p6.event = 'click';
        this.dag.add(p6);

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
