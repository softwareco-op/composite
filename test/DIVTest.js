/*
 * (C) 2014 SoftwareCo-oP
 */

define(
['Components/Div', 'Collection/DAG', 'Model/Node', 'chai', 'sinon'],
function(Div, DAG, Node, chai, sinon) {

    var assert = chai.assert;

    describe('DivTest', function() {
        it('renders an empty div', function(done) {
            var node = new Node({
                id: '0',
                parent: null,
                clazz: 'test',
            });

            var div = new Div(node);
            div.id = 0;
            div.parent = null;
            div.children = [];

            var dag = new DAG();
            dag.add(div);

            var element = div.render(node, dag, document);
            var expected = '<div></div>';
            assert.equal(element.outerHTML, expected);
            done();

        })

        it('renders children', function(done) {
            var dag = new DAG();
            var node = new Node({
                id: '0',
                parent: null,
                clazz: 'test',
                children: [1]
            });


            node.object = new Div(node)
            dag.add(node);

            var node2 = new Node({
                id: '1',
                parent: null,
                clazz: 'test2',
            });

            node2.object = new Div(node2);
            dag.add(node2);

            node.object.render(node, dag, document);
            node2.object.render(node2, dag, document);

            var expected = '<div id="0" class="test"><div><div id="1" class="test2"><div></div></div></div></div>';
            assert.equal(node.object.getWrap(document).outerHTML, expected);
            done();
        });

    })
})
