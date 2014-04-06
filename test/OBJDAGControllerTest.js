//
// SoftwareCo-oP (C) 2014
//


//
// Tests OBJDAG functionality
//
define(
['Collection/OBJDAG', 'Collection/OBJDAGController', 'Model/ObjectSupplier', 'Composition/Global', 'Collection/DAG', 'node-uuid', 'rsvp', 'localstorage', 'backbone', 'chai', 'sinon'],
function(OBJDAG, OBJDAGController, ObjectSupplier, Global, DAG, uuid, RSVP, BackboneLocalStorage, Backbone, chai, sinon) {

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

    describe('OBJDAGController', function() {
        it('listens for changes to node children', function(done) {
            var collection = new NodeCollection();
            var dag = new DAG(collection);
            var objectSupplier = new ObjectSupplier();
            var objdag = new OBJDAG();
            var objDagController = new OBJDAGController(objectSupplier, objdag, document);
            objDagController.manage(collection);

            var p0 = new Node({id:0});
            p0.set('type', 'Components/Button');
            p0.set('name', 'test');
            p0.set('text', 'test');
            dag.add(p0);

            var p1 = new Node({id:1});
            p1.set('type', 'Actions/GlobalAction');
            p1.set('event', 'click');

            dag.addChild(p0, p1);
            done();
        })

        it('integrates with ObjectSupplier', function(done) {
            var collection = new NodeCollection();
            var dag = new DAG(collection);
            var objectSupplier = new ObjectSupplier();
            var objdag = new OBJDAG();
            var objDagController = new OBJDAGController(objectSupplier, objdag, document);
            objDagController.manage(collection);

            var p0 = new Node({id:0, parent: null});
            p0.set('type', 'Components/Button');
            p0.set('name', 'test');
            p0.set('text', 'test');
            p0.set('children', [1]);

            var p1 = new Node({id:1, parent: 0, children:[]});
            p1.set('type', 'Actions/GlobalAction');
            p1.set('event', 'click');

            Global.action = {
                perform : function() {
                    if (this.called === undefined) {
                        done();
                    }
                    this.called = true;
                },
                onadd : function(action, model, objdag, dag) {
                    //simulate a click on the button
                    var event = document.createEvent('Event');
                    event.initEvent('click', true, true);
                    objdag.get(model.get('id')).then(function(object) {
                        return objdag.getParent(object);
                    }).then(function(parent) {
                        parent.button.dispatchEvent(event);
                    });
                }
            }
            dag.add(p0);
            dag.add(p1);
        });

    })


});
