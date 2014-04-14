/**
* Copyright (C) 2014 TheSoftwareCo-oP
*/


/**
 * Tests ObjectSupplier functionality
 **/
define(
['Model/ObjectSupplier', 'Model/Node', 'localstorage', 'backbone', 'chai', 'sinon'],
function(ObjectSupplier, Node, BackboneLocalStorage, Backbone, chai, sinon) {

    var assert = chai.assert;

    describe('ObjectSupplier', function() {

        it('loads the desired module', function(done) {
            var node = new Node();
            node.type = 'Components/Button';
            node.name = 'testButton';

            var objectSupplier = new ObjectSupplier();
            objectSupplier.object(node);
            var name = node.name;
            assert.equal(name, 'testButton');
            assert.isTrue(node.object !== undefined);
            done();
        });

    })

});
