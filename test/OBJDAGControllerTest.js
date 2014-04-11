//
// SoftwareCo-oP (C) 2014
//


//
// Tests OBJDAG functionality
//
define(
['Model/Hasher', 'Collection/OBJDAG', 'Collection/OBJDAGController', 'Model/ObjectSupplier', 'Composition/Global', 'Collection/DAG', 'node-uuid', 'rsvp', 'localstorage', 'backbone', 'chai', 'sinon'],
function(Hasher, OBJDAG, OBJDAGController, ObjectSupplier, Global, DAG, uuid, RSVP, BackboneLocalStorage, Backbone, chai, sinon) {

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

        it('can add objects to an objdag', function(done) {
            var collection = new NodeCollection();
            var dag = new DAG(collection);
            var objectSupplier = new ObjectSupplier();
            var objdag = new OBJDAG();
            var hasher = new Hasher("SHA-256");
            var objDagController = new OBJDAGController(objectSupplier, objdag, dag, hasher, document);

            var p0 = new Node({id:0, parent:null, children:[]});
            p0.set('type', 'Components/Button');
            p0.set('name', 'test');
            p0.set('text', 'test');

            objDagController.add(p0).then(function(button) {
                assert.equal(button.getWrap(document).outerHTML,'<div id="0"><button name="test">test</button></div>');
                done();
            }).catch(function(error) {
                done(error);
            });
        })

        it('can detect duplicate additions', function(done) {
            var collection = new NodeCollection();
            var dag = new DAG(collection);
            var objectSupplier = new ObjectSupplier();
            var objdag = new OBJDAG();
            var hasher = new Hasher("SHA-256");
            var objDagController = new OBJDAGController(objectSupplier, objdag, dag, hasher, document);

            var p0 = new Node({id:0, parent:null, children:[]});
            p0.set('type', 'Components/Button');
            p0.set('name', 'test');
            p0.set('text', 'test');

            dag.add(p0);

            objDagController.add(p0).then(function(button) {
                return this;
            }).catch(function(error) {
                done(error);
            }).then(function(button) {
                return objDagController.add(p0);
            }).then(function(button) {
                assert.equal(button.getWrap(document).outerHTML,
                              '<div id="0"><button name="test">test</button></div>');
                done();
            })

        })

        it('can update object', function(done) {
            var collection = new NodeCollection();
            var dag = new DAG(collection);
            var objectSupplier = new ObjectSupplier();
            var objdag = new OBJDAG();
            var hasher = new Hasher("SHA-256");
            var objDagController = new OBJDAGController(objectSupplier, objdag, dag, hasher, document);

            var p0 = new Node({id:0, parent:null, children:[]});
            p0.set('type', 'Components/Button');
            p0.set('name', 'test');
            p0.set('text', 'test');

            var p1 = new Node({id:0, parent:null, children:[]});
            p1.set('type', 'Components/Button');
            p1.set('name', 'test2');
            p1.set('text', 'test2');


            objDagController.add(p0).then(function(button) {
                assert.equal(button.getWrap(document).outerHTML,
                              '<div id="0"><button name="test">test</button></div>');
                return objDagController.update(p1);
            }).then(function(button) {
                assert.equal(button.getWrap(document).outerHTML,
                              '<div id="0"><button name="test2">test2</button></div>');
                done();
            }).catch(function(error) {
                done(error);
            });
        })

        it('integrates with ObjectSupplier', function(done) {
            var collection = new NodeCollection();
            var dag = new DAG(collection);
            var objectSupplier = new ObjectSupplier();
            var objdag = new OBJDAG();
            var hasher = new Hasher("SHA-256");
            var objDagController = new OBJDAGController(objectSupplier, objdag, dag, hasher, document);
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
