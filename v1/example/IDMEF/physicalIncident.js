// REM: taken from: <https://datatracker.ietf.org/doc/draft-lehmann-idmefv2/> (A.1.)
// REM: here as JSON used by JavaScript, to be allowed to do some comments, that are allowed in JavaScript
let that = {
    "Version"    : "2.D.V0X",
    "ID"         : "819df7bc-35ef-40d8-bbee-1901117370b1",  // +, URI
    "Description": "Potential intruder detected",           // +, dct:description
    "Priority"   : "Low",
    "Status"     : "Incident",
    "Cause"      : "Malicious",                             // +, ctx:cause
    "CreateTime" : "2021-05-10T16:52:13.075994+00:00",      // +, prov:generatedAtTime
    "StartTime"  : "2021-05-10T16:52:13+00:00",             // +, ctx:hasBeginning
    "Category"   : [
        "Intrusion.Burglary"
    ],
    "Analyzer"   : {
        "Name"    : "BigBrother",
        "Hostname": "bb.acme.com",
        "Type"    : "Physical",
        "Model"   : "Big Brother v42",
        "Category": [
            "HAR",
            "FRC"
        ],
        "Data"    : [
            "Images"
        ],
        "Method"  : [
            "Movement",
            "Biometric",
            "AI"
        ],
        "IP"      : "192.0.2.1"
    },
    "Sensor"     : [
        {
            "IP"      : "192.0.2.2",
            "Name"    : "Camera #23",
            "Model"   : "SuperDuper Camera v1",
            "Location": "Hallway to server room A1"
        }
    ],
    "Source"     : [
        {
            "Note": "Black Organization, aka. APT 4869"
        }
    ],
    "Vector"     : [
        {
            "Category"  : ["Man"],
            "TI"        : ["Name:FBI-Wanted"],
            "Name"      : "John Doe",
            "Note"      : "Codename Vodka, known henchman for APT 4869",
            "Location"  : "Hallway to server room A1",
            "Attachment": ["pic01", "wanted"]
        }
    ],
    "Attachment" : [
        {
            "Name"           : "wanted",
            "FileName"       : "fbi-wanted-poster.jpg",
            "Size"           : 1234567,
            "Ref"            : ["https://www.fbi.gov/wanted/topten"],
            "ContentType"    : "image/jpg",
            "ContentEncoding": "base64",
            "Content"        : "..."
        },
        {
            "Name"       : "pic01",
            "Note"       : "Hi-res picture showing John Doe near server room A1",
            "ExternalURI": ["ftps://192.0.2.1/cam23/20210510165211.jpg"],
            "ContentType": "image/jpg"
        }
    ]
}