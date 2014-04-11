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

            var result = objdag.get(testObj.id);
            assert.equal(result, testObj);

            objdag.remove(testObj);
            result = objdag.get(testObj.id);
            assert.isUndefined(result);

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
            var result = objdag.getParent(testObj);
            assert.equal(result, parent);
            done();
        })

        it('handles missing parents', function(done) {
            var objdag = new OBJDAG();
            var testObj = {id: 1, parent: 0, children: []};

            objdag.add(testObj);
            var result = objdag.getParent(parent);
            assert.isUndefined(result);
            done();
        })

        it('retrieves children', function(done) {
            var objdag = new OBJDAG();
            var parent = {id: 0, parent: null, children: [1, 2]};
            var testObj = {id: 1, parent: 0, children: []};
            var testObj2 = {id: 2, parent: 0, children: []};

            objdag.add(parent);
            objdag.add(testObj);
            objdag.add(testObj2);

            var children = objdag.getChildren(parent);
            assert.equal(children.length, 2);
            assert.equal(testObj, children[0]);
            assert.equal(testObj2, children[1]);

            done();

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
