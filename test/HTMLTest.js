/*
 * (C) 2014 SoftwareCo-oP
 */

define(
['UI/HTML', 'Model/Node', 'chai', 'sinon'],
function(HTML, Node, chai, sinon) {

    var assert = chai.assert;

    describe('HTML', function() {

        it('converts nodes to tag nodes', function(done) {
            var node = new Node();
            node.id = 'testId';
            node['class'] = 'myclass';
            node.tag = 'img';
            node.object = {text: 'this is transient'};
            node.parent = 1;

            var tagNode = HTML.nodeToTagNode(node);
            assert.equal(tagNode.tag, 'img');
            assert.isUndefined(tagNode.object);
            assert.isUndefined(tagNode.parent);
            assert.equal(tagNode.id, 'testId');
            assert.equal(tagNode['class'], 'myclass');

            done();
        })

        it('converts tag nodes to html elements', function(done) {
            var node = new Node();
            node.id = 'testId';
            node['class'] = 'myclass';
            node.tag = 'img';
            node.object = {text: 'this is transient'};

            var tagNode = HTML.nodeToTagNode(node);
            var el = HTML.tagNodeToElement(tagNode, document);

            assert.equal(el.getAttribute('class'), 'myclass');
            assert.equal(el.getAttribute('id'), 'testId');

            done();
        })

        it('converts a node to html element', function(done) {
            var node = new Node();
            node.id = 'testId';
            node['class'] = 'myclass';
            node.tag = 'img';
            node.object = {text: 'this is transient'};

            var el = HTML.nodeToElement(node, document);

            assert.equal(el.getAttribute('class'), 'myclass');
            assert.equal(el.getAttribute('id'), 'testId');

            done();
        })

    })

})
