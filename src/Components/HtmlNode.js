//
// Copyright (C) 2014 SoftwareCo-oP
//

(function(COMPOSITE, HTML) {

    //
    // A simple html tag constructed from a node.
    //
    // @constructor
    // @param {Node} node representing a html tag.
    //
    function HtmlNode(node) {}

    //
    // Renders the button
    //
    // @param {Node} node used to read attributes
    // @param {Document} dom to use for rendering
    // @return {Element} dom element representing the button
    //
    HtmlNode.prototype.render = function(node, dag, dom) {
        this.el = this.el || HTML.nodeToElement(node, dom);
        if (this.el.onrender) {
            this.el.onrender(node, dag);
        }
        return this.el;
    }

    HtmlNode.prototype.add = function(node, dag, dom) {
        //Let any children know we are here.
        var children = dag.getChildren(node);
        if (children === undefined) {return;}
        children.map(function(child) {
            if (child === undefined) {return;}
            child.object.update(child, dag, dom);
        })

        this.render(node, dag, dom);
    }

    HtmlNode.prototype.update = function(node, dag, dom) {
        this.render(node, dag, dom);
    }

    COMPOSITE.HtmlNode = HtmlNode;
    return HtmlNode;

})(COMPOSITE, COMPOSITE.HTML);
