global.COMPOSITE = {}
var path = require('path');
global.servePath = path.dirname(path.dirname(__dirname));
require('../src/Server/NodeDeps');
global.chai = require('chai');
global.sinon = require('sinon');
global.socketioclient = require('socket.io-client');

var mocha = require('mocha');
var m = new mocha();
m.addFile('./test/DAGTest.js')
m.addFile('./test/HttpTest.js')

//m.addFile('./test/HttpServereTst.js');
//m.addFile('./test/NodeSocketTest.js');

m.reporter('spec').ui('tdd').run();

