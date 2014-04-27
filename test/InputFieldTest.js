//
// SoftwareCo-oP (C) 2014
//

//
// Test InputField functionality
//
define(
['Components/InputField', 'UI/Page', 'Model/Node', 'Collection/DAG', 'chai', 'sinon'],
function(InputField, Page, Node, DAG, chai, sinon) {

    var assert = chai.assert;

    describe('InputFieldTest', function() {

        it('renders as expected', function(done) {
            var node = new Node({id: '1', html:{}});
            node.parent = null;
            node.html.tag = 'input';
            node.html.type = 'text';
            node.html.name = 'testName';

            var inputField = new InputField(node);
            var dag = new DAG();
            var element = inputField.render(node, dag, document);
            assert.equal(element.outerHTML, '<input id="1" type="text" name="testName">');
            done();
        })

        it('passes along events', function(done) {
            var div = document.createElement('div');
            var page = new Page(div, document, 0);
            var pipeline = page.install();

            var node = new Node({id: '1', html:{}});
            node.parent = null;
            node.html.tag = 'input';
            node.html.type = 'text';
            node.html.name = 'testName';
            node.value = 'test content';
            node.type = 'InputField';
            node.children = [2];

            var node2 = new Node({id: '2', html:{}});
            node2.parent = 1;
            node2.type = 'StoreValue';
            node2.event = 'onchange';

            var input = pipeline(node);
            var action = pipeline(node2);

            node.value = 'altered';
            var fn = input.object.el.onchange;
            input.object.el.addEventListener('onchange', function(event) {
                fn(event);

                //action.object.perform(node2, page.getDAG());
                var newNode = page.getDAG().get(1);
                assert.equal(newNode.value, 'test content');
                done();
            })

            var event = document.createEvent('Event');
            event.initEvent('onchange', true, true);
            input.object.el.dispatchEvent(event);

        })

    })

})
