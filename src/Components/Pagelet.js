/*
 * (C) 2014 SoftwareCo-oP
 */

(function(COMPOSITE) {

    /*
     * Inserts nodes into a container element(usually a div).
     *
     * @constructor
     *
     */
    function Pagelet(options) {
        this.divName = options.divName;
        this.root = options.root;
        this.document = document;
        this.div = document.getElementById(this.divName);
    }
    COMPOSITE.Pagelet = Pagelet;

    Pagelet.prototype.add = function(node) {

        if (node.id === this.root) {
            while (this.div.hasChildNodes()) {
                this.div.removeChild(self.div.lastChild);
            }

            this.div.appendChild(node.object.el);
            return node;
        }

        return node;
    }

    return Pagelet;

})(COMPOSITE)
