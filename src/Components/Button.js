/**
* Copyright (C) 2014 SoftwareCo-oP
*/


/**
 * A simple button.
 */
define(['UI/UIContext', 'Model/ObjectSupplier', 'UI/View', 'underscore'], function(UIContext, ObjectSupplier, View, _) {

    var uiContext = new UIContext();
    var objectSupplier = new ObjectSupplier();

    function Button(model) {
        this.model = model;
        this.name = model.get('name');
        this.text = model.get('text');
        this.action = model.get('action');
        this.promise = objectSupplier.object(model, this.action);
    }
    _.extend(Button.prototype, View.prototype);

    /**
     * Renders the button as soon as the action is available
     */
    Button.prototype.render = function(dom) {
        var wrap = this.clearWrap(dom);
        var self = this;
        this.promise.then(function(action) {
            var clickListener = function (clickEvent) { action.sayHello() }
            var view = uiContext.makeButton(self.name, self.text, clickListener);
            wrap.appendChild(view.render(dom));
        });
        return wrap;
    }

    return Button;

});
