/**
 * (C) 2014 SoftwareCo-oP
 */

/*
 * An HTML Page renderer.
 */
(function(COMPOSITE, Node, ObjectSupplier, DAG, Unique, _) {

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
        var self = this;

        var pipeline = function(node) {
            node = self.objectSupplier.add(node);
            node = self.unique.add(node);
            node = self.dag.add(node);
            return self.add(node);
        }

        COMPOSITE.pipeline = pipeline;
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

    Page.prototype.addNodes = function(pipeline) {
        var ballotBox = this.getPanel(pipeline, null, {'class':'ballotBox'}, 0);

        var ballot = this.getBallot(pipeline, ballotBox);

        return [ballotBox].concat(ballot);
    }

    Page.prototype.getBallot = function(pipeline, parent) {
        var ballot = this.getPanel(pipeline, parent, {'class':'ballot'});

        var usernameHtml = {
            'name':'username',
            'type':'text',
            'class':'username'
        }
        var username = this.getInputField(pipeline, ballot, 10, usernameHtml);

        var copyHtml = {
            'class':'copy',
            'src':'icons/add.png',
            'alt':'New Ballot',
        }
        var newBallotButton = this.getNewBallot(pipeline, ballot, copyHtml, '../../', '../../../');
        var choices = this.getChoices(pipeline, ballot);
        return [ballot].concat(username, choices);
    }

    Page.prototype.getNewBallot = function(pipeline, parent, html, blankBallot, ballotBox) {
        html.tag = 'img';
        var image = new Node({html:html});
        image.type = 'Image';
        this.dag.addChild(parent, image);
        image = pipeline(image);

        var p6 = new Node();
        p6.type = 'CopyTree';
        p6.event = 'onmouseup';
        p6.sourcePath = blankBallot;
        p6.destinationPath = ballotBox;
        this.dag.addChild(image, p6);
        var copyTree = pipeline(p6);
        return [image, copyTree];
    }

    Page.prototype.getChoices = function(pipeline, parent) {
        var choices = this.getPanel(pipeline, parent, {'class':'choices'});

        var choice = this.getPanel(pipeline, choices, {'class':'choice'});

        var copyHtml = {
            'class':'copy',
            'src':'icons/add.png',
            'alt':'Copy',
        }
        var copy = this.getCopyTree(pipeline, choice, 2, copyHtml, '../../', '../../../');

        var inputHtml = {
            'name':'choice',
            'type':'text',
            'class':'choiceName'
        }
        var input = this.getInputField(pipeline, choice, 3, inputHtml);

        var upHtml = {
            'class':'moveUp',
            'src':'icons/uparrow.png',
            'alt':'Up Arrow',
        }
        var upImage = this.getVote(pipeline, choice, 7, upHtml, '../../../', -1);

        var downHtml = {
            'class':'moveDown',
            'src':'icons/downarrow.png',
            'alt':'Down Arrow',
        }
        var downImage = this.getVote(pipeline, choice, 8, downHtml, '../../../', 1);

        return [choices].concat(choice, upImage, downImage, copy, input);
    }

    Page.prototype.getVote = function(pipeline, parent, id, html, container, amount) {
        html.tag = 'img';
        var image = new Node({id:id, html:html});
        image.type = 'Image';
        this.dag.addChild(parent, image);
        image = pipeline(image);

        var p8 = new Node()
        p8.type = 'Reorder';
        p8.event = 'onmouseup';
        p8.amount = amount;
        p8.container = container;
        this.dag.addChild(image, p8);
        var reorder = pipeline(p8);

        return [image, reorder];
    }

    Page.prototype.getPanel = function(pipeline, parent, html, id) {
        html.tag = 'div'
        var p0 = new Node({id:id, html:html});
        p0.type = 'Div';
        this.dag.addChild(parent, p0);
        return pipeline(p0);
    }

    Page.prototype.getCopyTree = function(pipeline, parent, id, html, source, destination) {
        html.tag = 'img';
        var image = new Node({id:id, html:html});
        image.type = 'Image';
        this.dag.addChild(parent, image);
        image = pipeline(image);

        var p6 = new Node();
        p6.type = 'CopyTree';
        p6.event = 'onmouseup';
        p6.sourcePath = source;
        p6.destinationPath = destination;
        this.dag.addChild(image, p6);
        var copyTree = pipeline(p6);
        return [image, copyTree];
    }

    Page.prototype.getInputField = function(pipeline, parent, id, html) {
        html.tag = 'input';
        var p3 = new Node({id:id, html:html});
        p3.type = 'InputField';
        p3.value = '';
        this.dag.addChild(parent, p3);
        var inputField = pipeline(p3);

        var p7 = new Node();
        p7.parent = id;
        p7.type = 'StoreValue';
        p7.event = 'onchange';
        this.dag.addChild(p3, p7);
        var storeValue = pipeline(p7);

        return [inputField, storeValue];
    }

    COMPOSITE.Page = Page;
    return Page;

})(COMPOSITE, COMPOSITE.Node, COMPOSITE.ObjectSupplier, COMPOSITE.DAG, COMPOSITE.Unique, _);
