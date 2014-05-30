/*
 * (C) 2014 SoftwareCo-oP
 */

(function(Pipeline, chai, sinon) {

    var assert = chai.assert;

    describe('HtmlNode', function() {

        it('can be added to a page', function(done) {
            var pipeline = Pipeline.DAGNotify();

            var pagelet = {
                type : 'Pagelet',
                divName : 'parentChildTest',
                root : '0'
            }

            Pipeline.append(pagelet, pipeline);

            var root = {
                id : '0',
                children : ['1'],
                type : 'HtmlNode',
                html : {
                    tag : 'div',
                }
            }

            var button = {
                id : '1',
                parent : '0',
                type : 'HtmlNode',
                html : {
                    tag : 'input',
                    type : 'button',
                    value : 'hello world'
                }
            }

            pipeline.bin.mux.add(root);
            pipeline.bin.mux.add(button);
            var div = document.getElementById('parentChildTest');
            assert.equal(div.children.length, 1);

            done();
        })

    })

})(COMPOSITE.Pipeline, chai, sinon)
