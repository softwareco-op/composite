global.COMPOSITE = {}


require('../src/Server/NodeDeps');
global.chai = require('chai');
global.sinon = require('sinon');




var mocha = require('mocha');
var fs = require('fs');

var m = new mocha();
m.addFile('./test/DAGTest.js');
m.addFile('./test/Server/HttpTest.js');
m.addFile('./test/FileTest.js');
m.addFile('./test/FileBufferTest.js');
m.addFile('./test/Server/ServerSocketTest.js');
m.addFile('./test/Server/ClientSocketTest.js');
m.addFile('./test/Server/DAGReplierTest.js');
m.reporter('spec').ui('tdd').run();

