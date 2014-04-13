///
// (C) 2014 SoftwareCo-oP
///

define(['UI/View', 'backbone', 'underscore'], function(View, Backbone, _) {

    /*
     * A div node that renders child nodes.
     * @constructor
     */
    function DIV(node, objdag) {
        this.objdag = objdag;
    }
    _.extend(DIV.prototype, View.prototype)
    _.extend(DIV.prototype, Backbone.Events);

    /*
     * Renders the div
     * @param {Backbone.Model} node to render
     * @param {Document} dom used to render
     */
    DIV.prototype.render = function(node, dom) {
        var div = this.initialize(dom, function(dom) {
            return dom.createElement('div');
        });

        div.setAttribute('class', node.get('class'));
        this.setAttributes(dom, {id: node.get('id')});

        var self = this;
        var children = this.objdag.getChildren(this);

        children.map(function(child) {
            div.appendChild(child.getWrap(dom));
        })
        self.trigger('rendered', self);
        return div;
    }

    /*
     * Called when this div is added to a graph/dag/tree.
     */
    DIV.prototype.add = function(node, dag, dom) {
        this.dag = dag;
        return this.render(node, dom);
    }

    /*
     * Called when this div is updated on the graph/dag/tree.
     */
    DIV.prototype.update = function(node, dag, dom) {
        return this.render(node, dom);
    }

    return DIV;

});
