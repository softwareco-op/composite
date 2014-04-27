///
// (C) 2014 SoftwareCo-oP
///

(function(COMPOSITE) {

    function GlobalAction(model) {
        this.name = 'click';
    }

    GlobalAction.prototype.perform = function() {
        COMPOSITE.action.perform();
    }

    GlobalAction.prototype.add = function(model, objdag, dag) {
        this.objdag = objdag;
        COMPOSITE.action.onadd(this, model, objdag, dag);
    }

    COMPOSITE.GlobalAction = GlobalAction;
    return GlobalAction;

})(COMPOSITE);
