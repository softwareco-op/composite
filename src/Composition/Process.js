/*
 * (C) 2014 SoftwareCo-oP
 */

(function(COMPOSITE) {

    //Load our dependencies
    var util = require('util');
    var events = require('events');
    var RSVP = require('rsvp');

    COMPOSITE.Process = new events.EventEmitter();

    //Before we get interrupted, close resources
    process.on('SIGINT', function() {
        var toShutdown = []

        var processFn = function (shutdownProcess) {
            toShutdown.push(shutdownProcess)
        }
        COMPOSITE.Process.emit('exit', processFn);

        RSVP.all(toShutdown).then(function() {
            console.log('everything shutdown...exiting');
            process.exit();
        })

    })

})(COMPOSITE)
