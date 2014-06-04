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
            var spy = sinon.spy();

            var node = {
                id : 'head',
                sourcePath : '../',
                destinationPath : '.',
                bin : {
                    mux: {add : spy}
                }
            }

            var copyTree = new CopyTree(node);

            var dag = new DAG();


            var parent = {'name' : 'parent'}
            var child  = {'name' : 'child'}

            DAGUtil.addChild(parent, child)

            dag.add(node);
            dag.add(parent);
            dag.add(child);


            copyTree.perform(child, dag);

            assert.isTrue(spy.calledThrice);

            assert.equal(spy.getCall(0).args[0].name, 'child');
            assert.equal(spy.getCall(1).args[0].name, 'parent');
            assert.equal(spy.getCall(2).args[0].name, 'child');

            done();
        })

        it('can install on a dom element', function(done) {
            var spy = sinon.spy();

            var node = {
                id : 'head',
                name : 'copyTree',
                sourcePath : '../',
                destinationPath : '.',
                event : 'onTestEvent',
                bin : {
                    mux: {add : spy}
                }
            }

            var copyTree = new CopyTree(node);

            var dag = new DAG();

            var previousCallback = sinon.spy();

            var parent = {
                'name' : 'parent',
                'object' : {
                    el : {
                        'onTestEvent' : previousCallback
                    }
                }
            }

            DAGUtil.addChild(parent, node)

            dag.add(parent);
            dag.add(node);

            copyTree.addNode();

            parent.object.el.onTestEvent()

            assert.isTrue(previousCallback.calledOnce);
            assert.isTrue(spy.calledThrice);
            assert.equal(spy.getCall(0).args[0].name, 'copyTree');
            assert.equal(spy.getCall(1).args[0].name, 'parent');
            assert.equal(spy.getCall(2).args[0].name, 'copyTree');

            done();
        })

    })

})(COMPOSITE.CopyTree, COMPOSITE.DAG, COMPOSITE.DAGUtil, chai, sinon)
