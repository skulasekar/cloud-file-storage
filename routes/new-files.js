var mongo = require('mongodb'),
    mongoose = require('mongoose'),
    schemas = require('../model/schema'),
    BSON = mongo.BSONPure,
    MongoClient = require('mongodb').MongoClient;

var FileModel = mongoose.model('file', schemas.getFileSchema());

exports.findById = function(req, res) {
    var id = req.params.id;
    if(id != null && id != 'undefined') {
        FileModel.findById(req.params.id, function (err, file) {
            if(!err){
                if(file != null) {
                    delete file._id;
                    res.header("Access-Control-Allow-Origin", "*");
                    res.send(file);
                } else {
                    res.header("Access-Control-Allow-Origin", "*");
                    res.send({'error':'Id not found.'});
                }
            } else {
                return console.log(err);
            }
        });
    } else{
        res.header("Access-Control-Allow-Origin", "*");
        res.send({'error':'An error has occurred'});
    }
};

exports.getRaml = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving file: ' + id);
    if(id != null && id != 'undefined') {
        FileModel.findOne(req.params.id, function (err, item) {
            if(!err){
                if(item != null) {
                    delete item._id;
                    res.header("Access-Control-Allow-Origin", "*");
                    res.header("Content-Type", "application/json")
                    res.send(decodeURI(item.contents));
                } else {
                    res.header("Access-Control-Allow-Origin", "*");
                    res.send({'error':'Id not found.'});
                }
            } else if(id == 'test') {
                res.header("Access-Control-Allow-Origin", "*");
                res.send('Test Success');
            }
        });
    } else{
        res.header("Access-Control-Allow-Origin", "*");
        res.send({'error':'An error has occurred'});
    }
};

exports.findAll = function(req, res) {
    var filelist = new Object();
    var query = FileModel.find();
//    query.sort({'_id': 'descending'});
    query.exec(function (err, services) {
        if(!err) {
            for(var i = 0; i < services.length; i++) {
//                console.log('Item : ' + services[i]._id+' : ' + JSON.stringify(services[i]));
                filelist[services[i]._id] = services[i];
                delete filelist[services[i]._id]._id;
//                console.log(JSON.stringify(filelist));
            }
            console.log("Retrieved " + services.length + " files!");
            res.header("Access-Control-Allow-Origin", "*");
            res.send(JSON.stringify(filelist));
        }
    });
};

exports.addFile = function(req, res) {
    var file = req.body;
    console.log('Adding file : ' + JSON.stringify(file));
    var file;
    file = new FileModel({
        path:          req.body.path,
        name:   req.body.name,
        contents:     req.body.contents,
        type:         req.body.type,
        lastUpdated:        req.body.lastUpdated
    });
    file.save(function (err) {
        if (!err) {
            console.log("created");
            res.header("Access-Control-Allow-Origin", "*");
            res.send(file);
        } else {
            console.log(err);
            res.send({'error':'An error has occurred'});
        }
    });
};

exports.updateFile =  function (req, res){
    var id = req.params.id;
    return FileModel.findById(id, function (err, file) {
        file.path           =   req.body.path;
        file.name           =   req.body.name;
        file.contents       =   req.body.contents;
        file.type           =   req.body.type;
        file.lastUpdated    =   req.body.lastUpdated;
        return file.save(function (err) {
            if (!err) {
                console.log(file.name + " Document(s) updated");
                res.header("Access-Control-Allow-Origin", "*");
                res.send('{"status":"success","id":"'+id+'","message":"The file was successfully updated."}');
            } else {
                console.log('Error updating file : ' + file.name + ' ' + err);
                res.send({'error':'An error has occurred'});
            }
        });
    });
};

exports.deleteFile = function (req, res){
    return FileModel.findById(req.params.id, function (err, file) {
        return file.remove(function (err) {
            if (!err) {
                console.log(file.name + ' Document(s) deleted');
                res.send(req.body);
            } else {
                console.log(err);
                res.send({'error':'An error has occurred - ' + err});
            }
        });
    });
};
