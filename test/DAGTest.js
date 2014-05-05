/**
* Copyright (C) 2014 TheSoftwareCo-oP
*/


/**
 * DAG is directed acyclic graph.
 **/

(function(DAG, DAGUtil, uuid, _, chai) {

    var expect = chai.expect;
    var assert = chai.assert;

    describe('DAG', function() {
        it('stores nodes', function(done) {
            var pid = uuid.v1();
            var cid = uuid.v1();

            var p = {id:p};
            var c = {id:c};

            var dag = new DAG();

            var floating = {id: 1};
            dag.add(p);
            dag.add(c);
            assert.equal(dag.exists(floating), false);
            assert.equal(dag.exists(p), true);
            assert.equal(dag.exists(c), true);
            dag.add(floating);
            assert.equal(dag.exists(floating), true);

            done();
        })

        it('removes nodes', function(done) {
            var n = {}
            var dag = new DAG();
            dag.add(n);
            assert.isTrue(dag.exists(n));
            dag.remove(n);
            assert.isFalse(dag.exists(n));
            done();
        })

        it('retrieves parent', function(done) {

            var p = {id: 1}
            var c = {id: 2,  parent: 1, name: 'child'};

            var dag = new DAG();
            dag.add(c);
            dag.add(p);
            var parent = dag.getParent(c);
            assert.equal(parent.id, p.id);
            done();

        })

        it('retrieves children', function(done) {
            var pid = uuid.v1();
            var cid = uuid.v1();
            var cid2 = uuid.v1();

            var p = {id: pid}
            var c = {id: cid,  parent: 1, name: 'child'};
            var c2 = {id: cid2, parent: 1, name: 'child2'};

            var dag = new DAG();
            DAGUtil.addChild(p, c);
            DAGUtil.addChild(p, c2);

            var children = dag.getChildren(p);
            assert.equal(children.length, 2);
            assert.equal(p.children.length, 2);
            assert.equal(p.children[0], cid);
            assert.equal(p.children[1], cid2);

            done();
        });

        it('creates valid edges between nodes', function(done) {
            var dag = new DAG();
            var parent = {}
            var child = {color: 'blue'};

            DAGUtil.addChild(parent, child);
            dag.add(parent);
            dag.add(child);

            var copies = DAGUtil.copyTree(dag, parent);
            dag.addAll(copies);
            var parentCopy = copies[0];
            var childCopy = dag.getChildren(parentCopy)[0];

            assert.isNull(parent.parent);
            assert.notEqual(child.parent, childCopy.parent);
            assert.equal(parentCopy.id, childCopy.parent);
            assert.equal(child.color, childCopy.color);

            done();
        })

        it('copies a tree and adds branches properly', function(done) {
            var dag = new DAG()

            var p0 = {id:0};
            p0.type = 'Div';
            p0.class = 'panel';
            dag.add(p0);

            var p2 = {};
            p2.type = 'Button';
            p2.name = 'Copy Component';
            p2.text = 'Copy Component';
            DAGUtil.addChild(p0, p2);
            dag.add(p2);

            var p6 = {};
            p6.type = 'CopyTree';
            p6.event = 'click';
            DAGUtil.addChild(p2, p6);
            dag.add(p6);

            var parent = dag.getParent(p6);
            var grandparent = dag.getParent(parent);
            var copies = DAGUtil.copyTree(dag, grandparent);
            dag.addAll(copies);
            var copy = copies[0];
            DAGUtil.setChild(grandparent, copy);

            var grandchildren = grandparent.children;
            assert.equal(2, grandchildren.length);
            assert.equal(2, grandchildren.length);

            assert.notEqual(copy.id, grandparent.id);
            var children = dag.getChildren(copy);
            assert.equal(children[0].type, 'Button');

            done();
        })

        it('copies a tree to a destination', function(done) {
            var dag = new DAG()

            var p0 = {id:0};
            p0.type = 'Div';
            p0.class = 'panel';
            dag.add(p0);

            var p2 = {}
            p2.type = 'Button';
            p2.name = 'Copy Component';
            p2.text = 'Copy Component';
            DAGUtil.addChild(p0, p2);
            dag.add(p2);

            var p6 = {}
            p6.type = 'CopyTree';
            p6.event = 'click';
            DAGUtil.addChild(p2, p6);
            dag.add(p6);

            var parent = dag.getParent(p6);
            var grandparent = dag.getParent(parent);
            var copies = DAGUtil.copyTreeTo(dag, grandparent, grandparent);
            var copy = copies[1];
            dag.addAll(copies);

            parent = dag.getParent(p6);
            var newgrandparent = dag.getParent(parent);

            var grandchildren = newgrandparent.children;
            assert.equal(2, grandchildren.length);
            assert.equal(2, grandchildren.length);

            assert.notEqual(copy.id, newgrandparent.id);
            var children = dag.getChildren(copy);
            assert.equal(children[0].type, 'Button');

            done();
        })

    });

})(COMPOSITE.DAG, COMPOSITE.DAGUtil, uuid, _, chai)
