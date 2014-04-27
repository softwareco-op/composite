///
// (C) 2014 SoftwareCo-oP
///


(function(HtmlNode, HTML) {

    COMPOSITE.Div = {
        Div: function(node) {
            this.htmlNode = new HtmlNode();
            this.htmlNode = htmlNode;
        },

        attachChildren : function(el, dag) {
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
        },

        /**
         * Clear the div of elements
         * @return this view
         */
        clear: function() {


            if (typeof this.el === 'undefined') {return;}
            while (this.el.hasChildNodes()) {
                this.el.removeChild(this.el.lastChild);
            }
            return this;
        }
    }

    return COMPOSITE.DIV;

});
