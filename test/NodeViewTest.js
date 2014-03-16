/**
* Copyright (C) 2014 TheSoftwareCo-oP
*/


/**
 * Tests NodeView functionality.
 **/
define(
['UI/NodeView', 'UI/View', 'Collection/DAG', 'node-uuid', 'localstorage', 'backbone', 'chai', 'sinon'],
function(NodeView, View, DAG, uuid, BackboneLocalStorage, Backbone, chai, sinon) {

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

    describe('NodeView', function() {
        it('calls render when an model is added to the DAG', function(done) {

            var testDiv = document.getElementById('testdiv');

            var collection = new NodeCollection();
            var dag = new DAG(collection);


            var viewSupplier = sinon.spy();

            var viewDAG = new NodeView(0, viewSupplier, dag, document);

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
