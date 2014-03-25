//
// Copyright (C) 2014 SoftwareCo-oP
//

define(['Model/ObjectSupplier', 'UI/View', 'underscore'], function(ObjectSupplier, View, _) {

    var objectSupplier = new ObjectSupplier();

    //
    // A simple button.
    // @param {Backbone.Model} model to render
    //
    function Button(model) {
        this.setFields(model)
    }
    _.extend(Button.prototype, View.prototype);

    //
    // Read the attributes required to render the component
    // @param {Backbone.Model} model used to read attributes
    //
    Button.prototype.setFields = function(model) {
        this.name = model.get('name');
        this.text = model.get('text');
        this.action = model.get('click');
        this.promise = objectSupplier.object(model, this.action);
    }

    //
    // Renders the button
    // @param {Backbone.Model} model used to read attributes
    // @param {Document} dom to use for rendering
    // @return {Element} dom element representing the button
    //
    Button.prototype.render = function(model, dom) {
        this.setFields(model);

        this.initialize(dom, function(dom) {
            return dom.createElement('button')
        });

        var self = this;
        this.promise.then(function(action) {
            action.button = self;
            var clickListener = function (clickEvent) { action.perform(model) }
            self.button.name = self.name;
            self.button.className = self.name;
            self.button.textContent = self.textContent;
            self.button.addEventListener('click', function(clickEvent) {
                clickListener(clickEvent);
            });
        });

        return self.wrap;
    }

    return Button;

});
