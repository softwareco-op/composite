/**
* Copyright (C) 2014 TheSoftwareCo-oP
*/


(function(COMPOSITE, Pipeline) {

    function Main() {}
    COMPOSITE.Main = Main;

    Main.prototype.perform = function() {
        /*
         * 1. Create pipeline
         * 2. Connect pipeline to server
         * 3. Send request node
         */
            var webPage = Pipeline.webPage();

            var request = {'verb' : 'get', 'subtree' : 0}

            webPage.bin.mux.add(request);
    }

    return Main;

})(COMPOSITE, COMPOSITE.Pipeline);
