/**
* Copyright (C) 2014 TheSoftwareCo-oP
*/


/**
 * Tests ObjectSupplier functionality
 **/
(function(ObjectSupplier, FunctionNode, DAGUtil, chai, sinon) {

    var assert = chai.assert;

    describe('ObjectSupplier', function() {

        it('loads the desired module', function(done) {
            var node = {
                type: 'HtmlNode',
                name: 'testButton'
            }

            var objectSupplier = new ObjectSupplier();
            objectSupplier.add(node);
            var name = node.name;
            assert.equal(name, 'testButton');
            assert.isTrue(node.object !== undefined);
            done();
        });

        it('can bootstrap a pipeline', function(done) {
            var objectSupplier = new ObjectSupplier();

            var dagNode = {
                id : 'dag',
                type : 'DAG'
            }

            var objectSupplierNode = {
                id : 'objectSupplier',
                type : 'ObjectSupplier'
            }

            DAGUtil.addChild(objectSupplierNode, dagNode);

            dagNode = objectSupplier.add(dagNode);
            objectSupplierNode = objectSupplier.add(objectSupplierNode);

            dagNode.bin.mux.add(dagNode);
            objectSupplierNode.bin.mux.add(objectSupplierNode);

            done();
        })
    })

})(COMPOSITE.ObjectSupplier, COMPOSITE.FunctionNode, COMPOSITE.DAGUtil, chai, sinon);
