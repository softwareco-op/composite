/*
 * (C) 2014 SoftwareCo-oP
 */

define(
['Actions/Reorder', 'Components/Image', 'Model/Node', 'UI/Page', 'chai', 'sinon'],
function(Reorder, Image, Node, Page, chai, sinon) {

    var assert = chai.assert;

    describe('Reorder', function() {

        it('reorders a list', function(done) {
            var reorderChild = new Reorder();
            var list = [1, 2, 3, 4, 5];

            reorderChild.move(list, 2, -1);
            assert.equal(list[0], 2);

            reorderChild.move(list, 2, -1);
            assert.equal(list[0], 2);

            reorderChild.move(list, 2, -1);
            assert.equal(list[0], 2);

            reorderChild.move(list, 4, 1);
            assert.equal(list[4], 4);

            var result = reorderChild.move(list, 4, 1);
            assert.equal(list[4], 4);
            assert.equal(result, -2);


            done();
        })

        it('reorders nodes', function(done) {
            var div = document.createElement('div');
            var page = new Page(div, document, 0);
            var pipeline = page.install();

            var p0 = new Node({id:0, html:{'class': 'panel'}})
            p0.type = 'Div';
            p0.html.tag = 'div';

            var p2 = new Node({id: 2, html:{'class': 'button'}});
            p2.type = 'Button';
            p2.html.name = 'Copy Component';
            p2.html.tag = 'button';
            page.getDAG().addChild(p0, p2);

            var p6 = new Node({id:6})
            p6.type = 'CopyTree';
            p6.event = 'click';
            page.getDAG().addChild(p2, p6);

            var p7 = new Node({id: 7, html:{'class': 'button'}});
            p7.type = 'Button';
            p7.html.name = 'Copy Component';
            p7.html.tag = 'button';
            page.getDAG().addChild(p0, p7);

            var p8 = new Node({id:8})
            p8.type = 'Reorder';
            p8.event = 'click';
            p8.amount = -1;
            page.getDAG().addChild(p7, p8);

            pipeline(p0);
            pipeline(p2);
            pipeline(p6);
            pipeline(p7);
            var action = pipeline(p8);

            action.object.perform(action, page.getDAG());

            console.log(div.outerHTML);
            done();

        })

        it('installs to an image', function(done) {
            var div = document.createElement('div');
            var page = new Page(div, document, 0);
            var pipeline = page.install();

            var node = new Node({id:0, html:{'class':'img'}});
            node.type = 'Image';
            node.html.src = 'icons/uparrow.png';
            node.html.alt = 'Testing';
            node.html.width = '100';
            node.html.height = '100';

            var p8 = new Node({id:8})
            p8.type = 'Reorder';
            p8.event = 'onmouseup';
            p8.amount = -1;
            page.getDAG().addChild(node, p8);

            var image = pipeline(node);
            var action = pipeline(p8);


            var fn = image.object.el.onmouseup;
            image.object.el.addEventListener('onmouseup', function(event) {
                fn(event);
                //action.object.perform(action, page.getDAG());
                console.log(div.outerHTML);
                done();
            })

            var event = document.createEvent('Event');
            event.initEvent('onmouseup', true, true);
            image.object.el.dispatchEvent(event);
        })

    })

})
