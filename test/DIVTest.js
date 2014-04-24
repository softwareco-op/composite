/*
 * (C) 2014 SoftwareCo-oP
 */

define(
['Components/Div', 'Collection/DAG', 'Model/Node', 'chai', 'sinon'],
function(Div, DAG, Node, chai, sinon) {

    var assert = chai.assert;

    describe('DivTest', function() {
        it('renders an empty div', function(done) {
            var node = new Node({id: '0', html:{}});
            node.parent = null;
            node.html['class'] = 'test';
            node.html.tag = 'div';

            var div = new Div(node);
            div.id = 0;
            div.parent = null;
            div.children = [];

            var dag = new DAG();
            dag.add(div);

            var element = div.render(node, dag, document);
            var expected = '<div id="0" class="test"></div>';
            assert.equal(element.outerHTML, expected);
            done();

        })

        it('renders children', function(done) {
            var dag = new DAG();
            var node = new Node({id: '0', html: {}});
            node.parent =  null;
            node.html['class'] = 'test';
            node.html.tag = 'div';
            node.children = [1]

            node.object = new Div(node)
            dag.add(node);

            var node2 = new Node({id: '1', html: {}});
            node2.parent =  null;
            node2.html['class'] = 'test2';
            node2.html.tag = 'div';

            node2.object = new Div(node2);
            dag.add(node2);

            node.object.render(node, dag, document);
            node2.object.render(node2, dag, document);
            node.object.update(node, dag, document);

            var expected = '<div id="0" class="test"><div id="1" class="test2"></div></div>';
            assert.equal(node.object.el.outerHTML, expected);
            done();
        });

    })
})
