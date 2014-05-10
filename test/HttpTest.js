/*
 * (C) 2014 SoftwareCo-oP
 */

var http = require('http').Server;

(function(chai, sinon) {

    var assert = chai.assert;

    describe('Http', function() {

        it('can bind and release a port', function(done) {
            var server = http();
            server.listen(3000);
            console.log(server);
            server.close();


            var server2 = http();
            server2.listen(3000);
            server2.close();

            done();
        })

    })

})(chai, sinon)
