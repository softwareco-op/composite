/**
* Copyright (C) 2014 SoftwareCo-oP
*/


/**
 * ObjectSupplier converts Backbone models to transient Javascript objects.
 **/
define(['rsvp'], function(RSVP) {

    function ObjectSupplier() {}

    ObjectSupplier.prototype.object = function(model, moduleName) {
        if (moduleName === undefined) {
            moduleName = model.get('type');
        }

        var promise = new RSVP.Promise(function(resolve, reject) {
            requirejs([moduleName], function(Module) {
                if (Module === undefined) {
                    throw "Module not found or module isn't returning an object";
                }
                resolve(new Module(model));
            }, function (error) {
                reject(error);
            });
        });

        return promise;
    }

    return ObjectSupplier;

});
