require.config({
    baseUrl: 'src',
    paths: {
      jquery: '../bower_components/jquery/jquery',
      underscore: '../bower_components/underscore-amd/underscore',
      localstorage:'../bower_components/backbone.localstorage/backbone.localStorage',
      backbone: '../bower_components/backbone-amd/backbone',
      chai: '../bower_components/chai/chai',
      'node-uuid':'../bower_components/node-uuid/uuid'
    },
    shim: {
        underscore: {
            exports: "_"
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'backbone.localStorage': {
            deps: ['backbone'],
            exports: 'Backbone'
        }
    }
});

require([
    '../test/test.DAG',
    '../test/test.ViewDAG'
], function() {

    if (window.mochaPhantomJS) { mochaPhantomJS.run(); }
    else { mocha.run(); }
});
