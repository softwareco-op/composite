/**
* Copyright (C) 2014 TheSoftwareCo-oP
*/


/**
 * DAG is directed acyclic graph on a backbone collection.
 **/
define(['src/Collection/DAG', 'backbone', 'underscore', 'chai'], function(DAG, Backbone, _, chai) {

    var expect = chai.expect;
    var assert = chai.assert;

    describe('DAG', function() {
        it('retrieves children', function(done) {
            var Node = Backbone.Model.extend({
                sayId: function() {
                    console.log(this.get('id'));
                }
            });
            var p = {id: 1};
            var c = {id: 2,  parent: 1, name: 'child'};

            var collection = [p, c];
            var  results = _.where(collection, {id: 2});
            assert.equal(results.length, 1);

            p = new Node(p);
            c = new Node(c);

            var NodeCollection = Backbone.Collection.extend({
                model: Node
            });

            collection = new NodeCollection([p, c]);
            var dag = new DAG(collection);
            var children = dag.getChildren(p);
            assert.equal(children.length, 1);

            done();
        });
    });

});
