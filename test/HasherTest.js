/*
 * (C) 2014 SoftwareCo-oP
 */



(function(Node, Hasher, chai, sinon) {

    var assert = chai.assert;

    describe('Hasher', function() {

        it('can hash a string', function(done) {

            var hasher = new Hasher("SHA-256");

            var hash = hasher.hash('test string');

            assert.equal(hash, 'd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b');

            done();
        });

        it('can hash a model', function(done) {

            var node = new Node({name: 'a test field name'});

            var hasher = new Hasher("SHA-256");

            var hash = hasher.hashNode(node);

            assert.equal(hash, 'd0118393a0efab15de4f0bd99264ddbe53a3c0a87e3c5025a46027d8e3717d7c');

            done();
        });
    });

})(COMPOSITE.Node, COMPOSITE.Hasher, chai, sinon)
