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
            var page = new Page(div, document, collection);

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

    })

})
