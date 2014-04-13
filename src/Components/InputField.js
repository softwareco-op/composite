//
// (C) 2014 SoftwareCo-oP
//

define(['UI/View', 'Model/ObjectSupplier', 'underscore'], function(View, ObjectSupplier, _) {

    //
    // A text field
    //
    // @param {Backbone.Model} model describing this text field
    //
    function InputField(model) {
        this.setFields(model)
    }
    _.extend(InputField.prototype, View.prototype)

    //
    // Read the attributes required to render the component
    //
    // @param {Backbone.Model} model used to read attributes
    //
    InputField.prototype.setFields = function(model) {
        this.name = model.get('name');
        this.fieldType = model.get('fieldType');
        this.value = model.get('value');
        this.onchange = model.get('onchange');

    }

    //
    // Renders the input field when the onchange function is available
    //
    // @param {Backbone.Model} model used to read attributes
    // @param {Document} dom to use for rendering
    // @return {Element} dom element representing the button
    //
    InputField.prototype.render = function(model, objdag, dom) {
        this.setFields(model);

        var input = this.initialize(dom, function(dom) {
            return dom.createElement('input');
        });

        var self = this;
        var onChange = function() {
            objdag.getChildren(self).then(function(children) {
                var changeFns = _.filter(children, function(object) {
                    return object.event === 'onchange';
                });
                _.map(changeFns, function(object) {
                    object.perform(input, model);
                });
            }).catch(function(error) {
                console.log(error);
            })
        }

        this.setAttributes(dom, {id: model.get('id')});
        input.setAttribute('type', self.fieldType);
        input.setAttribute('name', self.name);
        input.value = self.value;
        input.onchange = onChange;

        return this.wrap;
    }

    InputField.prototype.add = function(model, objdag, dag, dom) {
        this.render(model, objdag, dom);
    }

    InputField.prototype.update = function(model, objdag, dag, dom) {
        this.render(model, objdag, dom);
    }

    return InputField;

});
