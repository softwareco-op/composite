//
// Copyright (C) 2014 SoftwareCo-oP
//

(function(HTML) {

    //
    // A simple button.
    //
    // @constructor
    // @param {Node} node representing a button.
    //
    function Button(node) {
        this.node = node;
    }

    //
    // Renders the button
    //
    // @param {Node} node used to read attributes
    // @param {Document} dom to use for rendering
    // @return {Element} dom element representing the button
    //
    Button.prototype.render = function(node, dag, dom) {
        this.node = node;
        this.el = this.el || HTML.nodeToElement(node, dom);
        return this.el;
    }

    Button.prototype.add = function(node, dag, dom) {
        var wrap = this.render(node, dag, dom);
    }

    Button.prototype.update = function(node, dag, dom) {
        var wrap = this.render(node, dag, dom);
    }

    COMPOSITE.Button = Button;
    return Button;

})(COMPOSITE.HTML);
