global.uuid = require('uuid');
jsSHA = require('jssha');
global._ = require('lodash');
global.COMPOSITE = {}
global.servePath = __dirname;

global._addJS = function(module, location) {
    require('../../' + module, location);
}
require('../../src/Composition/Modules');

//Server modules
require('../../src/Server/ClientSocket');
require('../../src/Server/WsStaticServer');
require('../../src/Server/ServerSocket');
require('../../src/Server/FileBuffer');

//Platform specific modules
global.WebSocket = require('ws');
