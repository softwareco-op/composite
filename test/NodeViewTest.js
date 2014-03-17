/**
* Copyright (C) 2014 TheSoftwareCo-oP
*/


/**
 * Tests NodeView functionality.
 **/
define(
['UI/NodeView', 'Model/ObjectSupplier', 'UI/View', 'Collection/DAG', 'node-uuid', 'rsvp', 'localstorage', 'backbone', 'chai', 'sinon'],
function(NodeView, ObjectSupplier, View, DAG, uuid, RSVP, BackboneLocalStorage, Backbone, chai, sinon) {

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


            var view = new View(function() {done()});

            var promise = new RSVP.Promise(function(resolve, reject) {
                resolve(view);
            });

            var viewSupplier = {object: function() {return promise}};

            var viewDAG = new NodeView(0, viewSupplier, dag, testDiv, document);

            var p = new Node({id:1});
            dag.add(p);

            //p.set('name', 'parent');
            //p.set('view', 'File/URLView');

            //var c = new Node({id:2});
            //dag.addChild(p, c);
            //done();

        });


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
            p.set('action', 'Actions/SayHello');

            dag.add(p);
            done();
        })
    })

});
