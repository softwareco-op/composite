
(function(COMPOSITE, Action, _) {

    function DisplayChildren(node) {
        this.node = node;
    }
    _.extend(DisplayChildren.prototype, Action.prototype);

    DisplayChildren.prototype.perform = function(node, dag) {
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

        return el;
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
