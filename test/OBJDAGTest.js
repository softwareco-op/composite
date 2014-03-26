//
// SoftwareCo-oP (C) 2014
//


//
// Tests OBJDAG functionality
//
define(
['Collection/OBJDAG', 'Model/ObjectSupplier', 'Composition/Global', 'Collection/DAG', 'node-uuid', 'rsvp', 'localstorage', 'backbone', 'chai', 'sinon'],
function(OBJDAG, ObjectSupplier, Global, DAG, uuid, RSVP, BackboneLocalStorage, Backbone, chai, sinon) {

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

    describe('OBJDAG', function() {
        it('gets and sets objects', function(done) {
            var collection = new NodeCollection();
            var dag = new DAG(collection);
            var objectSupplier = new ObjectSupplier();
            var objdag = new OBJDAG(objectSupplier, dag);
            var testObj = {id: 1, parent: 0};
            objdag.setObject(testObj);
            var result = objdag.getObject(testObj.id);
            assert.equal(result, testObj);

            objdag.deleteObject(testObj);
            result = objdag.getObject(testObj.id);
            assert.equal(result, undefined);

            var badObj = {}

            try {
                objdag.setObject(badObj);
            } catch (error) {
                done();
            }
        });

        it('retrieves parents', function(done) {
            var collection = new NodeCollection();
            var dag = new DAG(collection);
            var objectSupplier = new ObjectSupplier();
            var objdag = new OBJDAG(objectSupplier, dag);
            var parent = {id: 0, parent: null};
            var testObj = {id: 1, parent: 0};

            objdag.setObject(parent);
            objdag.setObject(testObj);
            var result = objdag.getParent(testObj);
            assert.equal(result, parent);
            result = objdag.getParent(parent);
            assert.equal(result, null);

            done();
        })

        it('retrieves children', function(done) {
            var collection = new NodeCollection();
            var dag = new DAG(collection);
            var objectSupplier = new ObjectSupplier();
            var objdag = new OBJDAG(objectSupplier, dag);
            var parent = {id: 0, parent: null};
            var testObj = {id: 1, parent: 0};
            var testObj2 = {id: 2, parent: 0};

            objdag.setObject(parent);
            objdag.setObject(testObj);
            objdag.setObject(testObj2);
            var result = objdag.getChildren(parent);
            assert.equal(result.length, 2);
            assert.equal(testObj, result[0]);
            assert.equal(testObj2, result[1]);

            done();
        })

        it('integrates with ObjectSupplier', function(done) {
            var collection = new NodeCollection();
            var dag = new DAG(collection);
            var objectSupplier = new ObjectSupplier();
            var objdag = new OBJDAG(objectSupplier, dag, document);

            var p0 = new Node({id:0, parent: null});
            p0.set('type', 'Components/Button');
            p0.set('name', 'test');
            p0.set('text', 'test');

            var p1 = new Node({id:1, parent: 0});
            p1.set('type', 'Actions/GlobalAction');

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
                    var parent = objdag.getParent(objdag.getObject(model.get('id')));
                    parent.button.dispatchEvent(event);
                }
            }
            dag.add(p0);
            dag.add(p1);
        });

    })

});
