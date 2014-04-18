//
// SoftwareCo-oP (C) 2014
//

//
// Test InputField functionality
//
define(
['Components/InputField', 'Model/Node', 'Collection/DAG', 'chai', 'sinon'],
function(InputField, Node, DAG, chai, sinon) {

    var assert = chai.assert;

    describe('InputFieldTest', function() {

        it('renders as expected', function(done) {
            var node = new Node({
                id: '1',
                parent: null,
                name: 'testName',
                fieldType: 'text',
                value: 'test content',
                clazz: 'testClass'
            });
            var inputField = new InputField(node);
            var dag = new DAG();
            var element = inputField.render(node, dag, document);
            assert.equal(element.outerHTML, '<div id="1" class="testClass"><input type="text" name="testName"></div>');
            done();
        })

    })

})
