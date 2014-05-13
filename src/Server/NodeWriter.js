/*
 * (C) 2014 SoftwareCo-oP
 */

(function(COMPOSITE, fs) {

    function NodeWriter(node) {
        this.path = node.path;
        this.writeStream = fs.createWriteStream(this.path);
    }
    COMPOSITE.NodeWriter = NodeWriter;

    NodeWriter.prototype.add = function(node) {
        this.writeStream
    }

    return NodeWriter;

})(COMPOSITE, fs)
