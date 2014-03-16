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

            collection = new NodeCollection([p, c]);
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

            collection = new NodeCollection([p, c]);
            var dag = new DAG(collection);
            var parent = dag.getParent(c);
            assert.equal(parent.get('id'), p.get('id'));
            done();

        })

        it('retrieves children', function(done) {
            var pid = uuid.v1();
            var cid = uuid.v1();
            var p = {id: pid}
            var c = {id: cid,  parent: 1, name: 'child'};

            p = new Node(p);
            c = new Node(c);

            collection = new NodeCollection([p]);

            var dag = new DAG(collection);
            dag.addChild(p, c);

            var children = dag.getChildren(p);
            assert.equal(children.length, 1);

            done();
        });

        it('passes events', function(done) {
            collection = new NodeCollection([]);

            var dag = new DAG(collection);

            dag.collection.on('add', function(event) {
                done();
            });

            p = new Node({id: 1});
            dag.add(p);
        })
    });

});
