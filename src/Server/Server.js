///
// (C) 2014 SoftwareCo-oP
///

define(['http', 'backbone.io', 'express'], function(http, backboneio, express) {

    function Server(servePath) {
        this.servePath = servePath;
    }

    Server.prototype.backboneio = function() {
        var app = express();
        console.log('servePath: ' + this.servePath);

        app.use(express.static(this.servePath));

        var server = app.listen(3000);
        console.log('http://localhost:3000/');

        var backend = backboneio.createBackend();
        backend.use(function(req, res, next) {
            console.log(req.backend);
            console.log(req.method);
            console.log(JSON.stringify(req.model));
            next();
        });
        backend.use(backboneio.middleware.memoryStore());

        backboneio.listen(server, { mybackend: backend });
    }

    return Server;

});
