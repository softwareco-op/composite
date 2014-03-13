/**
* Copyright (C) 2014 TheSoftwareCo-oP
*/


/**
 * DAG is directed acyclic graph on a backbone collection.
 **/
define(['UI/ViewDAG', 'Collection/DAG', 'node-uuid', 'localstorage', 'backbone', 'chai'], function(ViewDAG, DAG, uuid, BackboneLocalStorage, Backbone, chai) {

    var assert = chai.assert;

    var Node = Backbone.Model.extend({
        sayId: function() {
            console.log(this.get('id'));
        }
    });


    var NodeCollection = Backbone.Collection.extend({
        model: Node,
        localStorage:new BackboneLocalStorage('ViewDAG-test')
    });

    describe('ViewDAG', function() {
        it('maintains volatile objects', function(done) {

            var testDiv = document.getElementById('testdiv');

            var dag = new DAG(new NodeCollection());

            var viewDAG = new ViewDAG(dag);
            var p = new Node({id:1});
            viewDAG.add(p, {dom: testDiv});
            p.set('name', 'parent');
            p.set('view', 'File/URLView');
            var c = new Node({id:2});
            dag.addChild(p, c);
            done();
        });
    })

});
