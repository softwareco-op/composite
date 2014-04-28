/**
* Copyright (C) 2014 SoftwareCo-oP
*/


/**
 * ObjectSupplier converts nodes to transient Javascript objects.
 **/
(function(COMPOSITE, HtmlNode, GlobalAction, CopyTree, StoreValue, Reorder) {

    function ObjectSupplier() {}

    /*
     * Construct a module given a valid node
     * @param {Backbone.Model} model containing an available type.
     */
    ObjectSupplier.prototype.add = function(node) {
        return this.object(node);
    }

    /*
     * Construct an object given a valid node
     * @param {Node} node containing an available type.
     */
    ObjectSupplier.prototype.object = function(node) {
        var moduleName = node.type;

        var constructor = COMPOSITE[moduleName];

        if (constructor === undefined) {
            throw Error('Invalid module name provided ' + moduleName);
        }

        node.object = new constructor(node);

        return node;
    }

    COMPOSITE.ObjectSupplier = ObjectSupplier;
    return ObjectSupplier;

})(COMPOSITE, COMPOSITE.HtmlNode,COMPOSITE.GlobalAction,COMPOSITE.CopyTree,COMPOSITE.StoreValue,COMPOSITE.Reorder)
