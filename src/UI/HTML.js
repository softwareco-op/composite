/*
 * (C) 2014 SoftwareCo-oP
 */


(function(COMPOSITE, _) {

    COMPOSITE.HTML {
        /*
         * Create an element from the properties on a node.  A node's HTML object contains properties found
         * in a HTML elements (i.e. width, height, class, id, etc...).
         *
         * @param {Node} node containing items that are needed to construct the element.
         * @param {Document} dom where the element will be created.
         * @return {Element} element constructed using the properties in the html.
         */
        toElement: function(node, dom) {
            var el;
            try {
                el = dom.createElement(node.html.tag);
            } catch(e) {
                throw new Error(e);
            }
            el.setAttribute('id', node.id);

            _.each(node.html, function(value, key) {
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
            return this.toElement(node, dom, omitFunction);
        }

    }

})(COMPOSITE || {}, lodash)
