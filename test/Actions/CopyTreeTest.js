/*
 * (C) 2014 SoftwareCo-oP
 */

if (typeof module !== 'undefined' && module.exports) {
    //in node
    require('../../src/Server/NodeDeps.js');
    require('../../src/Test/UnitTest.js');
    var chai = require('chai');
    var sinon = require('sinon');
} else {
    //in browser
}

(function(CopyTree, DAG, DAGUtil, chai, sinon) {

    var assert = chai.assert;

    describe('CopyTree', function() {

        it('can make relative copies', function(done) {
            var node = {
                sourcePath : '../',
                destinationPath : '.'
            }

            var copyTree = new CopyTree(node);

            var dag = new DAG();


            var parent = {'name' : 'parent'}
            var child  = {'name' : 'child'}

            DAGUtil.addChild(parent, child)

            dag.add(parent);
            dag.add(child);


            copyTree.perform(child, dag);

            done();
        })

    })

})(COMPOSITE.CopyTree, COMPOSITE.DAG, COMPOSITE.DAGUtil, chai, sinon)
