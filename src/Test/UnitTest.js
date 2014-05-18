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

        var done = function() {
            clearTimeout(timeoutId);
            console.log('passed');
        }

        //should wait till last test is done before performing
        fn(done);
    }

})()
