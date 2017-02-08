

/**
* Options for running the script
* --[minor | major | patch] ................ specify version control
* --skipbump ............................. skips bumping versions before sending the requests, it also skips rewriting the file with the bumped version
* --all .................................... updates (and bumps if specified) all configurations
* --[catalogdata|accountdata|ratingsdata|catalogedge|accountedge|ratingsedge|loginedge] ... configurations can be filtered by keyword
*
* Examples:
* node updateProperties.js --minor --catalogedge --accountedge --ratingsedge --loginedge
* node updateProperties.js --major --all
* node updateProperties.js --patch --skipupdate --accountdata --catalogdata
*
* If targeting a henge server other than localhost, change hengeDomain variable
* */

var fs = require('fs');
var argv = require("yargs").argv;
var http = require('http');

var baseDir = '../server/';
var hengeDomain = 'localhost';
var configurations = [
    "msl-catalog-edge-config",
    "msl-account-edge-config",
    "msl-ratings-edge-config",
    "msl-login-edge-config",
    "msl-catalog-data-client-config",
    "msl-account-data-client-config",
    "msl-ratings-data-client-config"
];

function filterConfigurations(configuration) {
    var configurationTempArray = configuration.split('-');
    configurationTempArray.shift();
    configurationTempArray.pop();
    if (configurationTempArray.length > 2) {
        configurationTempArray.pop();
    }
    var config = configurationTempArray.join('');
    if (argv.all) {
        return true;
    } else {
        return argv[config] === true;
    }
}



function getBumpVersion (version) {
    var versionArray = version.split('.');
    if (argv.minor) {
        versionArray[1] = parseInt(versionArray[1]) + 1;
    } else  if(argv.major) {
        versionArray[0] = parseInt(versionArray[0]) + 1;
    } else {
        versionArray[2] = parseInt(versionArray[2]) + 1;
    }
    return versionArray.join(".");
}

function updatePropertyGroup (prop){
    prop.propertyGroupList.forEach(function (propertyGroup) {
        if (argv.skipbump !== true) {
            propertyGroup.version = getBumpVersion(propertyGroup.version);
        }
        var req = http.request({
            host: hengeDomain,
            port: 8080,
            path: '/henge/v1/property-groups/' + propertyGroup.name,
            method: 'PUT',
            headers: {
                "Content-Type" : "application/json",
                "Authorization": "Basic dXNlcjp1c2Vy",
                "Cache-Control": "no-cache"
            },
            body: propertyGroup
        }, function (res) {
            var response = "";
            res.on("data", function (data) {
                response += data;
            });
            res.on("end", function () {
                if (response.status !== 200) {
                    console.log('Unable to process request: ' + response);
                } else {
                    console.log('SUCCESSFULLY UPDATED PROPERTY GROUP: \n ' + JSON.stringify(propertyGroup));
                    updateVersionSet(prop);
                }
            });
        });

        req.on('error', function (e) {
            console.log('Unable to process request: ' + e.message);
        });

        req.end();
    });
}


function updateVersionSet (versionSetList) {
    prop.versionSetList.forEach(function (versionSet) {
        if (argv.skipbump !== true) {
            versionSet.version = getBumpVersion(versionSet.version);
        }
        var req = http.request({
            host: hengeDomain,
            port: 8080,
            path: '/henge/v1/version-sets/' + versionSet.name,
            method: 'PUT',
            headers: {
                "Content-Type" : "application/json",
                "Authorization": "Basic dXNlcjp1c2Vy",
                "Cache-Control": "no-cache"
            },
            body: versionSet
        }, function(res) {
            var response = "";
            res.on("data", function (data) {
                response += data;
            });
            res.on("end", function () {
                if (response.status !== 200) {
                    console.log('Unable to process request: ' + response);
                } else {
                    console.log('SUCCESSFULLY UPDATED VERSION SET: \n' + JSON.stringify(versionSet));
                    updateMapping(prop);
                }
            });
        });

        req.on('error', function (e) {
            console.log('Unable to process request: ' + e.message);
        });

        req.end();
    });
}

function updateMapping (prop) {
    prop.mappingList.forEach(function (mapping) {
        if (argv.skipbump !== true) {
            mapping.vsReference.version = getBumpVersion(mapping.vsReference.version);
        }
        var req = http.request({
            host: hengeDomain,
            port: 8080,
            path: '/henge/v1/mapping?application=' + mapping.application,
            method: 'PUT',
            headers: {
                "Content-Type" : "application/json",
                "Authorization": "Basic dXNlcjp1c2Vy",
                "Cache-Control": "no-cache"
            },
            body: mapping.vsReference
        }, function(res) {
            var response = "";
            res.on("data", function (data) {
                response += data;
            });
            res.on("end", function () {
                if (response.status !== 200) {
                    console.log('Unable to process request: ' + response);
                } else {
                    console.log('SUCCESSFULLY UPDATED MAPPING: \n' + JSON.stringify(mapping));
                    if(argv.skipbump !== true) {
                        updateFile(file, prop);
                    }
                }
            });

        });

        req.on('error', function (e) {
            console.log('Unable to process request: ' + e.message);
        });

        req.end();

    });
}

function updateFile(file, prop){
    fs.writeFile(file, JSON.stringify(prop, null, 2), 'utf-8', function (err) {
        if (err) throw err;
        console.log('File {' + file + '} updated');
    });
}


function init () {
    configurations.filter(filterConfigurations).forEach(function (entry) {
        var file = baseDir + entry + '/config.json';
        fs.readFile(file, 'utf8', function (err, data) {
            if (err) throw err;
            console.log('Reading file: ' + file);
            var prop = JSON.parse(data);
            updatePropertyGroup(prop);
        });
    });
}

init();




