///
// (C) 2014 SoftwareCo-oP
///

define(
['Composition/Global'],
function(Global) {

    function GlobalAction(model) {
        Global.action()
    }

    GlobalAction.prototype.perform = function() {
        Global.action();
    }

    return GlobalAction;

});
