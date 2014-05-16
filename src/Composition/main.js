/**
* Copyright (C) 2014 TheSoftwareCo-oP
*/


(function(Pipeline) {

    /*
     * 1. Create pipeline
     * 2. Connect pipeline to server
     * 3. Send request node
     */
    var webPage = Pipeline.webPage();

    var request = {'verb' : 'get', 'subtree' : 0}

    webPage.bin.mux.add(request);

})(COMPOSITE.Pipeline);
