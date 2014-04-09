/**
* Copyright (C) 2014 TheSoftwareCo-oP
*/


/**
 * DAG is directed acyclic graph on a backbone collection.
 **/
define(['Collection/DAG', 'node-uuid', 'localstorage', 'backbone', 'underscore', 'chai'], function(DAG, uuid,  BackboneLocalStorage,Backbone, _, chai) {

    var expect = chai.expect;
    var assert = chai.assert;

    var Node = Backbone.Model.extend({
        sayId: function() {
            console.log(this.get('id'));
        }
    });


    var NodeCollection = Backbone.Collection.extend({
        model: Node,
        localStorage:new BackboneLocalStorage('DAG-test')
    });

    describe('DAG', function() {
        it('stores nodes', function(done) {
            var pid = uuid.v1();
            var cid = uuid.v1();

            var p = new Node(p);
            var c = new Node(c);

            var collection = new NodeCollection([p, c]);
            var dag = new DAG(collection);

            var floating = new Node({id: 1});
            assert.equal(dag.exists(floating), false);
            assert.equal(dag.exists(p), true);
            assert.equal(dag.exists(c), true);
            dag.add(floating);
            assert.equal(dag.exists(floating), true);

            done();
        })

        it('retrieves parent', function(done) {

            var p = {id: 1}
            var c = {id: 2,  parent: 1, name: 'child'};

            p = new Node(p);
            c = new Node(c);

            var collection = new NodeCollection([p, c]);
            var dag = new DAG(collection);
            var parent = dag.getParent(c);
            assert.equal(parent.get('id'), p.get('id'));
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

            var collection = new NodeCollection([p]);

            var dag = new DAG(collection);
            dag.addChild(p, c);
            dag.addChild(p, c2);

            var children = dag.getChildren(p);
            assert.equal(children.length, 2);
            assert.equal(p.get('children').length, 2);
            assert.equal(p.get('children')[0], cid);
            assert.equal(p.get('children')[1], cid2);

            done();
        });

        it('passes events', function(done) {
            var collection = new NodeCollection([]);

            var dag = new DAG(collection);

            dag.collection.on('add', function(event) {
                done();
            });

            p = new Node({id: 1});
            dag.add(p);
        })

        it('copies nodes', function(done) {
            var collection = new NodeCollection([]);

            var dag = new DAG(collection);
            var node = new Node({id: 1, parent: 2});
            var copy = dag.copy(node);

            assert.notEqual(node, copy);
            assert.equal(node.get('parent'), copy.get('parent'));
            assert.notEqual(node.get('id'), copy.get('id'));

            done();
        })

        it('copies trees', function(done) {
            var collection = new NodeCollection([]);

            var dag = new DAG(collection);
            var parent = new Node({id: 1});
            var child = new Node({id: 2, parent: 1, color: 'blue'});
            dag.add(parent);
            dag.add(child);

            var parentCopy = dag.copyTree(parent);
            var childCopy = dag.getChildren(parentCopy)[0];

            assert.notEqual(child.get('parent'), childCopy.get('parent'));
            assert.equal(parentCopy.get('id'), childCopy.get('parent'));
            assert.equal(child.get('color'), childCopy.get('color'));

            done();
        })

        it('creates valid edges between nodes', function(done) {
            var collection = new NodeCollection([]);

            var dag = new DAG(collection);
            var parent = new Node();
            var child = new Node({color: 'blue'});
            dag.add(parent);
            dag.addChild(parent, child);

            var parentCopy = dag.copyTree(parent);
            var childCopy = dag.getChildren(parentCopy)[0];

            assert.isNull(parent.get('parent'));
            assert.notEqual(child.get('parent'), childCopy.get('parent'));
            assert.equal(parentCopy.get('id'), childCopy.get('parent'));
            assert.equal(child.get('color'), childCopy.get('color'));

            done();
        })

        it('copies a tree and adds branches properly', function(done) {
            var collection = new NodeCollection([]);

            var dag = new DAG(collection);

            var p0 = new Node({id:0});
            p0.set('type', 'Components/Div');
            p0.set('class', 'panel');
            dag.add(p0);

            var p2 = new Node();
            p2.set('type', 'Components/Button');
            p2.set('name', 'Copy Component');
            p2.set('text', 'Copy Component');
            dag.addChild(p0, p2);

            var p6 = new Node();
            p6.set('type', 'Actions/CopyTree');
            p6.set('event', 'click');
            dag.addChild(p2, p6);

            var parent = dag.getParent(p6);
            var grandparent = dag.getParent(parent);
            var copy = dag.copyTree(grandparent);
            dag.setChild(grandparent, copy);

            var grandchildren = grandparent.get('children');
            assert.equal(2, grandchildren.length);
            assert.equal(2, grandchildren.length);

            assert.notEqual(copy.get('id'), grandparent.get('id'));
            var children = dag.getChildren(copy);
            assert.equal(children[0].get('type'), 'Components/Button');

            done();

        })

    });

});
