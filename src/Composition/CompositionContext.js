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

    // Nodes exist in a Backbone collection
    var NodeCollection = Backbone.Collection.extend({
        backend: 'mybackend',

        model: Node,
        //localStorage:new BackboneLocalStorage('ViewDAG-test')

        initialize: function() {
            var self = this;
            this.bind('create', function(model) {
                console.log('create');
            });
            this.bind('add', function(model) {
                console.log('add');
            });
            this.bind('update', function(model) {
                console.log('update');
            });
            this.bind('backend:create', function(model) {
                console.log('got create');
                self.add(model);
            });
            this.bind('backend:add', function(model) {
                console.log('backend:add');
                self.add(model);
            });
            this.bind('backend:update', function(model) {
                console.log('backend:update');
                var colModel = self.get(model.id);
                if (colModel !== undefined) {
                    console.log(JSON.stringify(colModel));
                    colModel.set(model);
                    console.log(JSON.stringify(colModel));
                } else {
                    self.set(model);
                }
            });
            this.bind('backend:delete', function(model) {
                console.log('backend:delete');
                self.remove(model.id);
            });
            this.bind('backend', function(model, other) {
                console.log('backend event');
            });
        }
    });

    function CompositionContext() {}

    CompositionContext.prototype.run = function(element, document) {

        Backbone.io.connect();

        var collection = new NodeCollection();

        var page = new Page(element, document, 0, collection);

        page.install();

        page.addNodes();

    }

    return CompositionContext;

});
