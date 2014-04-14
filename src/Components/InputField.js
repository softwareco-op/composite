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
            var children = dag.getChildren(self);
            var changeFns = _.filter(children, function(object) {
                return object.node.event === 'onchange';
            });
            _.map(changeFns, function(object) {
                object.perform(input, node);
            });
        }

        this.setAttributes(dom, {id: node.id});
        input.setAttribute('type', node.fieldType);
        input.setAttribute('name', node.name);
        input.value = node.value;
        input.onchange = onChange;

        return this.wrap;
    }

    InputField.prototype.add = function(node, objdag, dag, dom) {
        this.render(node, objdag, dom);
    }

    InputField.prototype.update = function(node, objdag, dag, dom) {
        this.render(node, objdag, dom);
    }

    return InputField;

});
