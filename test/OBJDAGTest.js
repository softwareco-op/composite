//
// SoftwareCo-oP (C) 2014
//


//
// Tests OBJDAG functionality
//
define(
['Collection/OBJDAG', 'Collection/OBJDAGController', 'Model/ObjectSupplier', 'Composition/Global', 'Collection/DAG', 'node-uuid', 'rsvp', 'localstorage', 'backbone', 'chai', 'sinon', 'underscore'],
function(OBJDAG, OBJDAGController, ObjectSupplier, Global, DAG, uuid, RSVP, BackboneLocalStorage, Backbone, chai, sinon, underscore) {

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
            var objdag = new OBJDAG();
            var testObj = {id: 1, parent: 0, children: []};
            objdag.add(testObj);

            var testResult = function(expected) {
                return function(result) {
                    assert.equal(result, expected);
                }
            }

            objdag.get(testObj.id).then(function(object) {
                assert.equal(object, testObj);
            }).then(function(object) {
                objdag.remove(testObj);
                return objdag.get(testObj.id, 1500);
            }).catch(function(error) {
                assert.equal(error, testObj.id);
            }).then(function(object) {
                throw 'We should not have succeeded'
            })

            var badObj = {}

            try {
                objdag.add(badObj);
            } catch (error) {
                done();
            }

        });

        it('retrieves valid parents', function(done) {
            var objdag = new OBJDAG();
            var parent = {id: 0, parent: null, children: [1]};
            var testObj = {id: 1, parent: 0, children: []};

            objdag.add(parent);
            objdag.add(testObj);
            objdag.getParent(testObj, 100).then(function(result) {
                assert.equal(result, parent);
                done();
            });

        })

        it('handles missing parents', function(done) {
            var objdag = new OBJDAG();
            var parent = {id: 0, parent: null, children: [1]};
            var testObj = {id: 1, parent: 0, children: []};

            objdag.add(parent);
            objdag.add(testObj);
            objdag.getParent(parent).then(function(result) {
                throw 'Should not succeed here';
            }).catch(function(error) {
                assert.equal(error, 'timed out waiting for object with id ' + parent.parent);
                done();
            });
        })

        it('retrieves children', function(done) {
            var objdag = new OBJDAG();
            var parent = {id: 0, parent: null, children: [1, 2]};
            var testObj = {id: 1, parent: 0, children: []};
            var testObj2 = {id: 2, parent: 0, children: []};

            objdag.add(parent);
            objdag.add(testObj);
            objdag.add(testObj2);

            objdag.getChildren(parent).then(function(children) {
                assert.equal(children.length, 2);
                assert.equal(testObj, children[0]);
                assert.equal(testObj2, children[1]);

                done();
            }).catch(function(error) {
                console.log(error);
            });
        })

        it('triggers add event', function(done) {
            var objdag = new OBJDAG();

            objdag.on('add', function(object) {
                done();
            });

            var parent = {id: 0, parent: null, children: []};

            objdag.add(parent);
        })

        it('triggers remove event', function(done) {
            var objdag = new OBJDAG();

            objdag.on('remove', function(object) {
                done();
            });

            var parent = {id: 0, parent: null, children: []};

            objdag.add(parent);
            objdag.remove(parent);
        })

    })

});
