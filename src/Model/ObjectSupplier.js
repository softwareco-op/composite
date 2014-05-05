/**
* Copyright (C) 2014 SoftwareCo-oP
*/


/**
 * ObjectSupplier converts nodes to transient Javascript objects.
 **/
(function(COMPOSITE, FunctionNode, _) {

    /*
     * ObjectSupplier creates objects from nodes.
     */
    function ObjectSupplier() {}
    _.extend(ObjectSupplier.prototype, FunctionNode.prototype)

    /*
     * Construct a module given a valid node
     *
     * @param {Backbone.Model} model containing an available type.
     */
    ObjectSupplier.prototype.add = function(node) {
        return this.object(node);
    }

    /*
     * Construct an object given a valid node
     *
     * @param {Node} node containing an available type.
     */
    ObjectSupplier.prototype.object = function(node) {
        var moduleName = node.type;

        var constructor = COMPOSITE[moduleName];

        if (constructor === undefined) {
            throw Error('Invalid module name provided ' + moduleName);
        }

        node.object = new constructor(node);
        node.functionNode = new FunctionNode(node);

        return node;
    }

    COMPOSITE.ObjectSupplier = ObjectSupplier;
    return ObjectSupplier;

})(COMPOSITE, COMPOSITE.FunctionNode, _)
