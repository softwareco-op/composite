/**
* Copyright (C) 2014 TheSoftwareCo-oP
*/



define(['UI/Page',
        'backbone.io',
        'localstorage',
        'backbone'],
function(Page,
         Backboneio,
         BackboneLocalStorage,
         Backbone) {


    function CompositionContext() {}

    CompositionContext.prototype.run = function(element, document) {

        Backbone.io.connect();

        var page = new Page(element, document, 0);

        page.install();

        page.addNodes();

    }

    return CompositionContext;

});
