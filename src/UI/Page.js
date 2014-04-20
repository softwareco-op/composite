/**
 * (C) 2014 SoftwareCo-oP
 */

/*
 * An HTML Page renderer.
 */
define(['Model/Node',
        'Model/ObjectSupplier',
        'Collection/DAG',
        'Model/Unique',
        'Composition/Global',
        'lodash'],
function(Node,
         ObjectSupplier,
         DAG,
         Unique,
         Global,
         _) {

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
        this.dag = dag || new DAG();
        this.objectSupplier = new ObjectSupplier();
        this.unique = new Unique(this.dag);
        this.root = root;
    }

    Page.prototype.install = function() {

        var pipeline = _.compose(_.bind(this.add, this),
                                 _.bind(this.dag.add, this.dag),
                                 _.bind(this.unique.add, this.unique),
                                 _.bind(this.objectSupplier.add, this.objectSupplier));
        Global.pipeline = pipeline;
        return pipeline;
    }

    Page.prototype.getDAG = function() {
        return this.dag;
    }

    Page.prototype.setRootNodeID = function(id) {
        this.rootNodeID = id;
    }

    Page.prototype.add = function(node) {
        var self = this;
        var parent = this.dag.getParent(node);

        if (node.object.add !== undefined) {
            node.object.add(node, this.dag, this.document);
        }

        if (parent !== undefined) {
            if (parent.object.update !== undefined) {
                parent.object.update(parent, this.dag, this.document);
            }
        }

        if (node.id === self.root) {
            while (self.div.hasChildNodes()) {
                self.div.removeChild(self.div.lastChild);
            }

            self.div.appendChild(node.object.getWrap(this.document));
            return node;
        }
        return node;
    }

    Page.prototype.getNodes = function() {

        var page = this.getPanel(null, 0);

        var choice = this.getPanel(page, 1);

        var p2 = this.getCopyTree(choice, choice, page);

        var p3 = this.getInputField(choice, 3, 'text');

        var upImage = this.getImage(choice, 7, 'icons/uparrow.png', 'Up Arrow');

        var downImage = this.getImage(choice, 8, 'icons/downarrow.png', 'Down Arrow');

        var up = this.getMove(choice, 5, '+', page, -1);

        var down = this.getMove(choice, 6, '-', page, 1);

        return [page].concat(choice, down, upImage, downImage, p2, p3,  up);
    }

    Page.prototype.getImage = function(parent, id, src, description) {
        var image = new Node({id:id});
        image.src = src;
        image.alt = description;
        this.dag.addChild(parent, image);

        return image;
    }

    Page.prototype.getPanel = function(parent, id) {
        var p0 = new Node({id:id});
        p0.type = 'Components/Div';
        p0.clazz = 'panel';
        this.dag.addChild(parent, p0);
        return p0;
    }

    Page.prototype.getCopyTree = function(parent, source, destination) {
       var p2 = new Node();
        p2.type = 'Components/Button';
        p2.name = 'Copy Component';
        p2.text = 'Copy Component';
        p2.clazz = 'left';
        this.dag.addChild(parent, p2);

        var p6 = new Node();
        p6.type = 'Actions/CopyTree';
        p6.event = 'onmouseup';
        p6.source = source.id;
        p6.destination = destination.id;
        this.dag.addChild(p2, p6);

        return [p2, p6];
    }

    Page.prototype.getInputField = function(parent, id, type) {
        var p3 = new Node({id:id});
        p3.type = 'Components/InputField';
        p3.name = 'username';
        p3.fieldType = type;
        p3.value = 'username';
        p3.clazz = 'left';
        this.dag.addChild(parent, p3);

        var p7 = new Node();
        p7.type = 'Actions/StoreValue';
        p7.event = 'onchange';
        this.dag.addChild(p3, p7);

        return [p3, p7];
    }

    Page.prototype.getMove = function(parent, id, text, container, amount) {
        var p7 = new Node({id:id})
        p7.type = 'Components/Button';
        p7.name = 'Move';
        p7.text = text;
        p7.clazz = 'button';
        this.dag.addChild(parent, p7);

        var p8 = new Node()
        p8.type = 'Actions/Reorder';
        p8.event = 'onmouseup';
        p8.amount = amount;
        p8.container = container.id;
        this.dag.addChild(p7, p8);

        return [p7, p8];
    }

    return Page;

});
