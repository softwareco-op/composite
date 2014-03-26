///
// (C) 2014 SoftwareCo-oP
///

define(
['Composition/Global'],
function(Global) {

    function GlobalAction(model) {
        this.name = 'click';
    }

    GlobalAction.prototype.perform = function() {
        Global.action.perform();
    }

    GlobalAction.prototype.add = function(model, objdag, dag) {
        this.objdag = objdag;
        Global.action.onadd(this, model, objdag, dag);
    }

    return GlobalAction;

});
