/*
 * (C) 2014 SoftwareCo-oP
 */

define(
['socketioclient', 'chai', 'sinon'],
function(socketio, events, chai, sinon) {

    var assert = chai.assert;

    describe('HttpServerTest', function() {

        it('can connect to the server', function(done) {
            var socket = socketio.connect('http://localhost:3000');
            socket.emit('node', '{id:0}');
            done();

        })

    })

})
