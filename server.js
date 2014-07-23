var express = require('express'),
    mongo = require('mongodb'),
    mongoose = require('mongoose'),
    files = require('./routes/files'),
    newFiles = require('./routes/new-files');
 
var app = express();

// Database Connection
mongoose.connect('mongodb://mongo:mongo@kahana.mongohq.com:10077/app25960755');

app.configure(function () {
    app.use(express.logger('dev')); /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
});

app.use(express.methodOverride());
 
// ## CORS middleware
//
// see: http://stackoverflow.com/questions/7067966/how-to-allow-cors-in-express-nodejs
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }
};
app.use(allowCrossDomain);
 
app.get('/files', newFiles.findAll);
app.get('/files/:id', newFiles.findById);
app.post('/files', newFiles.addFile);
app.put('/files/:id', newFiles.updateFile);
app.delete('/files/:id', newFiles.deleteFile);
app.get('/raml/:id', newFiles.getRaml);

app.get('/v2/files', newFiles.findAll);
app.get('/v2/files/:id', newFiles.findById);
app.post('/v2/files', newFiles.addFile);
app.put('/v2/files/:id', newFiles.updateFile);
app.delete('/v2/files/:id', newFiles.deleteFile);
app.get('/v2/raml/:id', newFiles.getRaml);


app.listen(process.env.PORT || 5000);
console.log('Listening on port 5000...');
