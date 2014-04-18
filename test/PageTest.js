/**
 * (C) 2014 SoftwareCo-oP
 */

/*
 * An object that integrates components into Page(let)
 */
define(
['Model/Node', 'UI/Page', 'chai', 'sinon', 'underscore'],
function(Node, Page, chai, sinon, underscore) {

    var assert = chai.assert;

    describe('Page', function() {

        it('can add nodes to the page', function(done) {
            var div = document.createElement('div');
            var page = new Page(div, document, 0);

            var pipeline = page.install();

            var p0 = new Node({id:0})
            p0.type = 'Components/Div';
            p0.clazz = 'panel';

            pipeline(p0);

            assert.equal(div.outerHTML, '<div><div id="0" class="panel"><div></div></div></div>');

            done();
        })

        it('can detect duplicates', function(done) {
            var div = document.createElement('div');

            var page = new Page(div, document, 0);

            var pipeline = page.install();

            var p0 = new Node({id: 0});
            p0.type = 'Components/Div';
            p0.clazz = 'panel2';

            var p2 = new Node({id: 2});
            p2.type = 'Components/Button';
            p2.name = 'Copy Component';
            p2.text = 'Copy Component';
            p2.clazz = 'button';
            page.getDAG().addChild(p0, p2);

            page.setRootNodeID(p0.id);
            pipeline(p0);
            pipeline(p2);
            try {
                pipeline(p2);
            } catch (error) {
                console.log(error.message);
            }

            var expected = '<div><div id="{id1}" class="panel2"><div><div id="{id2}" class="button"><button name="Copy Component">Copy Component</button></div></div></div></div>';
            expected = expected.replace(/{id1}/g, p0.id);
            expected = expected.replace(/{id2}/g, p2.id);

            var outerHTML = div.outerHTML;

            assert.equal(div.outerHTML, expected);
            done();
        })

        it('can add multiple nodes to the page', function(done) {
            var div = document.createElement('div');
            var page = new Page(div, document, 0);

            var pipeline = page.install();

            var p0 = new Node({id:0});
            p0.type = 'Components/Div';
            p0.clazz = 'panel';

            var p2 = new Node({id:2});
            p2.type = 'Components/Button';
            p2.name = 'Copy Component';
            p2.text = 'Copy Component';
            p2.clazz = 'button';
            page.getDAG().addChild(p0, p2);

            page.setRootNodeID(p0.id);
            pipeline(p0);
            pipeline(p2);

            assert.equal(div.outerHTML, '<div><div id="0" class="panel"><div><div id="2" class="button"><button name="Copy Component">Copy Component</button></div></div></div></div>');
            done();
        })

        it('can handle out of order loading', function(done) {
            var div = document.createElement('div');
            var page = new Page(div, document, 0);

            var pipeline = page.install();

            var p2 = new Node({id:2});
            p2.type = 'Components/Button';
            p2.name = 'Copy Component';
            p2.text = 'Copy Component';
            p2.clazz = 'button';
            pipeline(p2);


            var p0 = new Node({id:0, parent:null, children: []});
            p0.type = 'Components/Div';
            p0.clazz = 'panel';
            page.getDAG().setChild(p0, p2);
            pipeline(p0);

            assert.equal(div.outerHTML, '<div><div id="0" class="panel"><div><div id="2" class="button"><button name="Copy Component">Copy Component</button></div></div></div></div>');
            done();
        });

        it('can handle copy tree operation', function(done) {
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


            pipeline(p0)
            var button = pipeline(p2);
            var action = pipeline(p6);

            action.object.perform(page.getDAG(), action);
            var grandparent = page.getDAG().get(p0.id);
            var copiedChild = page.getDAG().getChildren(grandparent)[1];
            var copiedGrandchild = page.getDAG().getChildren(copiedChild)[0];

            //var event = document.createEvent('Event');
            //event.initEvent('click', true, true);
            //button.object.button.dispatchEvent(event);

            var expected = '<div><div id="0" class="panel"><div><div id="2" class="button"><button name="Copy Component">Copy Component</button></div><div id="{id1}" class="panel"><div><div id="{id2}" class="button"><button name="Copy Component">Copy Component</button></div></div></div></div></div></div>'
            expected = expected.replace(/{id1}/g, copiedChild.id);
            expected = expected.replace(/{id2}/g, copiedGrandchild.id);
            assert.equal(div.outerHTML, expected);
            assert.equal(page.getDAG().size(), 6);
            done();
       })

    })

})
