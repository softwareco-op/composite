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

define(
['Model/Path', 'Composition/Global', 'Actions/Action', 'lodash'],
function(Path, Global, Action, _) {

    /*
     * Reorder's a child node relative to its peers.
     */
    function Reorder(node) {
        this.node = node;
    }
    _.extend(Reorder.prototype, Action.prototype);

    /*
     * Move a node in the dag.  If node doesn't have a target container and item, then use a default
     * parent and grandparent relative to this node.  Otherwise, move the item within the container specified
     * by the node.
     */
    Reorder.prototype.perform = function(node, dag) {
        console.log('performing');
        var container = node.container;
        var item = node.item;

        if (node.container !== undefined) {
            container = dag.clone(Path.getNode(dag, node, node.container));
        } else {
            parent = dag.getParent(node);
            container = dag.clone(dag.getParent(parent));
        }

        if (node.item === undefined) {
            item = dag.getParent(dag.getParent(node));
        } else {
            item = Path.getNode(dag, node, node.item);
        }

        var children = container.children;
        if (children === undefined || item === undefined) {
            console.log("cannot reorder an undefined item or children");
            return;
        }


        this.move(children, item.id, this.node.amount);
        Global.pipeline(dag.validateNode(container));
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

    return Reorder;

})
