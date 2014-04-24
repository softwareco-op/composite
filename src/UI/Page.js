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

            self.div.appendChild(node.object.el);
            return node;
        }
        return node;
    }

    Page.prototype.getNodes = function() {

        var choices = this.getPanel(null, 0, {'class':'choices'});

        var choice = this.getPanel(choices, 1, {'class':'choice'});

        var copyHtml = {
            'class':'copy',
            'src':'icons/add.png',
            'alt':'Copy',
        }
        var copy = this.getCopyTree(choice, 2, copyHtml, choice, choices);

        var inputHtml = {
            'name':'choice',
            'type':'text',
            'class':'choiceName'
        }
        var input = this.getInputField(choice, 3, inputHtml);

        var upHtml = {
            'class':'moveUp',
            'src':'icons/uparrow.png',
            'alt':'Up Arrow',
        }
        var upImage = this.getMoveImage(choice, 7, upHtml, choices, -1);

        var downHtml = {
            'class':'moveDown',
            'src':'icons/downarrow.png',
            'alt':'Down Arrow',
        }
        var downImage = this.getMoveImage(choice, 8, downHtml, choices, 1);

        return [choices].concat(choice, upImage, downImage, copy, input);
    }

    Page.prototype.getMoveImage = function(parent, id, html, container, amount) {
        html.tag = 'img';
        var image = new Node({id:id, html:html});
        image.type = 'Components/Image';
        this.dag.addChild(parent, image);

        var p8 = new Node()
        p8.type = 'Actions/Reorder';
        p8.event = 'onmouseup';
        p8.amount = amount;
        p8.container = container.id;
        this.dag.addChild(image, p8);

        return [image, p8];
    }

    Page.prototype.getPanel = function(parent, id, html) {
        html.tag = 'div'
        var p0 = new Node({id:id, html:html});
        p0.type = 'Components/Div';
        this.dag.addChild(parent, p0);
        return p0;
    }

    Page.prototype.getCopyTree = function(parent, id, html, source, destination) {
        html.tag = 'img';
        var image = new Node({id:id, html:html});
        image.type = 'Components/Image';
        this.dag.addChild(parent, image);

        var p6 = new Node();
        p6.type = 'Actions/CopyTree';
        p6.event = 'onmouseup';
        p6.source = source.id;
        p6.destination = destination.id;
        this.dag.addChild(image, p6);

        return [image, p6];
    }

    Page.prototype.getInputField = function(parent, id, html) {
        html.tag = 'input';
        var p3 = new Node({id:id, html:html});
        p3.type = 'Components/InputField';
        p3.value = '';

        this.dag.addChild(parent, p3);

        var p7 = new Node();
        p7.parent = id;
        p7.type = 'Actions/StoreValue';
        p7.event = 'onchange';
        this.dag.addChild(p3, p7);

        return [p3, p7];
    }

    return Page;

});
