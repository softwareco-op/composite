//
// (C) 2014 SoftwareCo-oP
//

define(['UI/View', 'lodash'], function(View, _) {

    //
    // A text field
    //
    // @param {Node} node describing this text field
    //
    function InputField(node) {
        this.node = node;
    }
    _.extend(InputField.prototype, View.prototype)

    //
    // Renders the input field when the onchange function is available
    //
    // @param {Node} node used to read attributes
    // @param {DAG} dag used to notify listeners
    // @param {Document} dom to use for rendering
    //
    InputField.prototype.render = function(node, dag, dom) {
        this.node = node;
        var input = this.initialize(dom, function(dom) {
            return dom.createElement('input');
        });

        var self = this;
        var onChange = function() {
            var children = dag.getChildren(node);
            var changeFns = _.filter(children, function(child) {
                return child.event === 'onchange';
            });
            _.map(changeFns, function(child) {
                child.object.perform(input, node);
            });
        }

        this.setAttributes(dom, {id: node.id, 'class':node.clazz});
        input.setAttribute('type', node.fieldType);
        input.setAttribute('name', node.name);
        input.value = node.value;
        input.onchange = onChange;

        return this.wrap;
    }

    InputField.prototype.add = function(node, dag, dom) {
        this.render(node, dag, dom);
    }

    InputField.prototype.update = function(node, dag, dom) {
        this.render(node, dag, dom);
    }

    return InputField;

});
