/**
* Copyright (C) 2013 TheSoftwareCo-oP
*/


/**
 * View is the base class from which all Views extend.
 **/
define(['node-uuid'], function(uuid) {

    function View(renderer) {
        this.uuid = uuid.v1();
        this.renderer = renderer;
    }

    /**
     * @param {Document} dom to render into
     * @return the result from renderer.
     */
    View.prototype.render = function(dom) {
        return this.renderer(dom);
    }

    /**
     * Create the wrapper. All elements will be inside (wrapped by) the wrapper.
     * @param {Document} dom used to add the wrapper.
     * @return {Element} an element containing sub view elements.
     */
    View.prototype.getWrap = function(dom) {
        if (typeof this.wrap != 'undefined') {return this.wrap;}
        this.wrap = dom.createElement('div');
        return this.wrap;
    }

    /**
     * Clear the wrapper of elements
     * @return this view
     */
    View.prototype.clear = function() {
        if (typeof this.wrap === 'undefined') {return;}
        while (this.wrap.hasChildNodes()) {
            this.wrap.removeChild(this.wrap.lastChild);
        }
        return this;
    }

    /**
     * A helper method that clears the view and returns the wrapper.
     * @param {Document} dom to insert the wrapper.
     * @return {Element} the wrapper
     */
    View.prototype.clearWrap = function(dom) {
        this.clear();
        return this.getWrap(dom);
    }

    return View;

});
