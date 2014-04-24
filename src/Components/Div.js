///
// (C) 2014 SoftwareCo-oP
///

define(['UI/HTML'], function(HTML) {

    /*
     * A div node that renders child nodes.
     * @constructor
     */
    function DIV(node) {
        this.node = node;
    }

    /*
     * Renders the div
     * @param {Node} node to render
     * @param {DAG} dag used to find children
     * @param {Document} dom used to render
     */
    DIV.prototype.render = function(node, dag, dom) {
        this.node = node;
        this.el = this.el || HTML.nodeToElement(node, dom)

        //Remove the nodes.  We will repopulate this div.
        this.clear();

        var self = this;
        var children = dag.getChildren(node);

        children.map(function(child) {
            //Children may be part of this div node, but not yet in the local memory buffer.
            //If they aren't in memory, then skip over them.  If the tree is valid,
            //we should get an update call when the child is added and all will be well.
            if (child !== undefined) {
                var childElement = child.object.el;
                if (childElement && !self.el.contains(childElement)) {
                    self.el.appendChild(childElement);
                }
            }
        })

        return this.el;
    }

    /**
     * Clear the div of elements
     * @return this view
     */
    DIV.prototype.clear = function() {
        if (typeof this.el === 'undefined') {return;}
        while (this.el.hasChildNodes()) {
            this.el.removeChild(this.el.lastChild);
        }
        return this;
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
