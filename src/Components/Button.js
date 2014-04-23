//
// Copyright (C) 2014 SoftwareCo-oP
//

define(['Model/ObjectSupplier', 'lodash'],
function(ObjectSupplier, View, _) {

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

        this.el = this.el || dom.createElement('button');

        var self = this;
        var clickListener = function (clickEvent) {
            var object = dag.get(node.id);
            var children = dag.getChildren(object);
            var click = _.filter(children, function(node) {
                return node.event == 'onmouseup';
            })
            _.map(click, function(node) {
                node.object.perform(dag, node);
            });
        }

        this.el.id = node.id;
        this.el.setAttribute('class', node.clazz);
        this.el.name = node.name;
        this.el.textContent = node.text;
        this.el.onmouseup = function(clickEvent) {
            clickListener(clickEvent);
        };

        return self.wrap;
    }

    Button.prototype.add = function(node, dag, dom) {
        var wrap = this.render(node, dag, dom);
    }

    Button.prototype.update = function(node, dag, dom) {
        var wrap = this.render(node, dag, dom);
    }


    return Button;

});
