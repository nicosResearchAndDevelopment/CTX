const fs         = require('node:fs/promises');
const ttl2jsonld = require('@frogcat/ttl2jsonld')["parse"];

const root    = "C:/fua/MODEL/nrd/CTX/v1";
const package = [
    {
        output : "/model_data_example.json",
        drop   : false,
        turtles: [
            // region example
            // region example IDMEF
            // region example IDMEF A1
            {
                drop: false,
                ttl : "/example/IDMEF/A1.ttl"
            }
            // endregion example IDMEF  A1
            // endregion example IDMEF
            // endregion example
        ] // turtles
    }
]; // package

async function deepMerge(target, source) {

    const isObject = (obj) => {
        return ((obj && (typeof obj === 'object')));
    };

    if (!isObject(target) || !isObject(source)) {
        return source;
    } // if ()

    async function resolve(key) {
        if (key !== "@id") {

            let targetValue = target[key];
            let sourceValue = source[key];

            if (targetValue === undefined) {
                target[key] = sourceValue;
            } else {

                if (Array.isArray(targetValue) || Array.isArray(sourceValue)) {
                    targetValue = Array.isArray(targetValue) ? targetValue : [targetValue];
                    sourceValue = Array.isArray(sourceValue) ? sourceValue : [sourceValue];
                    target[key] = targetValue.concat(sourceValue);
                } else if (isObject(targetValue) && isObject(sourceValue)) {
                    target[key] = await deepMerge(Object.assign({}, targetValue), sourceValue);
                } else {
                    target[key] = sourceValue;
                } // if ()
            } // if ()
        } // if ()
        return target;
    } // resolve()

    Object.keys(source).forEach((key) => {
        return resolve(key);
    });

} // deepMerge()

async function run({
                       drop_at_id = false
                   },
                   callback) {
    let error = null;
    let jsonld;
    try {

        for (let package_i = 0; package_i < package.length; package_i++) {


            let ttl_data = "";

            if (!package[package_i].drop) {
                let index_graph = {};
                for (let i = 0; i < package[package_i].turtles.length; i++) {
                    let turtles = package[package_i].turtles;
                    if (!turtles[i].drop) {
                        ttl_data = ttl_data + await fs["readFile"](root + turtles[i].ttl, {encoding: 'utf8'});
                    } else {
                        console.warn(`drop turtle <${turtles[i].ttl}> in package <${package[package_i].output}>`);
                    } // if ()
                } // for (i)

                jsonld = ttl2jsonld(ttl_data);

                for (let entry_i = 0; entry_i < jsonld["@graph"].length; entry_i++) {
                    let entry = jsonld["@graph"][entry_i];
                    if (!index_graph[entry["@id"]]) {
                        index_graph[entry["@id"]] = entry;
                        if (drop_at_id)
                            delete index_graph[entry["@id"]]["@id"];
                    } else {
                        entry = await deepMerge(index_graph[entry["@id"]], entry);
                    } // if
                } // for (i)

                jsonld["@graph"] = index_graph;

                try {
                    await fs["writeFile"](root + package[package_i].output, JSON.stringify(jsonld, null, "\t"));
                    console.log(`write package <${package[package_i].output}>`);
                } catch (err) {
                    console.error(err);
                } // try
            } else {
                console.warn(`drop package <${package[package_i].output}>`);
            } // if ()
        } // for (i)
    } catch (err) {
        error = err;
        console.log(err);
    } // try
    callback({
        error : error,
        result: jsonld
    });
} // run()

run({
    drop_at_id: false
}, ({
        "result": result
    }) => {
    let output    = [];
    let incidents = [];
    for (const [uri, entry] of Object.entries(result['@graph'])) {
        console.log(`${uri}`);
        if (entry['@type'] === "ctx:Incident") {
            incidents.push(entry);
            let imdef_entry = {
                "ID"         : entry['@id'],
                "Description": ((entry['dct:description']) ? entry['dct:description']['@value'] : undefined),
                "Priority"   : "TODO",
                "Version"    : "TODO",
                "Status"     : "Incident",
                "ctx:sector" : ((entry['ctx:sector']) ? entry['ctx:sector']['@id'] : entry['ctx:sector']),
                "Cause"      : ((entry['ctx:cause']) ? entry['ctx:cause']['@value'] : undefined),
                "CreateTime" : ((entry['prov:generatedAtTime']) ? entry['prov:generatedAtTime']['@value'] : undefined),      // +, prov:generatedAtTime
                "StartTime"  : ((entry['prov:hasBeginning']) ? entry['prov:hasBeginning']['@value'] : undefined),
                "Category"   : ((entry['ctx:incidentCategory']) ? entry['ctx:incidentCategory']['@id'] : undefined),
            };

            if (entry['ctx:analyser']) {
                let entry_analyzer      = result['@graph'][entry['ctx:analyser']['@id']];
                let imdef_analyzer      = {
                    // REM: "ID" **NOT** shown in IDMEFv2
                    "ID"      : entry_analyzer['@id'],
                    "Name"    : ((entry_analyzer['rdfs:label']) ? entry_analyzer['rdfs:label'] : undefined),
                    "Hostname": ((entry_analyzer['idmef:Hostname']) ? entry_analyzer['idmef:Hostname'] : undefined),
                    "IP"      : ((entry_analyzer['idmef:IP']) ? entry_analyzer['idmef:IP'] : undefined),
                    "Model"   : ((entry_analyzer['idmef:Model']) ? entry_analyzer['idmef:Model'] : undefined),
                    "Category": ((entry_analyzer['idmef:Category']) ? entry_analyzer['idmef:Category'] : undefined),
                    "Data"    : ((entry_analyzer['idmef:Data']) ? entry_analyzer['idmef:Data'] : undefined),
                    "Method"  : ((entry_analyzer['idmef:Method']) ? entry_analyzer['idmef:Method'] : undefined),
                };
                imdef_entry["Analyzer"] = imdef_analyzer;
            } // if ()

            if (entry['ctx:observer']) {
                let entry_observer    = result['@graph'][entry['ctx:observer']['@id']];
                let imdef_sensor      = {
                    // REM: "ID" **NOT** shown in IDMEFv2
                    "ID"      : entry_observer['@id'],
                    "Name"    : ((entry_observer['rdfs:label']) ? entry_observer['rdfs:label'] : undefined),
                    "IP"      : ((entry_observer['idmef:IP']) ? entry_observer['idmef:IP'] : undefined),
                    "Model"   : ((entry_observer['idmef:Model']) ? entry_observer['idmef:Model'] : undefined),
                    "Location": ((entry_observer['prov:atLocation']) ? entry_observer['prov:atLocation'] : undefined)
                };
                imdef_entry["Sensor"] = imdef_sensor;
            } // if ()

            if (entry['ctx:vector']) {
                let entry_vector = ((entry['ctx:vector']['@id']) ? result['@graph'][entry['ctx:vector']['@id']] : entry['ctx:vector']);
                let imdef_vector = {
                    // REM: "ID" **NOT** shown in IDMEFv2
                    "ID"         : ((entry_vector['@id']) ? entry_vector['@id'] : undefined),
                    "Name"       : ((entry_vector['rdfs:label']) ? ((entry_vector['rdfs:label']['@value']) || entry_vector['rdfs:label']) : undefined),
                    "Description": ((entry_vector['dct:description']) ? ((entry_vector['dct:description']['@value']) || entry_vector['dct:description']) : undefined),
                    "Category"   : ((entry_vector['idmef:Category']) ? entry_vector['idmef:Category'] : undefined),
                    "TI"         : ((entry_vector['idmef:TI']) ? entry_vector['idmef:TI'] : undefined)
                    // TODO
                };

                if (entry_vector['ctx:attachment']) {
                    let entry_attachments = (Array.isArray(entry_vector['ctx:attachment']) ? entry_vector['ctx:attachment'] : [entry_vector['ctx:attachment']]);
                    let idmef_attachments = [];
                    for (let i = 0; i < entry_attachments.length; i++) {
                        let entry_attachment = ((entry_attachments[i]['@id']) ?
                            result['@graph'][entry_attachments[i]['@id']]
                            :
                            {});
                        let imdef_attachment = {
                            "ID"             : entry_attachment['@id'],
                            "Name"           : ((entry_attachment['rdfs:label']) ? entry_attachment['rdfs:label'] : undefined),
                            "ContentType"    : ((entry_attachment['ctx:contentType']) ? (entry_attachment['ctx:contentType']['@value'] || entry_attachment['ctx:contentType']) : undefined),
                            "ContentEncoding": ((entry_attachment['ctx:contentEncoding']) ? (entry_attachment['ctx:contentEncoding']['@value'] || entry_attachment['ctx:contentEncoding']) : undefined),
                            "Content"        : ((entry_attachment['ctx:content']) ? (entry_attachment['ctx:content']['@value'] || entry_attachment['ctx:content']) : undefined),
                            "Size"           : ((entry_attachment['ctx:contentLength']) ? (entry_attachment['ctx:contentLength']['@value'] || entry_attachment['ctx:contentLength']) : undefined),
                        };
                        idmef_attachments.push(imdef_attachment);
                    } // for()
                    imdef_vector["Attachment"] = ((idmef_attachments.length > 0) ? idmef_attachments : undefined);
                } // if ()

                imdef_entry["Vector"] = imdef_vector;
            } // if ()

            output.push(imdef_entry);
        } // if ()
    } // for ()
    console.log(JSON.stringify(output, "", "\t"));

    debugger;
});

// console.log(JSON.stringify(jsonld, null, "\t"));