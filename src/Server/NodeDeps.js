global.uuid = require('uuid');
jsSHA = require('jssha');
global._ = require('lodash');
global.http = require('http');
global.express = require('express');
global.WebSocketServer = require('ws').Server;
global.WebSocket = require('ws');

require('../../src/Model/Transient')
require('../../src/Model/Mux')
require('../../src/Model/Hasher')
require('../../src/Model/Cloner')
require('../../src/Collection/DAGUtil')
require('../../src/Collection/DAG')
require('../../src/Collection/DAGNotify')
require('../../src/Model/Path')
require('../../src/UI/HTML')
require('../../src/Components/HtmlNode')
require('../../src/Actions/Action')
require('../../src/Actions/GlobalAction')
require('../../src/Actions/CopyTree')
require('../../src/Actions/StoreValue')
require('../../src/Actions/Reorder')
require('../../src/Actions/DisplayChildren')

require('../../src/Model/Unique')
require('../../src/Model/ObjectSupplier')
require('../../src/Model/Pipeline')

require('../../src/UI/Page')

require('../../src/Server/NodeSocket');
require('../../src/Server/WsStaticServer');
require('../../src/Server/WsPipeline');
