/**
* Copyright (C) 2014 TheSoftwareCo-oP
*/



define(['UI/ServerPage', 'UI/Page'],
function(ServerPage, Page) {

    function CompositionContext() {}

    CompositionContext.prototype.run = function(element, document) {

        var page = new Page(element, document, 0);

        var serverPage = new ServerPage(page, 'http://localhost:3000');

        var pipeline = serverPage.install();

        var nodes = page.getNodes();

        nodes.map(function(node) {
            pipeline(node);
        })

    }

    return CompositionContext;

});
