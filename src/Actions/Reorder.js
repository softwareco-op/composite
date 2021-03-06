/*
 * (C) 2014 SoftwareCo-oP
 */

/*
 * 1. Create a div node.
 * 2. Add children to the node.
 * 3. Add to each child an up node and down node.
 * 6. Move the item earlier in the list, in the case of the up button.
 * 7. Move the item later in the list, in the case of the down button.
 * 8. Save the result to the pipeline.
 *
 * Reorders a child node relative to its peers.
 */

(function(COMPOSITE, Path, Action, DAGUtil, _) {

    /*
     * Reorder's a child node relative to its peers.
     *
     * @param {object} node contains configuration parameters.
     * @param {object} node.container of items to be reordered, or null.  If null,
     * the parent of this node will be the container
     * @param {object} node.item to reorder.
     * @param {number} node.amount to move the item.
     */
    function Reorder(node) {
        this.node = node;
    }
    _.extend(Reorder.prototype, Action.prototype);

    /*
     * Move a node in the dag.  Moves the item within the container specified
     * by the node.
     */
    Reorder.prototype.perform = function(node, dag) {
        var container = node.container;
        var item = node.item;

        container = DAGUtil.clone(Path.getNode(dag, node, node.container));
        item = Path.getNode(dag, node, node.item);

        var children = container.children;
        if (children === undefined || item === undefined) {
            console.log("cannot reorder an undefined item or children");
            return;
        }

        this.move(children, item.id, this.node.amount);

        var head = dag.get('head');

        DAGUtil.validateNode(container);

        head.bin.mux.add(container);
    }

    /*
     * Move a node in a list by an amount.  Do nothing if the result would
     * move the node off the list or if the node is not found in the list.
     *
     * @param {Array} list containing node
     * @param {Node} node to move
     * @param {Number} an amount to move the node in the list
     * @return {Array} the altered list.
     */
    Reorder.prototype.move = function(list, node, amount) {
        var index = list.indexOf(node);

        if (index < 0) {
            return -1;
        }

        var newindex = index + amount;

        if (newindex < 0 || newindex >= list.length) {
            return -2;
        }

        list.splice(index, 1);

        list.splice(newindex, 0, node);

        return list;
    }

    COMPOSITE.Reorder = Reorder;
    return Reorder;


})(COMPOSITE, COMPOSITE.Path, COMPOSITE.Action, COMPOSITE.DAGUtil, _)
