/*
 * (C) 2014 SoftwareCo-oP
 */


require('../src/Server/NodeDeps.js');
require('../src/Test/UnitTest.js');
var RSVP = require('rsvp');
var chai = require('chai');
var assert = chai.assert;

(function() {

    describe('Promise', function() {

        it('resolves properly', function(done) {
            var promise = new RSVP.Promise(function(resolve, reject) {
                resolve(true);
            }).then(function(bool) {
                return false;
            }).then(function(bool2) {
                assert.equal(bool2, false);
                done();
            }).catch(function(error) {
                done(error);
            })

        })

        it('rejects properly', function(done) {
            var promise = new RSVP.Promise(function(resolve, reject) {
                setTimeout(function() {
                    reject(true);
                }, 50);
            }).then(function(bool) {
                return false;
            }).then(function(bool2) {

                done('oops');
            }).catch(function(error) {
                assert.equal(error, true);
                done();
            })

        })

        it('chain rejects properly', function(done) {

            var promise = new RSVP.Promise(function(resolve, reject) {
                return new RSVP.Promise(function(resolve, reject) {
                    setTimeout(function() {
                        reject(true);
                    }, 50);
                }).then(function(bool) {
                    return false;
                }).then(function(bool2) {
                    done('oops');
                }).catch(function(error) {
                    assert.equal(error, true);
                    done();
                })
            }).then(function(bool) {
                return false;
            }).then(function(bool2) {
                assert.equal(bool2, false);
                done('oops');
            }).catch(function(error) {
                done('oops');
            })

        })

        it('chain resolves properly', function(done) {
            var promise = new RSVP.Promise(function(resolve, reject) {
                return new RSVP.Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve(true);
                    }, 50);
                }).then(function(bool) {
                    assert.equal(bool, true);
                    reject(false);
                })
            }).then(function(bool) {
                return false;
            }).then(function(bool2) {
                assert.equal(bool2, false);
                done();
            }).catch(function(error) {

                assert.equal(error, false);
                done();
            })
        })

        it('resolves all promises', function(done) {
            var promise1 = new RSVP.Promise(function(resolve, reject) {
                setTimeout(function() {
                    resolve(true)
                }, 100);

            });

            var promise2 = new RSVP.Promise(function(resolve, reject) {
                setTimeout(function() {
                    resolve(true);
                }, 1500);
            });

            var promise = RSVP.all([promise1, promise2])

            var promise3 = new RSVP.Promise(function(resolve, reject) {
                setTimeout(function() {
                    resolve(true)
                }, 1000);
            });

            RSVP.all([promise, promise3]).then(function(result) {
                done()
            })
        })

    })
})()
