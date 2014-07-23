var mongo = require('mongodb'),
    MongoClient = require('mongodb').MongoClient;

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('oceanic.mongohq.com', 10068, {auto_reconnect: true});

var db = MongoClient.connect("mongodb://mongo:mongo@kahana.mongohq.com:10077/app25960755", {native_parser:true}, function(err, db) {
    if(!err) {
        return db;
    } else {
        console.log("Could not connect to database");
    }
});

exports.deprecated = function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.send({'error':'Deprecated. please use /v2/* moving forward.'});
}

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving file: ' + id);
    MongoClient.connect("mongodb://mongo:mongo@kahana.mongohq.com:10077/app25960755", {native_parser:true}, function(err, db) {
        if(!err) {
            console.log("Connected to 'app25960755' database");
            db.collection('files', function(err, collection) {
                if(id != null && id != 'undefined') {
                    collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
                        if(!err){
                            if(item != null) {
                                delete item._id;
                                res.header("Access-Control-Allow-Origin", "*");
                                res.send(item);
                            } else {
                                res.header("Access-Control-Allow-Origin", "*");
                                res.send({'error':'Id not found.'});
                            }
                        }
                    });
                } else{
                    res.header("Access-Control-Allow-Origin", "*");
                    res.send({'error':'An error has occurred'});
                }
            });
        }
    });
};

exports.getRaml = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving file: ' + id);
    MongoClient.connect("mongodb://mongo:mongo@kahana.mongohq.com:10077/app25960755", {native_parser:true}, function(err, db) {
        if(!err) {
            console.log("Connected to 'app25960755' database");
            db.collection('files', function(err, collection) {
                if(id != null && id != 'undefined') {
                    collection.findOne({'name':id}, function(err, item) {
                        if(!err) {
                            if(item != null) {
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
            });
        }
    });
};

exports.findAll = function(req, res) {
    var filelist = new Object();
    MongoClient.connect("mongodb://mongo:mongo@kahana.mongohq.com:10077/app25960755", {native_parser:true}, function(err, db) {
        if(!err) {
            console.log("Connected to 'app25960755' database");
            this.db = db;
            db.collection('files', function(err, collection) {
                collection.find({}, function(err, resultCursor) {
                    if(!err) {
                        resultCursor.each(function(err,item) {
                            if(item != null){
                                console.log('Item : '+item._id+' : ' + JSON.stringify(item));
                                filelist[item._id] = item;
                                delete filelist[item._id]._id;
                                console.log(JSON.stringify(filelist));
                            }
                            else{
                                res.header("Access-Control-Allow-Origin", "*");
                                res.send(JSON.stringify(filelist));
                            }
                        });
                    }
                });
            });
        }
    });

};

exports.addFile = function(req, res) {
    var file = req.body;
//    console.log('Adding file : ' + JSON.stringify(file));
    MongoClient.connect("mongodb://mongo:mongo@kahana.mongohq.com:10077/app25960755", {native_parser:true}, function(err, db) {
        if(!err) {
            console.log("Connected to 'app25960755' database");
            this.db = db;
            db.collection('files', function(err, collection) {
                collection.insert(file, {safe:true}, function(err, result) {
                    if (err) {
                        res.send({'error':'An error has occurred'});
                    } else {
//                        console.log('Success: ' + JSON.stringify(result[0]));
                        res.header("Access-Control-Allow-Origin", "*");
                        res.send(result[0]);
                    }
                });
            });
        }
    });
}

exports.updateFile = function(req, res) {
    var id = req.params.id;
    var file = req.body;
//    console.log('Updating file: ' + id);
//    console.log(file    );
    MongoClient.connect("mongodb://mongo:mongo@kahana.mongohq.com:10077/app25960755", {native_parser:true}, function(err, db) {
        if(!err) {
            console.log("Connected to 'app25960755' database");
            this.db = db;
            db.collection('files', function(err, collection) {
                collection.update({'_id':new BSON.ObjectID(id)}, file, {safe:true}, function(err, result) {
                    if (err) {
                        console.log('Error updating file : ' + err);
                        res.send({'error':'An error has occurred'});
                    } else {
                        console.log('' + result + ' document(s) updated');
                        res.header("Access-Control-Allow-Origin", "*");
                        res.send('{"status":"success","id":"'+id+'","message":"The file was successfully updated."}');
                    }
                });
            });
        }
    });
}

exports.deleteFile = function(req, res) {
    var id = req.params.id;
//    console.log('Deleting file: ' + id);
    MongoClient.connect("mongodb://mongo:mongo@kahana.mongohq.com:10077/app25960755", {native_parser:true}, function(err, db) {
        if(!err) {
            console.log("Connected to 'app25960755' database");
            this.db = db;
            db.collection('files', function(err, collection) {
                collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
                    if (err) {
                        res.send({'error':'An error has occurred - ' + err});
                    } else {
                        console.log('' + result + ' document(s) deleted');
                        res.send(req.body);
                    }
                });
            });
        }
    });
}

/*--------------------------------------------------------------------------------------------------------------------*/

// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {

    var files = [
        {
            name: "ExampleRAML",
            path: "%2F",
            contents: "gggggg"
        }];

    db.collection('files', function(err, collection) {
        collection.insert(files, {safe:true}, function(err, result) {});
    });

};
