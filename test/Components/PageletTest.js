/*
 * (C) 2014 SoftwareCo-oP
 */

(function(Pagelet, ObjectSupplier, chai, sinon) {

    var assert = chai.assert;

    describe('Pagelet', function() {

        it('renders the root node', function(done) {
            var options = {
                divName : 'testdiv',
                root : '0'
            }

            var pagelet = new Pagelet(options);

            var root = {
                id : '0',
                type : 'HtmlNode',
                html : {
                    tag : 'input',
                    type : 'button',
                    value : 'hello world'
                }
            }

            var objectSupplier = new ObjectSupplier();
            objectSupplier.add(root);
            root.object.render(root);

            pagelet.add(root);
            var div = document.getElementById('testdiv');
            assert.equal(div.children.length, 1);

            done();
        })

    })

})(COMPOSITE.Pagelet, COMPOSITE.ObjectSupplier, chai, sinon)
