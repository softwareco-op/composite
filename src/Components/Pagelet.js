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
        this.document = document;
        //this.dag = options.bin.dag;
    }

    return Pagelet;


})(COMPOSITE)
