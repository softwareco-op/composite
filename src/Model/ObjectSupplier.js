/**
* Copyright (C) 2014 SoftwareCo-oP
*/


/**
 * ObjectSupplier converts Backbone models to transient Javascript objects.
 **/
define(
[ 'Components/Div','Components/Button', 'Components/InputField', 'Components/Image', 'Actions/GlobalAction',
  'Actions/CopyTree', 'Actions/StoreValue', 'Actions/Reorder'],
function(Div, Button, InputField, Image, GlobalAction, CopyTree, StoreValue, Reorder) {

    function ObjectSupplier() {
        this.componentMap = {
            'Components/Button' : Button,
            'Components/Div': Div,
            'Components/InputField' : InputField,
            'Components/Image': Image,
            'Actions/GlobalAction' : GlobalAction,
            'Actions/CopyTree' : CopyTree,
            'Actions/StoreValue' : StoreValue,
            'Actions/Reorder' : Reorder
        }
    }

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
        //depreciated.  Use compositeType.
        var moduleName = node.type;

        if (node.compositeType) {
            moduleName = node.compositeType;
        }

        var constructor = this.componentMap[moduleName];

        if (constructor === undefined) {
            throw Error('Invalid module name provided ' + moduleName);
        }

        node.object = new constructor(node);

        return node;
    }

    return ObjectSupplier;

});
