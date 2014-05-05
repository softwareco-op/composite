/*
 * (C) 2014 SoftwareCo-oP
 */

(function(Path, DAG, chai, sinon) {

    var assert = chai.assert;

    describe('Path', function() {

        it('can combine parts', function(done) {
            var parts = ['..', '..', '.']
            var whole = Path.combine(parts, '/');
            assert.equal(whole, '../../.');

            done();
        })

        it('can traverse the tree', function(done) {
            var dag = new DAG();
            var parent = {id:0};
            var child = {id:1, parent:0};
            var grandchild = {id:2, parent:1};

            dag.add(parent);
            dag.add(child);
            dag.add(grandchild);

            var result = Path.getNode(dag, child, '../');

            assert.equal(result, parent);

            result = Path.getNode(dag, child, './');

            assert.equal(result, child);

            result = Path.getNode(dag, grandchild, '../../');

            assert.equal(result, parent);

            done();

        })

    })

})(COMPOSITE.Path, COMPOSITE.DAG, chai, sinon)
