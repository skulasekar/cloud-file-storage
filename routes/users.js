var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
    var customer = {
        id: "1",
        link: {
            href: "http://cable-api.herokuapp.com/customer/1",
            rel: "self"
        },
        customerId: "123456789",
        name: "Santhosh Kulasekar",
        customerRank: "2",
        status: "Active",
        validFor: {
            startDateTime: "2014-10-09T18:01:45.649+0000",
            endDateTime: "2014-10-09T18:01:45.649+0000"
        },
        partySummary: {
            link: {
                href: "",
                rel: "Individual"
            },
            name: "Maple Leafs",
            primaryContact: {
                phone: {
                    link: "",
                    number: "678-982-3194",
                    type: "mobile"
                },
                email: {
                    link: "",
                    emailaddress: "s.kulasekar@cablelabs.com",
                    type: "office"
                },
                address: {
                    link: "",
                    type: "home",
                    line1: "13356 marrywood ln",
                    line2: "",
                    city: "Milton",
                    state: "GA",
                    zip: "30004",
                    zipxt: "5463"
                }
            }
        },
        customerSegment: {
            name: "Maple Leafs",
            description: "23-25 year old canadians",
            validFor: {
                startDateTime: "",
                endDateTime: ""
            }
        },
        customerAccounts: [
            {
                id: "1",
                link: {
                    href: "http://cable-api.herokuapp.com/customeraccount/1",
                    rel: "customeraccount"
                },
                name: "Mark Bridges"
            }
        ],
        devices: [
            {
                id: "1",
                link: {
                    href: "http://cable-api.herokuapp.com/device/1",
                    rel: "device"
                }
            }
        ]
    };




//        "\"id\": \"1\",\n" +
//        "\"customerId\": \"123456789\",\n" +
//        "\"name\": \"Ashwini Agarwal\",\n" +
//        "\"customerRank\": \"2\",\n" +
//        "\"status\": \"Active\",\n" +
//        "\"validFor\": {\n" +
//        "\"startDateTime\": \"2014-10-09T18:01:45.649+0000\",\n" +
//        "\"endDateTime\": \"2014-10-09T18:01:45.649+0000\"\n" +
//        "},\n" +
//        "\"customerAccounts\": [\n" +
//        "{\n" +
//        "\"id\": \"1\",\n" +
//        "\"link\": {\n" +
//        "\"href\": \"http://cable-api.herokuapp.com/customeraccount/1\",\n" +
//        "\"rel\": \"customeraccount\"\n" +
//        "},\n" +
//        "\"name\": \"Bob Dole\"\n" +
//        "}\n" +
//        "],\n" +
//        "\"customerSegment\": {\n" +
//        "\"name\": \"Maple Leafs\",\n" +
//        "\"description\": \"23-25 year old Canadians\",\n" +
//        "\"validFor\": {\n" +
//        "\"startDateTime\": \"2014-10-09T18:01:45.649+0000\",\n" +
//        "\"endDateTime\": \"2014-10-09T18:01:45.649+0000\"\n" +
//        "}\n" +
//        "},\n" +
//        "\"partyDetails\": {\n" +
//        "\"individual\": {\n" +
//        "\"id\": \"1\",\n" +
//        "\"link\": {\n" +
//        "\"href\": \"http://cable-api.herokuapp.com/individual/1\",\n" +
//        "\"rel\": \"individual\"\n" +
//        "},\n" +
//        "\"preferedName\": \"Ashwini Agarwal\"\n" +
//        "}\n" +
//        "},\n" +
//        "\"devices\": [\n" +
//        "{\n" +
//        "\"id\": \"1\",\n" +
//        "\"link\": {\n" +
//        "\"href\": \"http://cable-api.herokuapp.com/device/1\",\n" +
//        "\"rel\": \"device\"\n" +
//        "}\n" +
//        "}\n" +
//        "]\n" +
//        "}";
    res.header('Content-type', 'application/json');
    res.send(customer);
});

module.exports = router;
