/*
 * (C) 2014 SoftwareCo-oP
 */

define(
['Components/Div', 'Collection/OBJDAG', 'rsvp', 'backbone', 'chai', 'sinon'],
function(Div, OBJDAG, RSVP, Backbone, chai, sinon) {

    var assert = chai.assert;

    var Node = Backbone.Model.extend({});

    describe('DivTest', function() {
        it('renders an empty div', function(done) {
            var model = new Node({
                id: '0',
                parent: null,
                class: 'test',
            });

            var objdag = new OBJDAG();

            var div = new Div(model, objdag);
            div.id = 0;
            div.parent = null;
            div.children = [];


            objdag.add(div);

            var element = div.render(model, document);
            var expected = '<div class="test"></div>';
            assert.equal(element.outerHTML, expected);
            done();

        })

        it('renders children', function(done) {
            var model = new Node({
                id: '0',
                parent: null,
                class: 'test',
            });
            var objdag = new OBJDAG();

            var div = new Div(model, objdag);
            div.id = 0;
            div.parent = null;
            div.children = [1];
            objdag.add(div);

            var model2 = new Node({
                id: '1',
                parent: null,
                class: 'test2',
            });

            var div2 = new Div(model2, objdag);
            div2.id = 1;
            div2.parent = 0;
            div2.children = [];
            objdag.add(div2);


            var p1 = div.render(model, document);
            var p2 = div2.render(model2, document);

            RSVP.all([p1, p2]).then(function(divs) {
                var expected = '<div id="0"><div class="test"><div id="1"><div class="test2"></div></div></div></div>';
                assert.equal(div.getWrap(document).outerHTML, expected);
                done();
            }).catch(function(error) {
                console.log(error);
            });

        });

    })
})
