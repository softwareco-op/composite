/**
 * (C) 2014 SoftwareCo-oP
 */

/*
 * An object that integrates components into Page(let)
 */
define(
['UI/Page', 'chai', 'sinon', 'underscore', 'localstorage'],
function(Page, chai, sinon, underscore, BackboneLocalStorage) {

    var assert = chai.assert;

    var Node = Backbone.Model.extend({
        sayId: function() {
            console.log(this.get('id'));
        }
    });

    var NodeCollection = Backbone.Collection.extend({
        model: Node,
        localStorage:new BackboneLocalStorage('ViewDAG-test')
    });

    describe('Page', function() {

        it('can add nodes to the page', function(done) {
            var div = document.createElement('div');
            var collection = new NodeCollection();
            var page = new Page(div, document, 0, collection);

            page.install();

            var p0 = new Node({id:0, parent:null, children: []});
            p0.set('type', 'Components/Div');
            p0.set('class', 'panel');
            page.addNode(p0);

            //Should do this asynchronously
            setTimeout(function() {
                assert.equal(div.outerHTML, '<div><div id="0"><div class="panel"></div></div></div>');
                done();
            }, 1000);

        })

        it('can add multiple nodes to the page', function(done) {
            var div = document.createElement('div');
            var collection = new NodeCollection();
            var page = new Page(div, document, 0, collection);

            page.install();

            var p0 = new Node({id:0, parent:null, children: [2]});
            p0.set('type', 'Components/Div');
            p0.set('class', 'panel');
            page.addNode(p0);

            var p2 = new Node({id:2, parent:0, children: []});
            p2.set('type', 'Components/Button');
            p2.set('name', 'Copy Component');
            p2.set('text', 'Copy Component');
            page.getDAG().addChild(p0, p2);

            //Should do this asynchronously
            setTimeout(function() {
                assert.equal(div.outerHTML, '<div><div id="0"><div class="panel"><div id="2"><button name="Copy Component" class="Copy Component">Copy Component</button></div></div></div></div>');
                done();
            }, 1000);

        })

        it('can handle out of order loading', function(done) {
            var div = document.createElement('div');
            var collection = new NodeCollection();
            var page = new Page(div, document, 0, collection);

            page.install();

            var p2 = new Node({id:2, parent:0, children: []});
            p2.set('type', 'Components/Button');
            p2.set('name', 'Copy Component');
            p2.set('text', 'Copy Component');
            page.addNode(p2);

            setTimeout(function() {
                var p0 = new Node({id:0, parent:null, children: []});
                p0.set('type', 'Components/Div');
                p0.set('class', 'panel');
                page.addNode(p0);
                page.getDAG().setChild(p0, p2);
            }, 100);



            //Should do this asynchronously
            setTimeout(function() {
                assert.equal(div.outerHTML, '<div><div id="0"><div class="panel"><div id="2"><button name="Copy Component" class="Copy Component">Copy Component</button></div></div></div></div>');
                done();
            }, 1000);
        });

        it('can handle copy tree operation', function(done) {
            var div = document.createElement('div');
            var collection = new NodeCollection();
            var page = new Page(div, document, 0, collection);

            page.install();

            var p0 = new Node({id:0});
            p0.set('type', 'Components/Div');
            p0.set('class', 'panel');
            page.addNode(p0);

            var p2 = new Node({id:2})
            p2.set('type', 'Components/Button');
            p2.set('name', 'Copy Component');
            p2.set('text', 'Copy Component');
            page.getDAG().addChild(p0, p2);

            var p6 = new Node({id:6})
            p6.set('type', 'Actions/CopyTree');
            p6.set('event', 'click');
            page.getDAG().addChild(p2, p6);

            page.getOBJDAG().get(2).then(function(button) {
                var event = document.createEvent('Event');
                event.initEvent('click', true, true);
                button.button.dispatchEvent(event);
            })

            //Should do this asynchronously
            setTimeout(function() {
                assert.equal(page.getDAG().collection.length, 6);
                assert.equal(div.outerHTML, '<div><div id="0"><div class="panel"><div id="2"><button name="Copy Component" class="Copy Component">Copy Component</button></div></div></div></div>');
                done();
            }, 1000);
        })

    })

})
