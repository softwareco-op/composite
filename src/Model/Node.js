/*
 * (C) 2014 SoftwareCo-oP
 */

define(
['lodash'],
function(_) {

    function Node(object) {
        _.merge(this, object);
    }

    return Node;

});
