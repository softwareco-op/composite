/*
 * (C) 2014 SoftwareCo-oP
 */

define(
['UI/View', 'lodash'],
function(View, _) {

    /*
     * Image component.
     */
    function Image(node) {
        this.node = node;
    }
    _.extend(Image.prototype, View.prototype);

    /*
     * Renders an image into the document
     * @param {Node} node used to read attributes
     * @param {DAG} dag containing nodes
     * @param {Document} dom to use for rendering
     *
     * @return {Element} dom element representing the button
     */
    Image.prototype.render = function(node, dag, dom) {
        this.el = this.initialize(dom, function(dom) {
            return dom.createElement('img');
        })

        this.setAttributes(dom, {id: node.id, 'class':node.clazz});

        var self = this;

        this.el.src = node.src;
        this.el.alt = node.alt;
        this.el.width = node.width;
        this.el.height = node.height;

        return this.el;
    }

    Image.prototype.add = function(node, dag, dom) {
        var wrap = this.render(node, dag, dom);
    }

    Image.prototype.update = function(node, dag, dom) {
        var wrap = this.render(node, dag, dom);
    }

    return Image;

})
