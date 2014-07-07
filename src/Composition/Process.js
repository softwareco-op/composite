/*
 * (C) 2014 SoftwareCo-oP
 */

(function(COMPOSITE) {

    //Load our dependencies
    var util = require('util');
    var events = require('events');
    var RSVP = require('rsvp');

    /*
     * Manages process events.  Typically exiting the process once all
     * areas of the program have shutdown gracefully.
     */
    COMPOSITE.Process = new events.EventEmitter();

    COMPOSITE.Process.onExit = function() {
        console.log('everything shutdown...exiting');
        process.exit();
    }

    COMPOSITE.Process.onSigInt = function() {
        COMPOSITE.Process.onSignal();
    }

    COMPOSITE.Process.onSignal = function() {
        var toShutdown = []

        var processFn = function (shutdownProcess) {
            toShutdown.push(shutdownProcess)
        }

        this.emit('exit', processFn);

        var promise = RSVP.all(toShutdown).then(
            COMPOSITE.Process.onExit()
        ).catch(function(error) {
            console.log(error);
        });

        toShutdown = [];

        return promise;
    }

    process.on('SIGINT', COMPOSITE.Process.onSigInt);

})(COMPOSITE)
