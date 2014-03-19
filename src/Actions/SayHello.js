/**
* Copyright (C) 2014 TheSoftwareCo-oP
*/


/**
 * Says hello via an alert message.
 **/
define(
[],
function() {

    function SayHello(model) {

    }

    SayHello.prototype.perform = function() {
        alert("Hello World");
    }

    return SayHello;

});
