/*
 * (C) 2014 SoftwareCo-oP
 */


(function(COMPOSITE, Action, _) {

    /*
     * Displays the child elements of this node's parent.
     */
    function DisplayChildren(node) {
        this.node = node;
    }
    _.extend(DisplayChildren.prototype, Action.prototype);

    DisplayChildren.prototype.perform = function(node, dag) {
        var parent = dag.getParent(node);

        //Remove the nodes.  We will repopulate this div.
        this.clear(parent.object.el);

        var self = this;
        var children = dag.getChildren(parent);

        children.map(function(child) {
            //Children may be part of this div node, but not yet in the local memory buffer.
            //If they aren't in memory, then skip over them.  If the tree is valid,
            //we should get an update call when the child is added and all will be well.
            if (child !== undefined) {
                var childElement = child.object.el;
                if (childElement && !parent.object.el.contains(childElement)) {
                    parent.object.el.appendChild(childElement);
                }
            }
        })

        return parent.object.el;
    }

    DisplayChildren.prototype.clear = function(el) {
        if (typeof el === 'undefined') {return;}
        while (el.hasChildNodes()) {
            el.removeChild(el.lastChild);
        }
        return el;
    }

    COMPOSITE.DisplayChildren = DisplayChildren;
    return COMPOSITE.DisplayChildren;

})(COMPOSITE, COMPOSITE.Action, _)
