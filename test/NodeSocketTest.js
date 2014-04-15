/*
 * (C) 2014 SoftwareCo-oP
 */

define(
['Server/NodeSocket', 'chai', 'sinon'],
function(NodeSocket, events, chai, sinon) {

    var assert = chai.assert;

    describe('NodeSocketTest', function() {

        it('can connect to the server', function(done) {
            var eventSocket = new NodeSocket('http://localhost:3000');
            eventSocket.add('{id:1}');
            done();
        })

    })

})
