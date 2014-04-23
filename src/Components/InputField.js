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
        var omitValueFromElement = function(value, key) {
            if (key === 'value') {
                return true;
            }
            return false;
        }

        this.el = this.el || HTML.nodeToElement(node, dom, omitValueFromElement);
        return this.el;
    }

    InputField.prototype.add = function(node, dag, dom) {
        this.render(node, dag, dom);
    }

    InputField.prototype.update = function(node, dag, dom) {
        this.render(node, dag, dom);
    }

    return InputField;

});
