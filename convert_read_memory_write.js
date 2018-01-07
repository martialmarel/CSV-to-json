'use strict';

const fs = require('fs');
const path = require('path');

const common = require('./common');

const convertCSVtoJSON = (csvFilepath, csvSeparator=',' , pathBenchmarkOutputFile) => {
    common.init();
    csvSeparator =  common.normalizeCSVSeparator(csvSeparator);

    const fp = path.normalize(csvFilepath);
    const resultJsonFilepath = common.buildJsonFilepath(fp);

    let headerFields = [];

    fs.readFile(fp, (err, data) => {
        if (err) throw err;
        const lines = data.toString().split(/\r\n|\r|\n/g);

        headerFields = common.retrieveHeaderFields(lines[0], csvSeparator);
        lines.shift();
        const items = lines
                        .filter(line => {
                            if (line.length) { return true; }
                            return false;
                        })
                        .map(line => {
                            var objectResult = common.transformLineToObject(line,csvSeparator, headerFields);
                            return objectResult;
                        });
        fs.writeFile(resultJsonFilepath, JSON.stringify(items, null, 4), (err) => {
            if (err) throw err;
            common.end(pathBenchmarkOutputFile);
        });
    });
};

let csvFilepath = (process.argv[2]) ? process.argv[2] : undefined;
let csvSeparator = (process.argv[3]) ? process.argv[3] : undefined;
let pathBenchmarkOutputFile = (process.argv[4]) ? process.argv[4] : undefined;

if (csvFilepath) {
    convertCSVtoJSON(csvFilepath, csvSeparator, pathBenchmarkOutputFile);
} else {
   console.info('a syntax is : $ node <script_name> <path of CSV file> <CSV separator>');
}

module.exports = convertCSVtoJSON;