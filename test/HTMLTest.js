/*
 * (C) 2014 SoftwareCo-oP
 */

(function(HTML, chai, sinon) {

    var assert = chai.assert;

    describe('HTML', function() {

        it('converts tag nodes to html elements', function(done) {
            var node = {html:{}};
            node.parent = 1;
            node.id = 'testId';
            node.html['class'] = 'myclass';
            node.html.tag = 'img';
            node.html.object = {text: 'this is transient'};

            var el = HTML.toElement(node, document);

            assert.equal(el.getAttribute('class'), 'myclass');
            assert.equal(el.getAttribute('id'), 'testId');

            done();
        })

        it('converts a node to html element', function(done) {
            var node = {html:{}};
            node.parent = 1;
            node.id = 'testId';
            node.html['class'] = 'myclass';
            node.html.tag = 'img';
            node.html.object = {text: 'this is transient'};

            var el = HTML.nodeToElement(node, document);

            assert.equal(el.getAttribute('class'), 'myclass');
            assert.equal(el.getAttribute('id'), 'testId');

            done();
        })

    })

})(COMPOSITE.HTML, chai, sinon)
