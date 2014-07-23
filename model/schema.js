var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var file = new Schema({
    path: { type: String, required: false },

    name: { type: String, required: false },

    contents : { type: String, required: false },

    type: { type: String, required: false },

    lastUpdated: { type: Date, required: false }

});

exports.getFileSchema = function() {
    return file;
}

//{
//    path: "/emailcontact.json",
//        name: "emailcontact.json",
//    contents: "%7B%20%22type%22:%20%22object%22,%20%0A%22$schema%22:%20%22http://json-schema.org/draft-03/schema%22,%20%0A%22id%22:%20%22http://jsonschema.net%22,%20%0A%22required%22:%20false,%20%0A%22properties%22:%20%7B%0A%20%20%20%20%22EMailAddress%22:%20%7B%0A%20%20%20%20%20%20%20%20%22type%22:%20%22string%22,%20%0A%20%20%20%20%20%20%20%20%22id%22:%20%22http://jsonschema.net/EMailAddress%22,%20%0A%20%20%20%20%20%20%20%20%22required%22:%20false%0A%20%20%20%20%7D,%20%0A%20%20%20%20%22EMailClassification%22:%20%7B%0A%20%20%20%20%20%20%20%20%22type%22:%20%22string%22,%20%0A%20%20%20%20%20%20%20%20%22id%22:%20%22http://jsonschema.net/EMailClassification%22,%20%0A%20%20%20%20%20%20%20%20%22required%22:%20false%0A%20%20%20%20%7D,%20%0A%20%20%20%20%22link%22:%20%7B%0A%20%20%20%20%20%20%20%20%22type%22:%20%22object%22,%20%0A%20%20%20%20%20%20%20%20%22id%22:%20%22http://jsonschema.net/link%22,%20%0A%20%20%20%20%20%20%20%20%22required%22:%20false,%20%0A%20%20%20%20%20%20%20%20%22properties%22:%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%22href%22:%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22type%22:%20%22string%22,%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22id%22:%20%22http://jsonschema.net/link/href%22,%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22required%22:%20false%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D,%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%22rel%22:%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22type%22:%20%22string%22,%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22id%22:%20%22http://jsonschema.net/link/rel%22,%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22required%22:%20false%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%7D,%20%0A%20%20%20%20%22validFor%22:%20%7B%0A%20%20%20%20%20%20%20%20%22type%22:%20%22object%22,%20%0A%20%20%20%20%20%20%20%20%22id%22:%20%22http://jsonschema.net/validFor%22,%20%0A%20%20%20%20%20%20%20%20%22required%22:%20false,%20%0A%20%20%20%20%20%20%20%20%22properties%22:%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%22endDateTime%22:%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22type%22:%20%22string%22,%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22id%22:%20%22http://jsonschema.net/validFor/endDateTime%22,%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22required%22:%20false%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D,%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%22startDateTime%22:%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22type%22:%20%22string%22,%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22id%22:%20%22http://jsonschema.net/validFor/startDateTime%22,%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22required%22:%20false%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%7D%0A%7D",
//    type: "file",
//    lastUpdated: "2014-06-04T15:41:09.818Z",
//    _id: ObjectId("538f3e16edd64c0d64254cd0")
//}

//
//var newFile = new Schema({
//    "type": "object",
//    "$schema": "http://json-schema.org/draft-03/schema",
//    "id": "http://jsonschema.net",
//    "required": false,
//    "properties": {
//        "contents": {
//            "type": "string",
//            "id": "http://jsonschema.net/contents",
//            "required": false
//        },
//        "lastUpdated": {
//            "type": "string",
//            "id": "http://jsonschema.net/lastUpdated",
//            "required": false
//        },
//        "name": {
//            "type": "string",
//            "id": "http://jsonschema.net/name",
//            "required": false
//        },
//        "path": {
//            "type": "string",
//            "id": "http://jsonschema.net/path",
//            "required": false
//        },
//        "type": {
//            "type": "string",
//            "id": "http://jsonschema.net/type",
//            "required": false
//        }
//    }
//});