/**
* Copyright (C) 2014 SoftwareCo-oP
*/


/**
 * ObjectSupplier converts nodes to transient Javascript objects.
 **/
(function(COMPOSITE, Mux, _) {

    /*
     * ObjectSupplier creates objects from nodes.
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
     * @param {Object} node containing an available type.
     * @return {Object} node with programs installed.
     */
    ObjectSupplier.prototype.toObject = function(node) {
        var moduleName = node.type;

        var constructor = COMPOSITE[moduleName];

        if (constructor === undefined) {
            throw Error('Invalid module name provided ' + moduleName);
        }

        node.object = new constructor(node);
        var mux = new Mux(node);

        return node;
    }

    return ObjectSupplier;

})(COMPOSITE, COMPOSITE.Mux, _)
