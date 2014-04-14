/**
* Copyright (C) 2014 SoftwareCo-oP
*/


/**
 * ObjectSupplier converts Backbone models to transient Javascript objects.
 **/
define(
[ 'Components/Div','Components/Button', 'Components/InputField', 'Actions/GlobalAction', 'Actions/CopyTree'],
function(Div, Button, InputField, GlobalAction, CopyTree) {

    function ObjectSupplier() {
        this.componentMap = {
            'Components/Button' : Button,
            'Components/Div': Div,
            'Components/InputField' : InputField,
            'Actions/GlobalAction' : GlobalAction,
            'Actions/CopyTree' : CopyTree
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
        var moduleName = node.type;

        var constructor = this.componentMap[moduleName];

        if (constructor === undefined) {
            throw Error('Invalid module name provided ' + moduleName);
        }

        node.object = new constructor(node);

        return node;
    }

    return ObjectSupplier;

});
