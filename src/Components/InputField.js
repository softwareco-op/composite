//
// (C) 2014 SoftwareCo-oP
//

define(['UI/HTML'], function(HTML) {

    //
    // A text field
    //
    // @param {Node} node describing this text field
    //
    function InputField(node) {
        this.node = node;
    }

    //
    // Renders the input field when the onchange function is available
    //
    // @param {Node} node used to read attributes
    // @param {DAG} dag used to notify listeners
    // @param {Document} dom to use for rendering
    //
    InputField.prototype.render = function(node, dag, dom) {
        this.el = this.el || HTML.nodeToElement(node, dom);
        this.el.value = node.value;
        return this.el;
    }

    InputField.prototype.add = function(node, dag, dom) {
        this.render(node, dag, dom);

        //Let any children know we are here.
        var children = dag.getChildren(node);
        if (children === undefined) {return;}
        children.map(function(child) {
            if (child === undefined) {return;}
            child.object.add(child, dag, dom);
        })
    }

    InputField.prototype.update = function(node, dag, dom) {
        this.render(node, dag, dom);
    }

    return InputField;

});
