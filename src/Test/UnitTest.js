(function() {

    global.describe = function(name, fn) {
        console.log(name);
        console.log('-----');
        fn();
    }

    global.it = function(clause, fn) {
        console.log(clause);
        console.log('-');

        var timeout = function() {
            console.log('timed out!');
        }

        var timeoutId = setTimeout(timeout, 2000);

        var done = function(error) {
            clearTimeout(timeoutId);
            if (error === undefined) {
                console.log('passed');
            } else {
                console.log(error);
                console.log('failed');
            }
        }

        //should wait till last test is done before performing
        fn(done);
    }

})()
