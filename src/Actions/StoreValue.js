///
// (C) 2014 SoftwareCo-oP
///

define([], function() {

    function StoreValue(model) {this.model = model}

    StoreValue.prototype.perform = function(input) {
        this.model.set('value', input.value);
    }

    return StoreValue;

});
