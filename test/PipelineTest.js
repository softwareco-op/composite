/*
 * (C) 2014 SoftwareCo-oP
 */

(function(Pipeline, DAG, DAGUtil, chai, sinon) {

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

    })

})(COMPOSITE.Pipeline, COMPOSITE.DAG, COMPOSITE.DAGUtil, chai, sinon)
