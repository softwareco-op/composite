
require.config({
    baseUrl: 'src',
    waitSeconds: 1,
    'packages': [
        { 'name': 'lodash', 'location': '../bower_components/lodash-amd/compat' },
        { 'name': 'underscore', 'location': '../bower_components/lodash-amd/underscore' }
    ],
    paths: {
      jquery: '../bower_components/jquery/jquery',
      rsvp: '../bower_components/rsvp/rsvp.amd',
      chai: '../bower_components/chai/chai',
      sinon: '../node_modules/sinon/pkg/sinon',
      'jssha':'../bower_components/jssha/src/sha256',
      'node-uuid':'../bower_components/node-uuid/uuid',
      'socketioclient':'../node_modules/socket.io-client/dist/socket.io'
    },
    shim: {
        sinon: {
            exports: 'sinon'
        },
        rsvp: {
            exports: 'rsvp'
        }
    }
});

require([
    //'../test/ClonerTest',e
    '../test/PathTest',
    '../test/HasherTest',
    '../test/ObjectSupplierTest',
    '../test/DAGTest',
    '../test/DIVTest',
    '../test/ImageTest',
    '../test/InputFieldTest',
    '../test/PageTest',
    '../test/ReorderTest',
    '../test/HTMLTest'
    //'../test/NodeSocketTest'
    //'../test/PromiseTest'


], function() {

    if (window.mochaPhantomJS) { mochaPhantomJS.run(); }
    else { mocha.run(); }
});
