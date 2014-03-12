/**
* Copyright (C) 2014 TheSoftwareCo-oP
*/


/**
 * ComponentPanelView is a view containing UI components available to the user or UI designer.
 **/
define(['UI/UIContext', 'UI/View', 'UI/CompositeView', 'underscore'], function(UIContext, View, CompositeView, _) {

    function ComponentPanelView(compositeView) {
        this.compositeView = compositeView;
    }
    _.extend(ComponentPanelView.prototype, View.prototype);

    ComponentPanelView.prototype.render = function(dom) {
        this.clearWrap(dom);

        var self = this;
        var addURLButton = this.uiContext.makeButton('URL', 'URL', function(clickEvent) {self.addURL();});
        var addCPVButton = this.uiContext.makeButton('CPV', 'CPV', function(clickEvent) {self.addCPV();});
        var removeAllButton = this.uiContext.makeButton('removeAll','Remove All', function(clickEvent) {
            self.compositeView.removeChildren();
        });

        wrap.appendChild(addURLButton.render(dom));
        wrap.appendChild(addCPVButton.render(dom));
        wrap.appendChild(removeAllButton.render(dom));
        wrap.appendChild(this.compositeView.render(dom));

        return wrap;
    }

    ComponentPanelView.prototype.addURL = function() {
        var model = this.urlModelSupplier.model();
        this.compositeView.add(model);
        model.save();
    }

    ComponentPanelView.prototype.addCPV = function() {
        var model = this.videoModelSupplier.model();
        this.compositeView.add(model);
        model.save();
    }

    return ComponentPanelView;
});
