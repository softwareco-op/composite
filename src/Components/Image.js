/*
 * (C) 2014 SoftwareCo-oP
 */

define(
['UI/HTML'],
function(HTML) {

    /*
     * Image component.
     */
    function Image(node) {
        this.node = node;
    }

    /*
     * Renders an image into the document
     * @param {Node} node used to read attributes
     * @param {DAG} dag containing nodes
     * @param {Document} dom to use for rendering
     *
     * @return {Element} dom element representing the button
     */
    Image.prototype.render = function(node, dag, dom) {
        this.el = this.el || HTML.nodeToElement(node, dom);
        return this.el;
    }

    Image.prototype.add = function(node, dag, dom) {
        this.render(node, dag, dom);
    }

    Image.prototype.update = function(node, dag, dom) {
        this.render(node, dag, dom);
    }

    return Image;

})
