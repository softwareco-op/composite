/**
* Copyright (C) 2014 TheSoftwareCo-oP
*/


(function(COMPOSITE, Pipeline, DAGUtil) {

    function Main() {}
    COMPOSITE.Main = Main;

    Main.prototype.perform = function() {
        /*
         * 1. Create pipeline
         * 2. Connect pipeline to server
         * 3. Send request node
         */
        var webPage = Pipeline.webPage();

        var clientSocket = this.getTypedNode(webPage, 'ClientSocket');

        var request = {'verb' : 'get', 'subtree' : 'ballotBox'}

        clientSocket.object.socket.onopen = function() {
            webPage.bin.mux.add(request);
        }

        var OPEN = 1;
        if (clientSocket.object.socket.readyState === OPEN) {
            webPage.bin.mux.add(request);
        }
    }

    Main.prototype.getTypedNode = function(pipeline, typeName) {
        var predicate = function (node) { if (node.type === typeName) { return true; } else { return false; } }
        var matching = DAGUtil.searchSubTree(pipeline.bin.dag, pipeline, predicate, 50);
        return matching[0];
    }

    return Main;

})(COMPOSITE, COMPOSITE.Pipeline, COMPOSITE.DAGUtil);
