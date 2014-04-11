/*
 * (C) 2014 SoftwareCo-oP
 */


define(
['rsvp', 'chai', 'sinon'],
function(RSVP, chai, sinon) {

    var assert = chai.assert;

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


    })
})
