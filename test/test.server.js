require('../src/Server/NodeDeps');
global.chai = require('chai');
global.sinon = require('sinon');


var mocha = require('mocha');
var fs = require('fs');

COMPOSITE.mochaTest = true;

var m = new mocha();
m.addFile('./test/DAGTest.js');
m.addFile('./test/Server/HttpTest.js');
m.addFile('./test/FileTest.js');
m.addFile('./test/Server/ServerSocketTest.js');
m.addFile('./test/Server/ClientSocketTest.js');
m.addFile('./test/Server/DAGReplierTest.js');
m.addFile('./test/IO/JSONReaderTest.js');
m.addFile('./test/Composition/ProcessTest.js');
m.reporter('spec').ui('tdd').run();
