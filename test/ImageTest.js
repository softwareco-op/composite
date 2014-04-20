/*
 * (C) 2014 SoftwareCo-oP
 */

define(
['Components/Image', 'Model/Node', 'chai', 'sinon'],
function(Image, Node, chai, sinon) {

    var assert = chai.assert;

    describe('Image', function() {

        it('should render a proper html tag', function(done) {
            var node = new Node({id:1});
            node.src = 'icons/uparrow.png';
            node.alt = 'Testing';

            var image = new Image(node);
            var imageElement = image.render(node, null, document);

            assert.equal(imageElement.outerHTML, '<img src="icons/uparrow.png" alt="Testing">');

            done();
        })

    })

})
