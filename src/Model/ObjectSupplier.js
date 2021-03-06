/**
* Copyright (C) 2014 SoftwareCo-oP
*/


/**
 * ObjectSupplier converts nodes to transient Javascript objects.
 **/
(function(COMPOSITE, Mux, _) {

    /*
     * ObjectSupplier constructs objects from nodes.
     */
    function ObjectSupplier() {}
    COMPOSITE.ObjectSupplier = ObjectSupplier;

    /*
     * Construct the object represented by the given valid node.
     *
     * @param {Object} node containing an available type.
     */
    ObjectSupplier.prototype.add = function(node) {
        return this.toObject(node);
    }

    /*
     * Construct an object given a valid node
     *
     * @param {Object} node possibly containing a valid type.
     * @return {Object} node with programs installed.
     */
    ObjectSupplier.prototype.toObject = function(node) {
        var moduleName = node.type;

        var constructor = COMPOSITE[moduleName];

        if (constructor === undefined) {
            return node;
        }

        node.object = new constructor(node);
        var mux = new Mux(node);

        return node;
    }

    return ObjectSupplier;

})(COMPOSITE, COMPOSITE.Mux, _)
