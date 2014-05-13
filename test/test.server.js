global.COMPOSITE = {}
var path = require('path');
global.servePath = path.dirname(path.dirname(__dirname));
require('../src/Server/NodeDeps');
global.chai = require('chai');
global.sinon = require('sinon');
global.request = require('supertest');
global.Server = require('http').Server;

var mocha = require('mocha');
var m = new mocha();
m.addFile('./test/DAGTest.js');
m.addFile('./test/HttpTest.js');
m.addFile('./test/WsPipelineTest.js');

m.reporter('spec').ui('tdd').run();

