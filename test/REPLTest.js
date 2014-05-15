/*
 * (C) 2014 SoftwareCo-oP
 */


require('../src/Test/UnitTest');

var chai = require('chai');
var assert = chai.assert;

describe('REPL', function() {

    it('it evals', function(done) {
        console.log('calling done');
        done();
    })

    it('times out', function(done) {
        console.log('not calling done');
    })

})
