///
// (C) 2014 SoftwareCo-oP
///

define([], function() {

    function StoreValue(model) {this.model = model}

    StoreValue.prototype.perform = function(input) {
        this.model.set('value', input.value);
        this.model.save();
    }

    StoreValue.prototype.add = function(model, objdag, dag, dom) {
        return;
    }

    return StoreValue;

});
