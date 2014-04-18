/*
 * (C) 2014 SoftwareCo-oP
 */

/*
 * 1. Create a div node.
 * 2. Add children to the node.
 * 3. Add to each child an up node and down node.
 * 4. Each up/down button will get the grandparent's children
 * 5. Find the parent node in the grandparent's children list.
 * 6. Move the parent node earlier in the list, in the case of the up button.
 * 7. Move the parent node later in the list, in the case of the down button.
 * 8. Save the result to the pipeline.
 *
 * Reorders a child node relative to its peers.
 */

define(
['Composition/Global'],
function(Global) {

    /*
     * Reorder's a child node relative to its peers.
     */
    function Reorder(node) {
        this.node = node;
    }

    /*
     * Move a node in the dag.  If node doesn't have a target container and item, then use a default
     * parent and grandparent relative to this node.  Otherwise, move the item within the container specified
     * by the node.
     */
    Reorder.prototype.perform = function(dag, node) {
        var container = node.container;
        var item = node.item;

        if (node.container !== undefined) {
            container = dag.clone(dag.get(node.container));
        } else {
            parent = dag.getParent(node);
            container = dag.clone(dag.getParent(parent));
        }

        if (node.item === undefined) {
            item = dag.getParent(dag.getParent(node));
        } else {
            item = dag.getParent(node.id);
        }

        var children = container.children;
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

    Reorder.prototype.add = function(node, dag, dom) {
        this.dag = dag;
    }

    return Reorder;

})
