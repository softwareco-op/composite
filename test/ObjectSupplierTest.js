/**
* Copyright (C) 2014 TheSoftwareCo-oP
*/


/**
 * Tests ObjectSupplier functionality
 **/
define(
['Model/ObjectSupplier', 'localstorage', 'backbone', 'chai', 'sinon'],
function(ObjectSupplier, BackboneLocalStorage, Backbone, chai, sinon) {

    var assert = chai.assert;

    var Node = Backbone.Model.extend({
        sayId: function() {
            console.log(this.get('id'));
        }
    });

    describe('ObjectSupplier', function() {

        it('loads the desired module', function(done) {
            var node = new Node();
            var type = 'Components/Button';
            node.set('type', type);
            node.set('name', 'testButton');
            var objectSupplier = new ObjectSupplier();
            var promise = objectSupplier.object(node);
            promise.then(function(module) {

                var name = module.name;

                assert.equal(name, 'testButton');
                done();
            }).catch(function(error) {
                done(error);
            });

        });
    })

});
