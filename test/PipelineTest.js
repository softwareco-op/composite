/*
 * (C) 2014 SoftwareCo-oP
 */

(function(Pipeline, DAG, DAGUtil, TestNode, chai, sinon) {

    var assert = chai.assert;

    describe('Pipeline', function() {

        it('returns the head of a pipeline', function(done) {
            var parent = {name:'testee'};
            var child  = {};
            var dag = new DAG();

            DAGUtil.addChild(parent, child);

            dag.add(parent);
            dag.add(child);

            var head = Pipeline.head(dag, child);
            assert.equal(head.name, 'testee');

            done();
        })

        it('removes a function from the pipeline', function(done) {
            var pipeline = Pipeline.DAGNotify();

            Pipeline.remove('objectSupplier', pipeline);

            var testNode = {
                type : 'TestNode',
                testFunction : function(node) {
                    done("I shouldn't have been called!");
                }
            }

            pipeline.bin.mux.add(testNode);

            done();
        })

    })

})(COMPOSITE.Pipeline, COMPOSITE.DAG, COMPOSITE.DAGUtil, COMPOSITE.TestNode, chai, sinon)
