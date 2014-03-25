//
// (C) 2014 SoftwareCo-oP
//

define(['UI/View', 'Model/ObjectSupplier'], function(View, ObjectSupplier) {

    var objectSupplier = new ObjectSupplier();

    //
    // A text field
    //
    // @param {Backbone.Model} model describing this text field
    //
    function InputField(model) {
        this.setFields(model)
    }
    _.extend(TextField.prototype, View.prototype)

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
        this.promise = objectSupplier.object(model, this.onchange);
    }

    //
    // Renders the input field when the onchange function is available
    //
    // @param {Backbone.Model} model used to read attributes
    // @param {Document} dom to use for rendering
    // @return {Element} dom element representing the button
    //
    InputField.prototype.render = function(model, dom) {
        this.setFields(model);

        var input = this.initialize(dom, function(dom) {
            return dom.createElement('input')
        });

        var self = this;
        this.promise.then(function(action) {
            input.setAttribute('type', self.fieldType);
            input.setAttribute('name', self.name);
            input.value = self.value;
            input.onchange = function() { action.perform(input) }
        });

        return self.wrap;
    }

    return InputField;

});
