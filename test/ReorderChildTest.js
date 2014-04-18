/*
 * (C) 2014 SoftwareCo-oP
 */

define(
['Actions/Reorder', 'Model/Node', 'UI/Page', 'chai', 'sinon'],
function(Reorder, Node, Page, chai, sinon) {

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

            var p0 = new Node({id:0});
            p0.type = 'Components/Div';
            p0.clazz = 'panel';


            var p2 = new Node({id:2})
            p2.type = 'Components/Button';
            p2.name = 'Copy Component';
            p2.text = 'Copy Component';
            p2.clazz = 'button';
            page.getDAG().addChild(p0, p2);


            var p6 = new Node({id:6})
            p6.type = 'Actions/CopyTree';
            p6.event = 'click';
            page.getDAG().addChild(p2, p6);

            var p7 = new Node({id:7})
            p7.type = 'Components/Button';
            p7.name = 'Move';
            p7.text = 'Move';
            p7.clazz = 'button';
            page.getDAG().addChild(p0, p7);

            var p8 = new Node({id:8})
            p8.type = 'Actions/Reorder';
            p8.event = 'click';
            p8.amount = -1;
            page.getDAG().addChild(p7, p8);

            pipeline(p0);
            pipeline(p2);
            pipeline(p6);
            pipeline(p7);
            var action = pipeline(p8);

            action.object.perform(page.getDAG(), action);

            console.log(div.outerHTML);
            done();

        })

    })

})
