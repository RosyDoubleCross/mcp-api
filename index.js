var express = require('express');
var app = express();
var port = process.env.PORT || 5252;
var db = require(__dirname + '/models/');
var bodyParser = require('body-parser');
var epilogue = require('epilogue');
var prefix = '/';
var server;

console.log('adding bodyParser JSON');
app.use(prefix, bodyParser.json());

console.log('preparing epilogue');
epilogue.initialize({
    app: app,
    sequelize: db.sequelize,
    base: prefix
});

console.log('creating video routes');
epilogue.resource({
    model: db.Video,
    endpoints: ['/video', '/video/:id']
});

console.log('creating category routes');
epilogue.resource({
    model: db.Category,
    include: [db.Video],
    endpoints: ['/category', '/category/:id']
});

console.log('adding catchall 404 route');
app.use('/', function (req, res, next) {
    res.sendStatus(404);
});

db.sequelize.sync().then(function() {
    server = app.listen(port, function() {
        console.log('listening on port ' + port);
    });
});

function shutdown() {
    //console.log('closing database');
    //db.sequelize.close();
    //console.log('closing express app');
    //server.close();
    console.log('exiting');
    process.exit(0);
    /*
    db.sequelize.close(function(err) {
        if (err) {
            console.log('error closing database: ' + err);
        } else {
            console.log('closed database');
        }
        console.log('closing express app');
        server.close(function() {
            console.log('closed express app');
            //console.log('exiting');
            //process.exit(0);
        });
    });
    */
}

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

