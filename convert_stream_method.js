'use strict';

const fs = require('fs');
const path = require('path');
const stream = require('stream');
const readline = require('readline'); //native node module https://nodejs.org/docs/latest-v8.x/api/readline.html

const common = require('./common');

const convertCSVtoJSON = (csvFilepath, csvSeparator=',', pathBenchmarkOutputFile) => {
    common.init();
    csvSeparator =  common.normalizeCSVSeparator(csvSeparator);
    
    const fp = path.normalize(csvFilepath);
    const resultJsonFilepath = common.buildJsonFilepath(fp);
    
    let jsonResult = [];
    let isMoreOneObject = false;
    let headerFields = [];

    const inStream = fs.createReadStream(fp);
    const outStream = new stream;
    const rl = readline.createInterface(inStream, outStream);
    const streamResultJson = fs.createWriteStream(resultJsonFilepath);

    rl.on('line', (line) => {
        if (headerFields.length === 0) {
            headerFields = common.retrieveHeaderFields(line, csvSeparator);
            streamResultJson.write('[');
            return;
        }

        if (line.length) {
            if (isMoreOneObject) {
                streamResultJson.write(',');
            } else {
                isMoreOneObject = true;
            }
        
            const objectResult = common.transformLineToObject(line,csvSeparator, headerFields);
            streamResultJson.write(JSON.stringify(objectResult, null, 4));
        }
    });

    rl.on('close', () => {
        streamResultJson.write(']');
        common.end(pathBenchmarkOutputFile);
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