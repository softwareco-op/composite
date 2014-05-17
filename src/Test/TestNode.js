/*
 * (C) 2014 SoftwareCo-oP
 */

(function(COMPOSITE) {

    function TestNode(node) {
        this.testFunction = node.testFunction;
    }
    COMPOSITE.TestNode = TestNode;

    TestNode.prototype.add = function(node) {
        this.testFunction(node);
    }

    return TestNode;

})(COMPOSITE)
