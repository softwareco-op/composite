/**
* Copyright (C) 2014 TheSoftwareCo-oP
*/


/**
 * DAG is directed acyclic graph on a backbone collection.
 **/
define(['UI/ViewDAG', 'UI/View', 'Collection/DAG', 'node-uuid', 'localstorage', 'backbone', 'chai'], function(ViewDAG, View, DAG, uuid, BackboneLocalStorage, Backbone, chai) {

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
        it('calls render when an model is added to the DAG', function(done) {

            var testDiv = document.getElementById('testdiv');

            var collection = new NodeCollection();
            var dag = new DAG(collection);

            var viewDAG = new ViewDAG(dag, document);

            var p = new Node({id:1});
            var view = new View(function() {done()});

            viewDAG.add(p, view);


            //p.set('name', 'parent');
            //p.set('view', 'File/URLView');

            //var c = new Node({id:2});
            //dag.addChild(p, c);
            //done();

        });
    })

});
