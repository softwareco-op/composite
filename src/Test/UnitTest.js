(function() {

    if (COMPOSITE.mochaTest) {
        return;
    }

    var RSVP = require('rsvp');

    COMPOSITE.UnitTest = new RSVP.Promise(function(resolve, reject) {
        resolve(true);
    });

    global.describe = function(name, fn) {
        console.log(name);
        console.log('===========');
        fn();
    }

    global.it = function(clause, fn) {

        //should wait till last test is done before performing
        try {
            COMPOSITE.UnitTest.then(function() {
                console.log(clause);
                console.log('-----------');

                var timeout = function() {
                    console.log('timed out!');
                }

                var timeoutId = setTimeout(timeout, 2000);

                var done = function(error) {
                    clearTimeout(timeoutId);
                    if (error === undefined) {
                        console.log('passed');
                        console.log('');
                        return true;
                    } else {
                        console.log(error);
                        console.log('failed');
                        console.log('');
                        return false;
                    }
                }

                fn(done);
            }).catch(function(error) {
                console.log(error);
            })
        } catch (error) {
            console.log(error);
        }
    }

})()
