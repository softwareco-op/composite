/*
 * (C) 2014 SoftwareCo-oP
 */

(function(COMPOSITE, Node) {

    COMPOSITE.Element = {
        /*
         * Adds a typical panel to the pipeline.
         */
        panel: function(pipeline, dag, id) {
            var panel = new Node({id:id, html:{}})
            panel.type = 'HtmlNode';
            panel.html['class'] = 'panel';
            panel.html.tag = 'div';
            if (pipeline) {panel = pipeline(panel)}

            var childrenDisplay = new Node();
            childrenDisplay.type = 'DisplayChildren';
            childrenDisplay.event = 'onrender';
            dag.addChild(panel, childrenDisplay);
            if (pipeline) {p1 = pipeline(p1)}

            return p0;
        }

    }

    return COMPOSITE.Element;

})(COMPOSITE, COMPOSITE.Node)
