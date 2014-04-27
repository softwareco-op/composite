/*
 * (C) 2014 SoftwareCo-oP
 */

(function() {

    //Are we in the browser?
    if (window !== 'undefined') {
        window.COMPOSITE = {};
        return window.COMPOSITE;
    }

    //Are we in node?
    if (globals !== 'undefined') {
        global.COMPOSITE = {}
        return global.COMPOSITE;
    }

})()
