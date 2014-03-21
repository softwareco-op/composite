///
// (C) 2014 SoftwareCo-oP
///

define(['UI/View'], function(View) {

    function DIV(model) {
        this.id = model.get('id');
        this.clazz = model.get('class');
    }
    _.extend(DIV.prototype, View.prototype)

    DIV.prototype.render = function(dom) {
        var wrap = this.clearWrap(dom);
        wrap.setAttribute('id', this.id);
        wrap.setAttribute('class', this.clazz);
        return wrap;
    }

    return DIV;

});
