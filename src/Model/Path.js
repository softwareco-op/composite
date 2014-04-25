/*
 * (C) 2014 SoftwareCo-oP
 */

define(
[],
function() {

    return {

        /*
         * Returns a node relative to the path and given node.
         *
         * @param {DAG} dag to navigate through.
         * @param {Node} node to start navigating from.
         * @param {string} path to take.
         *
         * @return {Node} the node at the end of the path.
         */
        getNode: function(dag, node, path) {
            //stoping condition
            if (!path) {
                return node;
            }

            var parts = path.split('/');
            var part = parts.pop();
            var next = this.combine(parts, '/');

            if (part === '.' || part === '') {
                return this.getNode(dag, node, next);
            }

            if (part === '..') {
                return this.getNode(dag, dag.getParent(node), next);
            }

            //could add traversal to a named child nodes here
        },

        /*
         * Combine the parts into a whole
         *
         * @param {Array} parts typically containing strings
         * @param {string} separator added between parts
         *
         * @return {string} combining all parts
         */
        combine: function(parts, separator) {
            var whole = ''

            if (parts.length <= 0) {
                return whole;
            }

            for (var i = 0 ; i < parts.length ; i++) {
                if (i === 0) {
                    whole = parts[i];
                } else {
                    whole += separator + parts[i];
                }
            }

            return whole;
        }

    }

})
