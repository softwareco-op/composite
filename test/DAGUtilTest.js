/*
 * (C) 2014 SoftwareCo-oP
 */

(function(DAGUtil, DAG, chai, sinon) {

    var assert = chai.assert;

    describe('DAGUtil', function() {

        it('validates nodes', function(done) {
            var node = DAGUtil.validateNode({})

            assert.isDefined(node.id);
            assert.isDefined(node.children);
            assert.isDefined(node.parent);

            done();
        })

        it('adds a child', function(done) {
            var parent = DAGUtil.validateNode({})
            var child  = DAGUtil.validateNode({})
            DAGUtil.addChild(parent, child);
            assert.equal(parent.children[0], child.id);
            assert.equal(child.parent, parent.id);
            done();
        })

        it('removes children', function(done) {
            var parent = DAGUtil.validateNode({})
            var child  = DAGUtil.validateNode({})
            var child2 = DAGUtil.validateNode({})
            DAGUtil.addChild(parent, child);
            DAGUtil.addChild(parent, child2);
            DAGUtil.unlinkChild(parent, child);
            assert.equal(parent.children.length, 1, 'should only have one child');
            assert.equal(parent.children[0], child2.id);
            assert.isNull(child.parent, null);
            done();
        })

        it('copies nodes', function(done) {
            var node = {id: 1, parent: 2};
            var copy = DAGUtil.copy(node);

            assert.notEqual(node, copy);
            assert.equal(node.parent, copy.parent);
            assert.notEqual(node.id, copy.id);

            done();
        })


        it('copies trees', function(done) {
            var dag = new DAG();
            var parent = {id: 1};
            var child = {id: 2, color: 'blue'};
            DAGUtil.addChild(parent,child);
            dag.add(parent);
            dag.add(child);

            var copies = DAGUtil.copyTree(dag,parent);
            dag.addAll(copies);

            var parentCopy = dag.get(copies[0].id);
            var childCopy = dag.getChildren(parentCopy)[0];

            assert.notEqual(child.parent, childCopy.parent);
            assert.equal(parentCopy.id, childCopy.parent);
            assert.equal(child.color, childCopy.color);

            done();
        })

        it('removes trees', function(done) {
            var dag = new DAG();
            var parent = {id: 1};
            var child = {id: 2, color: 'blue'};
            DAGUtil.addChild(parent,child);
            dag.add(parent);
            dag.add(child);

            assert.isDefined(dag.get(1));
            assert.isDefined(dag.get(2));

            DAGUtil.rmTree(dag, parent);
            assert.isUndefined(dag.get(1));
            assert.isUndefined(dag.get(2));
            done()
        })

        it('can search for nodes', function(done) {
            var dag = new DAG();
            var parent = {id: 1, type: 'node'};
            var child = {id: 2, color: 'blue', type: 'node'};
            DAGUtil.addChild(parent,child);
            dag.add(parent);
            dag.add(child);

            var predicate = function(node) {
                return (node.color === 'blue');
            }

            var matches = DAGUtil.searchSubTree(dag, parent, predicate, 10);

            assert.equal(matches.length, 1);
            assert.equal(matches[0].color, 'blue');

            predicate = function(node) {
                return (node.type === 'node');
            }

            matches = DAGUtil.searchSubTree(dag, parent, predicate, 10);

            assert.equal(matches.length, 2);
            assert.equal(matches[0].type, 'node');
            assert.equal(matches[1].type, 'node');

            done();
        })


    })

})(COMPOSITE.DAGUtil, COMPOSITE.DAG, chai, sinon)
