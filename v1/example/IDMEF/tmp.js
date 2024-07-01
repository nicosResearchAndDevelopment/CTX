let that = [
    {
        "ID"         : "https://www.nicos-ag.com/incident#819df7bc-35ef-40d8-bbee-1901117370b1",
        "Description": "Potential intruder detected",
        "Priority"   : "TODO",
        "Version"    : "TODO",
        "Status"     : "Incident",
        "ctx:sector" : "nis2:Manufacturing-ElectricalEquipment_Sector",
        "Cause"      : "Malicious",
        "CreateTime" : "2021-05-10T16:52:13.075994+00:00",
        "Category"   : "ctx:Intrusion_Burglary",
        "Analyzer"   : {
            "ID"      : "https://www.nicos-ag.com/analyzer/BigBrother",
            "Name"    : "BigBrother",
            "Hostname": "bb.acme.com",
            "IP"      : "192.0.2.1",
            "Model"   : "Big Brother v42",
            "Category": [
                "HAR",
                "FRC"
            ],
            "Data"    : "Images",
            "Method"  : [
                "Movement",
                "Biometric",
                "AI"
            ]
        },
        "Sensor"     : {
            "ID"      : "https://www.nicos-ag.com/sensor/camera#23",
            "Name"    : "Camera #23",
            "IP"      : "192.0.2.2",
            "Model"   : "SuperDuper Camera v1",
            "Location": "Hallway to server room A1"
        },
        "Vector"     : {
            "Name"       : "John Doe",
            "Description": "Codename Vodka, known henchman for APT 4869",
            "Category"   : "Man",
            "TI"         : "Name:FBI-Wanted",
            "Attachment" : [
                {
                    "ID"             : "https://www.nicos-ag.com/atachment#1",
                    "Name"           : "wanted",
                    "ContentType"    : "image/jpg",
                    "ContentEncoding": "base64",
                    "Content"        : "abc",
                    "Size"           : "3"
                },
                {
                    "ID"             : "https://www.nicos-ag.com/atachment#2",
                    "Name"           : "wanted",
                    "ContentType"    : "image/jpg",
                    "ContentEncoding": "base64",
                    "Content"        : "cdfe",
                    "Size"           : "4"
                }
            ]
        }
    }
];