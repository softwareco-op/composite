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

        this.objdag.getChildren(this).then(function(children) {
            children.map(function(child) {
                input.appendChild(child.getWrap(dom));
            })
        }).catch(function(error) {
            console.log(error);
            throw error;
        });

        input.setAttribute('class', this.clazz);
        this.setAttributes(dom, {id: this.id});
        return wrap;
    }

    DIV.prototype.add = function(model, objdag, dag, dom) {
        this.objdag = objdag;
        this.dag = dag;
        var wrap = this.render(model, dom);
    }

    DIV.prototype.update = function(model, objdag, dag, dom) {
        this.render(model, dom);
    }

    return DIV;

});
