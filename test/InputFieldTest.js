//
// SoftwareCo-oP (C) 2014
//

//
// Test InputField functionality
//
define(
['Components/InputField', 'Collection/OBJDAG', 'rsvp', 'backbone', 'chai', 'sinon'],
function(InputField, OBJDAG, RSVP, Backbone, chai, sinon) {

    var assert = chai.assert;

    var Node = Backbone.Model.extend({});

    describe('InputFieldTest', function() {

        it('renders as expected', function(done) {
            var model = new Node({
                id: '1',
                parent: null,
                name: 'testName',
                fieldType: 'text',
                value: 'test content'
            });
            var inputField = new InputField(model);
            var objdag = new OBJDAG();
            var element = inputField.render(model, objdag, document);
            assert.equal(element.outerHTML, '<div id="1"><input type="text" name="testName"></div>');
            done();
        })

    })

})
