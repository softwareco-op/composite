require.config({
    baseUrl: '.',
    paths: {
      jquery: './bower_components/jquery/jquery',
      underscore: './bower_components/underscore-amd/underscore',
      backbone: './bower_components/backbone-amd/backbone',
      chai: './bower_components/chai/chai',
      'node-uuid':'./bower_components/node-uuid/uuid'
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
    'test/test.DAG'
], function() {

    if (window.mochaPhantomJS) { mochaPhantomJS.run(); }
    else { mocha.run(); }
});
