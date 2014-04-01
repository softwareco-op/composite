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
    InputField.prototype.render = function(model, dom) {
        this.setFields(model);

        var input = this.initialize(dom, function(dom) {
            return dom.createElement('input');
        });

        var onChange = function() {
            objdag.get(model.get('children')).then(function(children) {
                var changeFns = _.filter(children, function(object) {
                    return object.name == 'onchange';
                });
                _.map(changeFns, function(object) {
                    object.perform();
                });
            }).catch(function(error) {
                console.log(error);
            })
                }

        var self = this;
        input.setAttribute('type', self.fieldType);
        input.setAttribute('name', self.name);
        input.value = self.value;
        input.onchange = onChange;

        return self.wrap;
    }

    InputField.prototype.add = function(model, objdag, dag, dom) {
        this.objdag = objdag;
        this.dag = dag;
        var wrap = this.render(model, dom);
        objdag.getParent(this).then(function(parent) {

            parent.getWrap(dom).appendChild(wrap);

        });
    }

    return InputField;

});
