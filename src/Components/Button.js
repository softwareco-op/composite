//
// Copyright (C) 2014 SoftwareCo-oP
//

define(['Model/ObjectSupplier', 'UI/View', 'underscore'], function(ObjectSupplier, View, _) {

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
        var objdag = this.objdag;
        var clickListener = function (clickEvent) {
            objdag.get(model.get('id')).then(function(object) {
                return objdag.getChildren(object);
            }).then(function(children) {
                var click = _.filter(children, function(object) {
                    return object.event == 'click';
                })
                _.map(click, function(object) {
                    object.perform();
                });
            }).catch(function(error) {
                console.log(error);
            });
        }

        this.button.name = self.name;
        this.button.className = self.name;
        this.button.textContent = self.text;
        this.button.addEventListener('click', function(clickEvent) {
            clickListener(clickEvent);
        });

        return self.wrap;
    }

    Button.prototype.add = function(model, objdag, dag, dom) {
        this.objdag = objdag;
        this.dag = dag;
        var wrap = this.render(model, dom);
        objdag.getParent(this).then(function(parent) {
            parent.getWrap(dom).appendChild(wrap);
        });
    }


    return Button;

});
