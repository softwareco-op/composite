/**
* Copyright (C) 2014 TheSoftwareCo-oP
*/


/**
 * Tests ObjectSupplier functionality
 **/
(function(ObjectSupplier, Node, chai, sinon) {

    var assert = chai.assert;

    describe('ObjectSupplier', function() {

        it('loads the desired module', function(done) {
            var node = new Node();
            node.type = 'Components/HtmlNode';
            node.name = 'testButton';

            var objectSupplier = new ObjectSupplier();
            objectSupplier.object(node);
            var name = node.name;
            assert.equal(name, 'testButton');
            assert.isTrue(node.object !== undefined);
            done();
        });

    })

})(COMPOSITE.ObjectSupplier, COMPOSITE.Node, chai, sinon);
