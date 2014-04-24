/*
 * (C) 2014 SoftwareCo-oP
 */

define(
['Components/Image', 'Model/Node', 'chai', 'sinon'],
function(Image, Node, chai, sinon) {

    var assert = chai.assert;

    describe('Image', function() {

        it('should render a proper html tag', function(done) {
            var node = new Node({id:1, html:{}});
            node.html.tag = 'img';
            node.html.src = 'icons/uparrow.png';
            node.html.alt = 'Testing';
            node.html.width = '100';
            node.html.height = '100';

            var image = new Image(node);
            var imageElement = image.render(node, null, document);

            assert.equal(imageElement.outerHTML, '<img id="1" src="icons/uparrow.png" alt="Testing" width="100" height="100">');

            done();
        })

    })

})
