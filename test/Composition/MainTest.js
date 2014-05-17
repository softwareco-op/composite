/*
 * (C) 2014 SoftwareCo-oP
 */

require('../../src/Server/NodeDeps.js');
require('../../src/Test/UnitTest.js');
var chai = require('chai');
var assert = chai.assert;

(function(Main) {
    describe('Main', function() {

        it('performs a request', function(done) {
            var main = new Main();
            main.perform();
            done();
        })

    })
})(COMPOSITE.Main)
