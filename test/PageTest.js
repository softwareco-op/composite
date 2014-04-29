/**
 * (C) 2014 SoftwareCo-oP
 */

/*
 * An object that integrates components into Page(let)
 */
(function(Node, Page, chai, sinon) {

    var assert = chai.assert;

    var panel = function(pipeline, dag, id) {
        var p0 = new Node({id:id, html:{}})
        p0.type = 'HtmlNode';
        p0.html['class'] = 'panel';
        p0.html.tag = 'div';
        if (pipeline) {p0 = pipeline(p0)}

        var p1 = new Node();
        p1.type = 'DisplayChildren';
        p1.event = 'onrender';
        dag.addChild(p0, p1);
        if (pipeline) {p1 = pipeline(p1)}

        return p0;
    }

    var button = function(pipeline, dag, parent, id) {
        var p2 = new Node({id: id, html:{}});
        p2.type = 'HtmlNode';
        p2.html['class'] = 'button';
        p2.html.name = 'Copy Component';
        p2.html.tag = 'button';
        dag.addChild(parent, p2);
        if (pipeline) {p2 = pipeline(p2)}

        return p2;
    }

    describe('Page', function() {

        it('can add nodes to the page', function(done) {
            var div = document.createElement('div');
            var page = new Page(div, document, 0);

            var pipeline = page.install();

            var p0 = new Node({id:0, html:{}})
            p0.type = 'HtmlNode';
            p0.html['class'] = 'panel';
            p0.html.tag = 'div';


            pipeline(p0);


            assert.equal(div.outerHTML, '<div><div id="0" class="panel"></div></div>');

            done();
        })

        it('can detect duplicates', function(done) {
            var div = document.createElement('div');

            var page = new Page(div, document, 0);
            var pipeline = page.install();
            var dag = page.getDAG();

            var p0 = panel(pipeline, dag, 0);
            var p2 = button(pipeline, dag, p0, 2);

            try {
                pipeline(p2);
            } catch (error) {
                console.log(error.message);
            }

            var expected = '<div><div id="{id1}" class="panel"><button id="2" class="button" name="Copy Component"></button></div></div>';
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
            var dag = page.getDAG();

            var p0 = panel(pipeline, dag, 0);
            var p2 = button(pipeline, dag, p0, 2);

            assert.equal(div.outerHTML, '<div><div id="0" class="panel"><button id="2" class="button" name="Copy Component"></button></div></div>');
            done();
        })

        it('can handle out of order loading', function(done) {
            var div = document.createElement('div');
            var page = new Page(div, document, 0);
            var pipeline = page.install();
            var dag = page.getDAG();

            var p0 = panel(null, dag, 0);
            var p2 = button(null, dag, p0, 2);

            pipeline(p2);
            pipeline(p0);

            assert.equal(div.outerHTML, '<div><div id="0" class="panel"><button id="2" class="button" name="Copy Component"></button></div></div>');
            done();
        });

        it('can handle copy tree operation', function(done) {
            var div = document.createElement('div');
            var page = new Page(div, document, 0);

            var pipeline = page.install();

            var p0 = new Node({id:0, html:{}});
            p0.type = 'HtmlNode';
            p0.html['class'] = 'panel';
            p0.html.tag = 'div';

            var node = new Node({id:2, html:{}});
            node.type = 'HtmlNode';
            node.html.tag = 'img';
            node.html.src = 'icons/uparrow.png';
            node.html.alt = 'Testing';
            node.html.width = '100';
            node.html.height = '100';
            page.getDAG().addChild(p0, node);

            var p6 = new Node({id:6})
            p6.type = 'CopyTree';
            p6.event = 'onmouseup';
            page.getDAG().addChild(node, p6);

            pipeline(p0)
            var image = pipeline(node);
            var action = pipeline(p6);

            var fn = image.object.el.onmouseup;
            image.object.el.addEventListener('onmouseup', function(event) {
                fn(event);

                var grandparent = page.getDAG().get(p0.id);
                var copiedChild = page.getDAG().getChildren(grandparent)[1];
                var copiedGrandchild = page.getDAG().getChildren(copiedChild)[0];

                var expected = '<div><div id="0" class="panel"><img id="2" src="icons/uparrow.png" alt="Testing" width="100" height="100"><div id="{id1}" class="panel"><img id="{id2}" src="icons/uparrow.png" alt="Testing" width="100" height="100"></div></div></div>';

                expected = expected.replace(/{id1}/g, copiedChild.id);
                expected = expected.replace(/{id2}/g, copiedGrandchild.id);
                console.log(div.outerHTML);
                assert.equal(div.outerHTML, expected);
                assert.equal(page.getDAG().size(), 6);
                done();
            })

            var event = document.createEvent('Event');
            event.initEvent('onmouseup', true, true);
            image.object.el.dispatchEvent(event);

       })

    })

})(COMPOSITE.Node, COMPOSITE.Page, chai, sinon)
