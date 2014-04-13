/**
* Copyright (C) 2013 TheSoftwareCo-oP
*/



define(['http', 'express', 'socket.io'], function(http, express, socketio) {



    /**
     * Construct a http server.  Users can swap in and out requestListeners.
     * @param {Function} requestListener to handle incoming requests.
     * Often an express instance.
     *
     * @constructor
     */
    function HttpServer(port, eventBus, servePath) {
        this.port = port;
        this.servePath = servePath;
        this.eventBus = eventBus;
        this.socketList = [];
        this.running = false;
    }



    /**
     * @return {Object} the http server instance.
     */
    HttpServer.prototype.getServer = function() {
        return this.server;
    }



    /**
     * Start the server listening on the port defined in the constructor
     */
    HttpServer.prototype.startService = function() {
        if (this.running === true) {
            console.log("http server already running!");
            return this.io;
        }
        this.app = express();
        this.server = http.createServer(this.app);
        this.io = socketio.listen(this.server);
        var eventBus = this.eventBus;
        this.server.listen(this.port);
        this.app.use(express.static(this.servePath));
        this.io.on('connection', this.onConnection());
        this.running = true;
        return this.io;
    }



    /**
     * Called when the server recieves a connection.  Does book keeping tasks
     * for each connection.
     * @param {Object} socket connected to this server.
     */
    HttpServer.prototype.onConnection = function(socket) {
        var self = this;
        return function(socket) {
            var socketList = self.socketList;
            socketList.push(socket);
            socket.on('close', function () {
                console.log('socket closed');
                socketList.splice(socketlist.indexOf(socket), 1);
            });
            self.eventBus.emit('connection', socket);
        };
    }



    HttpServer.prototype.stopService = function() {
        this.io.close();
        this.socketList.forEach(function(socket) {
            socket.destroy();
        });
        this.running = false;
    }



    return HttpServer;



});
