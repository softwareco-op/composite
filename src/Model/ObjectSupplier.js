/**
* Copyright (C) 2014 SoftwareCo-oP
*/


/**
 * ObjectSupplier converts Backbone models to transient Javascript objects.
 **/
define(
[ 'Components/Div','Components/Button', 'Components/InputField', 'Actions/GlobalAction'],
function(Div, Button, InputField, GlobalAction) {

    function ObjectSupplier() {
        this.componentMap = {
            'Components/Button' : Button,
            'Components/Div': Div,
            'Components/InputField' : InputField,
            'Actions/GlobalAction' : GlobalAction
        }
    }

    /*
     * Construct a module given a valid model
     * @param {Backbone.Model} model containing an available type.
     */
    ObjectSupplier.prototype.object = function(model) {
        var moduleName = model.type;

        var constructor = this.componentMap[moduleName];

        if (constructor === undefined) {
            throw Error('Invalid module name provided ' + moduleName);
        }

        return new constructor(model);
    }

    return ObjectSupplier;

});
