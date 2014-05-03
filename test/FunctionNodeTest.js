/*
 * (C) 2014 SoftwareCo-oP
 */

(function(FunctionNode, DAG, COMPOSITE, _, chai, sinon) {

    var assert = chai.assert;

    describe('FunctionNode', function() {

        it('performs the function when there is no dag', function(done) {
            var functionNode = new FunctionNode();

            functionNode.perform = function() {
                done();
            }

            functionNode.add({});
        })

        it('does not fail when there is a dag and no children', function(done) {
            var dag = new DAG();

            COMPOSITE.DAG = dag;

            var functionNode = new FunctionNode();

            functionNode.perform = function() {
                done();
            }

            functionNode.add({});

            done();
        })

        it('calls children functions', function(done) {
            var dag = new DAG();

            COMPOSITE.DAG = dag;

            var functionNode = new FunctionNode();
            var me = dag.add(functionNode);
            var spy = sinon.spy();
            functionNode.perform = function() {
                spy();
            }

            var childNode = new FunctionNode();
            var child = dag.add(childNode);
            childNode.perform = function() {
                assert.isTrue(spy.calledOnce);
                done()
            }

            dag.addChild(me, child);

            functionNode.add({});

        })

    })

})(COMPOSITE.FunctionNode, COMPOSITE.DAG, COMPOSITE, _, chai, sinon)
