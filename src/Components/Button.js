//
// Copyright (C) 2014 SoftwareCo-oP
//

define(['Model/ObjectSupplier', 'UI/View', 'underscore'], function(ObjectSupplier, View, _) {

    //
    // A simple button.
    //
    // @constructor
    // @param {Backbone.Model} model to render
    //
    function Button(model) {
        this.setFields(model)
    }
    _.extend(Button.prototype, View.prototype);

    //
    // Read the attributes required to render the component
    //
    // @param {Backbone.Model} model used to read attributes
    //
    Button.prototype.setFields = function(model) {
        this.name = model.name;
        this.text = model.text;
    }

    //
    // Renders the button
    //
    // @param {Backbone.Model} model used to read attributes
    // @param {Document} dom to use for rendering
    // @return {Element} dom element representing the button
    //
    Button.prototype.render = function(model, dom) {
        this.setFields(model);

        this.button = this.initialize(dom, function(dom) {
            return dom.createElement('button')
        });

        this.setAttributes(dom, {id: model.get('id')});

        var self = this;
        var objdag = this.objdag;
        var clickListener = function (clickEvent) {
            var object = objdag.get(model.get('id'));
            var children = objdag.getChildren(object);
            var click = _.filter(children, function(object) {
                return object.event == 'click';
            })
            _.map(click, function(object) {
                object.perform();
            });
        }

        this.button.name = model.get('name');
        this.button.textContent = model.get('text');
        this.button.addEventListener('click', function(clickEvent) {
            clickListener(clickEvent);
        });

        return self.wrap;
    }

    Button.prototype.add = function(model, objdag, dag, dom) {
        this.objdag = objdag;
        var wrap = this.render(model, dom);
    }

    Button.prototype.update = function(model, objdag, dag, dom) {
        this.objdag = objdag;
        var wrap = this.render(model, dom);
    }


    return Button;

});
