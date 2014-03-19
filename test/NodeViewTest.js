/**
* Copyright (C) 2014 TheSoftwareCo-oP
*/


/**
 * Tests NodeView functionality.
 **/
define(
['UI/NodeView', 'Model/ObjectSupplier', 'Composition/Global', 'UI/View', 'Collection/DAG', 'node-uuid', 'rsvp', 'localstorage', 'backbone', 'chai', 'sinon'],
function(NodeView, ObjectSupplier, Global, View, DAG, uuid, RSVP, BackboneLocalStorage, Backbone, chai, sinon) {

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

        it('integrates with ObjectSupplier', function(done) {
            var testDiv = document.getElementById('testdiv');

            var collection = new NodeCollection();
            var dag = new DAG(collection);
            var objectSupplier = new ObjectSupplier();

            var viewDAG = new NodeView(0, objectSupplier, dag, testDiv, document);

            var p = new Node({id:1});

            p.set('type', 'Components/Button');
            p.set('name', 'Hello World');
            p.set('text', 'Hello World');
            p.set('action', 'Actions/GlobalAction');

            Global.action = function() { done() };

            dag.add(p);

        })
    })

});
