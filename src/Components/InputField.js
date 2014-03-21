///
// (C) 2014 SoftwareCo-oP
///

define(['UI/View', 'Model/ObjectSupplier'], function(View, ObjectSupplier) {

    var objectSupplier = new ObjectSupplier();

    // A text field
    function TextField(model) {
        this.name = model.get('name');
        this.fieldType = model.get('fieldType');
        this.value = model.get('value');
        this.onchange = model.get('onchange');
        this.promise = objectSupplier.object(model, this.onchange);
    }
    _.extend(TextField.prototype, View.prototype)

    TextField.prototype.render = function(dom) {
        var wrap = this.clearWrap(dom);
        var self = this;

        this.promise.then(function(action) {
            var input = dom.createElement('input');
            input.setAttribute('type', self.fieldType);
            input.setAttribute('name', self.name);
            input.value = self.value;
            input.onchange = function() { action.perform(input) }
            wrap.appendChild(input);
        });

        return wrap;
    }

    return TextField;

});
