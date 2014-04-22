/*
 * (C) 2014 SoftwareCo-oP
 */

define(
[],
function() {

    /*
     * An Action can be installed on elements.
     */
    function Action() {

    }

    /*
     * Install this Action on the parent element.
     *
     * @param {Node} node
     * @param {DAG} dag
     * @return {Function} to call on desired event
     */
    Action.prototype.install = function(node, dag) {
        var self = this;
        var parent = dag.getParent(node);

        var el = parent.object.el;
        var fn = el[node.event];

        var callback = function(clickEvent) {
            if (fn) {
                fn(clickEvent)
            }
            self.perform(node, dag);
        }

        el[node.event] = callback;
        return el[node.event];
    }

    /*
     * Add this action to the parent.
     */
    Action.prototype.add = function(node, dag, dom) {
        this.dag = dag;
        this.install(node, dag);
    }

    return Action;
})
