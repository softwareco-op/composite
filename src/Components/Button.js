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
    }

    //
    // Renders the button
    // @param {Backbone.Model} model used to read attributes
    // @param {Document} dom to use for rendering
    // @return {Element} dom element representing the button
    //
    Button.prototype.render = function(model, dom) {
        this.setFields(model);

        this.button = this.initialize(dom, function(dom) {
            return dom.createElement('button')
        });

        var self = this;
        var clickListener = function (clickEvent) {
            var click = _.filter(self.objdag.getChildren(self.objdag.getObject(model.get('id'))), function(object) {
                return object.name == 'click';
            })
            _.map(click, function(object) {
                object.perform();
            });
        }

        this.button.name = self.name;
        this.button.className = self.name;
        this.button.textContent = self.textContent;
        this.button.addEventListener('click', function(clickEvent) {
            clickListener(clickEvent);
        });

        return self.wrap;
    }

    Button.prototype.add = function(model, objdag, dag, dom) {
        this.objdag = objdag;
        this.dag = dag;
        this.render(model, dom);
    }


    return Button;

});
