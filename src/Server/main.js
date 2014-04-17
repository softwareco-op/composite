var requirejs = require('requirejs');
var path = require('path');

var servePath = path.dirname(path.dirname(__dirname));

global.define = requirejs;

requirejs.config({
    nodeRequire: require,
    baseUrl : 'src',
    paths: {
        'node-uuid':'../bower_components/node-uuid/uuid',
        'jssha':'../bower_components/jssha/src/sha256',
        'lodash':'../node_modules/lodash/lodash'
    }
});

requirejs(['Server/HttpNodePipeline'], function(HttpNodePipeline) {
    var httpNodePipeline = new HttpNodePipeline(servePath, 3000);
    httpNodePipeline.install();
    httpNodePipeline.routeNodesToPipeline();
});
