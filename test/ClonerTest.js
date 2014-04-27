/*
 * (C) 2014 SoftwareCo-oP
 */

(function(Cloner, Button, _, chai, sinon) {

    var assert = chai.assert;

    describe('Cloner', function() {

        it('it clones objects', function(done) {
            var cloner = new Cloner();
            var button = new Button({name: 'testButton', text: 'Hello'});

            var clone = cloner.clone(button);
            var clone2 = _.clone(button);

            assert.equal(clone.name, clone2.name);
            assert.equal(clone.text, clone2.text);

            done();
        })

        it('json clone is performant?', function(done) {
            var cloner = new Cloner();
            var button = new Button({name: 'testButton', text: 'Hello'});

            var clone = cloner.clone(button);
            for (var i = 0 ; i < 100000 ; i++) {
                clone = cloner.jsonClone(button);
            }
            var clone2 = _.clone(button);

            assert.equal(clone.name, clone2.name);
            assert.equal(clone.text, clone2.text);

            done();
        })

        it('deep clone is performant?', function(done) {
            var cloner = new Cloner();
            var button = new Button({name: 'testButton', text: 'Hello'});

            var clone = cloner.clone(button);
            for (var i = 0 ; i < 100000 ; i++) {
                clone = cloner.deepClone(button);
            }
            var clone2 = _.clone(button);

            assert.equal(clone.name, clone2.name);
            assert.equal(clone.text, clone2.text);

            done();
        })

        it('deepClone works as expected', function(done) {
            var cloner = new Cloner();
            var button = new Button({name: 'testButton', text: 'Hello'});
            button.nest = [1,2,3]
            var clone = cloner.clone(button);
            var clone2 = cloner.clone(clone);

            assert.equal(clone.name, button.name);
            assert.equal(clone.text, button.text);

            assert(_.isEqual(clone, clone2), 'ought to be deep equal');
            clone.nest[0] = 0;
            assert(!_.isEqual(clone, clone2), 'ought not be deep equal');
            assert.equal(clone.nest[0], 0);
            assert.equal(clone2.nest[0], 1);
            clone.nest[0] = 1;
            assert(_.isEqual(clone, clone2), 'ought to be deep equal');
            done();
        })

    })

})(COMPOSITE.Cloner, COMPOSITE.Button, lodash, chai, sinon)
