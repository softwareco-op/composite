require.config({
    baseUrl: 'src',
    waitSeconds: 1,
    'packages': [
        { 'name': 'lodash', 'location': '../bower_components/lodash-amd/compat' },
        { 'name': 'underscore', 'location': '../bower_components/lodash-amd/underscore' }
    ],
    paths: {
      jquery: '../bower_components/jquery/jquery',
      localstorage:'../bower_components/backbone.localstorage/backbone.localStorage',
      backbone: '../bower_components/backbone-amd/backbone',
      rsvp: '../bower_components/rsvp/rsvp.amd',
      chai: '../bower_components/chai/chai',
      sinon: '../node_modules/sinon/pkg/sinon',
        //'underscore':'../bower_components/underscore-amd/underscore',
      'jssha':'../bower_components/jssha/src/sha256',
      'node-uuid':'../bower_components/node-uuid/uuid'
    },
    shim: {
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
    '../test/ClonerTest',
    '../test/HasherTest',
    '../test/ObjectSupplierTest',
    '../test/test.DAG',
    '../test/PageTest'

    //'../test/InputFieldTest',
    //'../test/DIVTest',
    //'../test/OBJDAGTest',
    //'../test/OBJDAGControllerTest',
    //'../test/PromiseTest'

], function() {

    if (window.mochaPhantomJS) { mochaPhantomJS.run(); }
    else { mocha.run(); }
});
