///
// (C) 2014 SoftwareCo-oP
///

define(['UI/View', 'lodash'], function(View, _) {

    /*
     * A div node that renders child nodes.
     * @constructor
     */
    function DIV(node) {
        this.node = node;
    }
    _.extend(DIV.prototype, View.prototype)

    /*
     * Renders the div
     * @param {Node} node to render
     * @param {DAG} dag used to find children
     * @param {Document} dom used to render
     */
    DIV.prototype.render = function(node, dag, dom) {
        this.node = node;
        var div = this.initialize(dom, function(dom) {
            return dom.createElement('div');
        });

        //Remove the nodes.  We will repopulate this div.
        this.wrap.removeChild(this.wrap.lastChild);
        div = dom.createElement('div');
        this.wrap.appendChild(div);

        div.setAttribute('class', node.class);
        this.setAttributes(dom, {id: node.id});

        var self = this;
        var children = dag.getChildren(node);



        children.map(function(child) {
            //Children may be part of this div node, but not yet in the local memory buffer.
            //If they aren't in memory, then skip over them.  If the tree is valid,
            //we should get an update call when the child is added.
            if (child !== undefined) {
                var childElement = child.object.getWrap(dom);
                if (!div.contains(childElement)) {
                    div.appendChild(childElement);
                }
            }
        })

        return div;
    }

    /*
     * Called when this div is added to a graph/dag/tree.
     */
    DIV.prototype.add = function(node, dag, dom) {
        return this.render(node, dag, dom);
    }

    /*
     * Called when this div is updated on the graph/dag/tree.
     */
    DIV.prototype.update = function(node, dag, dom) {
        return this.render(node, dag, dom);
    }

    return DIV;

});
