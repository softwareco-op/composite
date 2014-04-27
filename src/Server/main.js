var requirejs = require('requirejs');
var path = require('path');
var servePath = path.dirname(path.dirname(__dirname));
var nameSpace = require('../Composition/Namespace');
var HttpNodePipeline = require('./HttpNodePipeline');

(function(HttpNodePipeline) {
    var httpNodePipeline = new HttpNodePipeline(servePath, 3000);
    httpNodePipeline.install();
    httpNodePipeline.routeNodesToPipeline();
})(COMPOSITE.HttpNodePipeline)
