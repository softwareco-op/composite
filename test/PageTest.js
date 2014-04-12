/**
 * (C) 2014 SoftwareCo-oP
 */

/*
 * An object that integrates components into Page(let)
 */
define(
['UI/Page', 'chai', 'sinon', 'underscore', 'localstorage', 'rsvp'],
function(Page, chai, sinon, underscore, BackboneLocalStorage, RSVP) {

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

    var LocalCollection = Backbone.Collection.extend({
        model: Node,
        localStorage:new BackboneLocalStorage('composite-local')
    });

    describe('Page', function() {
/*
        it('can add nodes to the page', function(done) {
            var div = document.createElement('div');
            var collection = new NodeCollection();
            var localCollection = new LocalCollection();
            var page = new Page(div, document, 0, collection, localCollection);

            page.install();

            var p0 = new Node({id:0, parent:null, children: []});
            p0.set('type', 'Components/Div');
            p0.set('class', 'panel');
            page.addNode(p0).then(function(node0) {
                assert.equal(div.outerHTML, '<div><div id="0"><div class="panel"></div></div></div>');
                done();
            }).catch(function(error) {
                done(error);
            })
        })
*/
        it('can detect duplicates', function(done) {
            var div = document.createElement('div');
            var rcollection = new NodeCollection();
            var collection = new LocalCollection();
            var page = new Page(div, document, 0, collection);

            page.install();

            var p0 = new Node({id: 0});
            p0.set('type', 'Components/Div');
            p0.set('class', 'panel2');
            page.getDAG().add(p0);

            page.setRootNodeID(p0.get('id'));

            var p2 = new Node({id: 2});
            p2.set('type', 'Components/Button');
            p2.set('name', 'Copy Component');
            p2.set('text', 'CC');
            page.getDAG().addChild(p0, p2);

            page.addNode(p0);
            page.addNode(p2);

            var expected = '<div><div id="{id1}"><div class="panel2"><div id="{id2}"><button name="Copy Component">Copy Component</button></div></div></div></div>';
            expected = expected.replace(/{id1}/g, p0.get('id'));
            expected = expected.replace(/{id2}/g, p2.get('id'));

            var outerHTML = div.outerHTML;


            console.log(expected);
            console.log(outerHTML);
            assert.equal(div.outerHTML, expected);
            done();
        })
/*
        it('can add multiple nodes to the page', function(done) {
            var div = document.createElement('div');
            var collection = new NodeCollection();
            var localCollection = new LocalCollection();
            var page = new Page(div, document, 0, collection);

            page.install();

            var p0 = new Node({id:0});
            p0.set('type', 'Components/Div');
            p0.set('class', 'panel');
            page.getDAG().add(p0);

            var p2 = new Node({id:2});
            p2.set('type', 'Components/Button');
            p2.set('name', 'Copy Component');
            p2.set('text', 'Copy Component');
            page.getDAG().addChild(p0, p2);

            RSVP.all([page.addNode(p0),page.addNode(p2)]).then(function(components) {
                assert.equal(div.outerHTML, '<div><div id="0"><div class="panel"><div id="2"><button name="Copy Component">Copy Component</button></div></div></div></div>');
                done();
            }).catch(function(error) {
                done(error);
            });
        })

        it('can handle out of order loading', function(done) {
            var div = document.createElement('div');
            var collection = new NodeCollection();
            var localCollection = new LocalCollection();
            var page = new Page(div, document, 0, collection);

            page.install();

            var p2 = new Node({id:2, parent:0, children: []});
            p2.set('type', 'Components/Button');
            p2.set('name', 'Copy Component');
            p2.set('text', 'Copy Component');
            page.getDAG().add(p2);
            var promise1 = page.addNode(p2);
            setTimeout(function() {
                var p0 = new Node({id:0, parent:null, children: []});
                p0.set('type', 'Components/Div');
                p0.set('class', 'panel');
                page.getDAG().add(p0);
                page.getDAG().setChild(p0, p2);
                var promise2 = page.addNode(p0);
                RSVP.all([promise1,promise2]).then(function(children) {
                    assert.equal(div.outerHTML, '<div><div id="0"><div class="panel"><div id="2"><button name="Copy Component">Copy Component</button></div></div></div></div>');
                    done();
                }).catch(function(error) {
                    done(error);
                });
            }, 85);

        });

        it('can handle copy tree operation', function(done) {
            var div = document.createElement('div');
            //var div = document.getElementById('testdiv');
            var collection = new NodeCollection();
            var localCollection = new LocalCollection();
            var page = new Page(div, document, 0, collection);


            page.install();

            var p0 = new Node({id:0});
            p0.set('type', 'Components/Div');
            p0.set('class', 'panel');
            page.getDAG().add(p0);


            var p2 = new Node({id:2})
            p2.set('type', 'Components/Button');
            p2.set('name', 'Copy Component');
            p2.set('text', 'Copy Component');
            page.getDAG().addChild(p0, p2);

            var p6 = new Node({id:6})
            p6.set('type', 'Actions/CopyTree');
            p6.set('event', 'click');
            page.getDAG().addChild(p2, p6);

            RSVP.all([page.addNode(p0), page.addNode(p2), page.addNode(p6)]).then(function(components) {
                var button = components[1];
                var action = components[2];
                action.perform();
                //var event = document.createEvent('Event');
                //event.initEvent('click', true, true);
                //button.button.dispatchEvent(event);
            });

            //Should do this asynchronously
            setTimeout(function() {
                assert.equal(div.outerHTML, '<div><div id="0"><div class="panel"><div id="2"><button name="Copy Component">Copy Component</button></div></div></div></div>');
                assert.equal(page.getDAG().collection.length, 6);
                done();
            }, 600);
       })
*/

    })

})
