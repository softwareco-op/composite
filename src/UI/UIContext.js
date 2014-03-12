/**
* Copyright (C) 2013 TheSoftwareCo-oP
*/



define(['UI/View'], function(View) {

    function UIContext() {}

    /**
     * @param {Function} action to take on click
     */
    UIContext.prototype.makeButton = function(name,textContent,clickListener) {
        var renderer = function(dom) {
            var wrap = this.clearWrap(dom);
            var button = dom.createElement('button');
            button.name = name;
            button.className = name;
            button.textContent = textContent;
            button.addEventListener('click', function(clickEvent) {
                clickListener(clickEvent);
            });
            wrap.appendChild(button);
            return wrap;
        }
        return new View(renderer);
    }

    /**
     * @param {Function} action to take on click
     */
    UIContext.prototype.makeActionButton = function(action) {
        var renderer = function(dom) {
            var wrap = this.clearWrap(dom);
            var button = dom.createElement('button');
            button.name = action.name;
            button.className = name;
            button.textContent = action.description;
            button.addEventListener('click', function(event) {
                action.callback(event);
            });
            wrap.appendChild(button);
            return wrap;
        }
        return new View(renderer);
    }

    return UIContext;

})
