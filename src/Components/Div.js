///
// (C) 2014 SoftwareCo-oP
///

define(['UI/View'], function(View) {

    function DIV(model) {
        this.id = model.get('id');
        this.clazz = model.get('class');
    }
    _.extend(DIV.prototype, View.prototype)

    DIV.prototype.render = function(model, dom) {
        var wrap = this.clearWrap(dom);

        var input = this.initialize(dom, function(dom) {
            return dom.createElement('div');
        });

        wrap.setAttribute('id', this.id);
        wrap.setAttribute('class', this.clazz);
        return wrap;
    }

    DIV.prototype.add = function(model, objdag, dag, dom) {
        this.objdag = objdag;
        this.dag = dag;
        var wrap = this.render(model, dom);
        objdag.getParent(this).then(function(parent) {
            parent.getWrap(dom).appendChild(wrap);
        });
    }

    return DIV;

});
