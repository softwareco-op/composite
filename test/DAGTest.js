/**
* Copyright (C) 2014 TheSoftwareCo-oP
*/


/**
 * DAG is directed acyclic graph.
 **/

(function(DAG, Node, uuid, _, chai) {

    var expect = chai.expect;
    var assert = chai.assert;


    describe('DAG', function() {
        it('stores nodes', function(done) {
            var pid = uuid.v1();
            var cid = uuid.v1();

            var p = new Node(p);
            var c = new Node(c);

            var dag = new DAG();

            var floating = new Node(1);
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
            var n = new Node();
            var dag = new DAG();
            dag.add(n);
            assert.isTrue(dag.exists(n));
            dag.remove(n);
            assert.isFalse(dag.exists(n));
            done();
        })

        it('unlinks children', function(done) {
            var n = new Node();
            var c = new Node();
            var dag = new DAG();
            dag.add(n);
            var nc = dag.addChild(n, c);
            dag.add(c);

            var children = dag.getChildren(n);
            assert.deepEqual(nc, children[0]);
            dag.unlinkChildren(n);
            children = dag.getChildren(n);
            assert.isTrue(children.length === 0);
            done();
        })

        it('retrieves parent', function(done) {

            var p = {id: 1}
            var c = {id: 2,  parent: 1, name: 'child'};

            p = new Node(p);
            c = new Node(c);
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
            p = new Node(p);
            c = new Node(c);
            c2 = new Node(c2);

            var dag = new DAG();
            dag.addChild(p, c);
            dag.addChild(p, c2);

            var children = dag.getChildren(p);
            assert.equal(children.length, 2);
            assert.equal(p.children.length, 2);
            assert.equal(p.children[0], cid);
            assert.equal(p.children[1], cid2);

            done();
        });

        it('copies nodes', function(done) {
            var dag = new DAG();
            var node = new Node({id: 1, parent: 2});
            var copy = dag.copy(node);

            assert.notEqual(node, copy);
            assert.equal(node.parent, copy.parent);
            assert.notEqual(node.id, copy.id);

            done();
        })

        it('copies trees', function(done) {
            var dag = new DAG();
            var parent = new Node({id: 1});
            var child = new Node({id: 2, color: 'blue'});
            dag.add(parent);
            dag.addChild(parent, child);
            dag.add(child);

            var copies = dag.copyTree(parent);
            dag.addAll(copies);

            var parentCopy = dag.get(copies[0].id);
            var childCopy = dag.getChildren(parentCopy)[0];

            assert.notEqual(child.parent, childCopy.parent);
            assert.equal(parentCopy.id, childCopy.parent);
            assert.equal(child.color, childCopy.color);

            done();
        })

        it('creates valid edges between nodes', function(done) {
            var dag = new DAG();
            var parent = new Node();
            var child = new Node({color: 'blue'});
            dag.add(parent);
            dag.addChild(parent, child);
            dag.add(child);

            var copies = dag.copyTree(parent);
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

            var p0 = new Node({id:0});
            p0.type = 'Div';
            p0.class = 'panel';
            dag.add(p0);

            var p2 = new Node();
            p2.type = 'Button';
            p2.name = 'Copy Component';
            p2.text = 'Copy Component';
            dag.addChild(p0, p2);
            dag.add(p2);

            var p6 = new Node();
            p6.type = 'CopyTree';
            p6.event = 'click';
            dag.addChild(p2, p6);
            dag.add(p6);

            var parent = dag.getParent(p6);
            var grandparent = dag.getParent(parent);
            var copies = dag.copyTree(grandparent);
            dag.addAll(copies);
            var copy = copies[0];
            dag.setChild(grandparent, copy);

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

            var p0 = new Node({id:0});
            p0.type = 'Div';
            p0.class = 'panel';
            dag.add(p0);

            var p2 = new Node();
            p2.type = 'Button';
            p2.name = 'Copy Component';
            p2.text = 'Copy Component';
            dag.addChild(p0, p2);
            dag.add(p2);

            var p6 = new Node();
            p6.type = 'CopyTree';
            p6.event = 'click';
            dag.addChild(p2, p6);
            dag.add(p6);

            var parent = dag.getParent(p6);
            var grandparent = dag.getParent(parent);
            var copies = dag.copyTreeTo(grandparent, grandparent);
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

})(COMPOSITE.DAG, COMPOSITE.Node, uuid, _, chai)
