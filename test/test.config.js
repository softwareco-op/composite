require.config({
    baseUrl: 'src',
    waitSeconds: 1,
    paths: {
      jquery: '../bower_components/jquery/jquery',
      underscore: '../bower_components/underscore-amd/underscore',
      localstorage:'../bower_components/backbone.localstorage/backbone.localStorage',
      backbone: '../bower_components/backbone-amd/backbone',
      rsvp: '../bower_components/rsvp/rsvp.amd',
      chai: '../bower_components/chai/chai',
      sinon: '../node_modules/sinon/pkg/sinon',
      'node-uuid':'../bower_components/node-uuid/uuid'
    },
    shim: {
        underscore: {
            exports: "_"
        },
        sinon: {
            exports: 'sinon'
        },
        rsvp: {
            exports: 'rsvp'
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
    '../test/ObjectSupplierTest',
    '../test/OBJDAGTest',
    '../test/OBJDAGControllerTest',
    '../test/InputFieldTest'
], function() {

    if (window.mochaPhantomJS) { mochaPhantomJS.run(); }
    else { mocha.run(); }
});
