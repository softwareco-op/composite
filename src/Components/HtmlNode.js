//
// Copyright (C) 2014 SoftwareCo-oP
//

(function(COMPOSITE, HTML) {

    //
    // A simple html tag constructed from a node.
    //
    // @constructor
    // @param {Object} node representation of a html tag.
    //
    function HtmlNode(node) {
        this.node = node;
        if ( node.document ) {
            this.dom = node.document;
        } else if ( typeof document == 'undefined') {
            this.dom = null;
        } else {
            this.dom = document;
        }
    }
    COMPOSITE.HtmlNode = HtmlNode;

    //
    // Renders the button
    //
    // @param {Node} node used to read attributes
    // @param {Document} dom to use for rendering
    // @return {Element} dom element representing the button
    //
    HtmlNode.prototype.render = function(node) {
        this.el = this.el || HTML.nodeToElement(node, this.dom);
        if (this.el.onrender) {
            this.el.onrender(node, this.node.bin.dag);
        }
        return this.el;
    }

    HtmlNode.prototype.update = function(node) {
        this.render(node);

        //Let any children know we are here.
        var children = this.node.bin.dag.getChildren(node);
        if (children === undefined) {return;}

        var self = this;

        while (this.el && this.el.hasChildNodes()) {
            this.el.removeChild(self.el.lastChild);
        }

        children.map(function(child) {
            if (child === undefined) {return;}
            child.object.render(child);
            self.el.appendChild(child.object.el);
        })
    }

    HtmlNode.prototype.addChild = function() {
        this.update(this.node);
    }

    HtmlNode.prototype.addNode = function() {
        this.update(this.node);
    }

    return HtmlNode;

})(COMPOSITE, COMPOSITE.HTML);
