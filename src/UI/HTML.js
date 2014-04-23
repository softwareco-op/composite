/*
 * (C) 2014 SoftwareCo-oP
 */

define(
['Model/Cloner', 'lodash'],
function(Cloner, _) {

    return {
        /*
         * Create a tag node given a node.
         *
         * @param {Node} node to convert to a tag node
         * @return {Node} tag node
         */
        nodeToTagNode: function(node, omitFunction) {
            var cloner = new Cloner();
            var toStrip = cloner.cloneNode(node);

            //remove omitted items from node
            //removes graph items from node.  See DAG.validateNode.
            var toOmit = function(value, key, object) {
                if (key === 'parent') {return true}
                if (key === 'children') {return true}
                if (key === 'hash') {return true}
                if (key === 'compositeType') {return true}
                if (omitFunction !== undefined) {return omitFunction(value, key, object)}
                return false;
            }

            var bare = cloner.stripNode(toStrip);
            return _.omit(bare, toOmit);
        },

        /*
         * Create an element from the properties on a tag node.  A tag node is a node with properties found
         * in a HTML elements (i.e. width, height, class, id, etc...).
         *
         * @param {Object} tagNode containing only items that are needed to construct the element.
         * @param {Document} dom where the element will be created.
         * @return {Element} element constructed using the properties in the tagNode.
         */
        tagNodeToElement: function(tagNode, dom) {
            var el = dom.createElement(tagNode.tag);

            _.each(tagNode, function(value, key) {
                if (key === 'tag') {
                    return;
                }
                el.setAttribute(key, value);
            })

            return el;
        },

        /*
         * Convert a node to an HTML element.
         */
        nodeToElement: function(node, dom, omitFunction) {
            return this.tagNodeToElement(this.nodeToTagNode(node), dom, omitFunction);
        }

    }

})
