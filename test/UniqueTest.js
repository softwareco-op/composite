/*
 * (C) 2014 SoftwareCo-oP
 */

(function(Unique, Pipeline, DAGUtil, chai, sinon) {

    var assert = chai.assert;

    describe('Unique', function() {

        it('it keeps non unique nodes from passing through the pipeline', function(done) {
            var unique = Pipeline.uniqueMemoryDag();
            var node = unique.bin.mux.add({});
            try {
                unique.bin.mux.add(node);
            } catch (e) {
                done();
            }
        })

    })

})(COMPOSITE.Unique, COMPOSITE.Pipeline, COMPOSITE.DAGUtil, chai, sinon)
