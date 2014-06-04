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

(function(Reorder, DAG, DAGUtil, chai, sinon) {

    var assert = chai.assert;

    describe('Reorder', function() {

        it('reorders nodes', function(done) {
            var spy = sinon.spy();

            var dag = new DAG();

            var parent = {
                name : 'parent'
            }
            var child1 = {
                name : 'child1'
            }
            var child2 = {
                name : 'child2'
            }
            var node = {
                id : 'head',
                container : '../../',
                item : '../',
                amount : -1,
                bin : {
                    mux: {add : spy}
                }
            }

            DAGUtil.addChild(parent, child1)
            DAGUtil.addChild(parent, child2)
            DAGUtil.addChild(child2, node)

            dag.add(parent)
            dag.add(child1)
            dag.add(child2)
            dag.add(node)

            var reorder = new Reorder(node);
            reorder.perform(node, dag)

            assert.isTrue(spy.calledOnce);
            assert.equal(dag.get(spy.getCall(0).args[0].children[0]).name, 'child2');

            done();
        })

    })

})(COMPOSITE.Reorder, COMPOSITE.DAG, COMPOSITE.DAGUtil, chai, sinon)
