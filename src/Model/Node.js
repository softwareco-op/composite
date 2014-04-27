/*
 * (C) 2014 SoftwareCo-oP
 */

(function(COMPOSITE, _) {

    function Node(object) {
        _.merge(this, object);
    }

    COMPOSITE.Node = Node;
    return Node;

})(COMPOSITE, _);
