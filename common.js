'use strict';
const fs = require('fs');
const path = require('path');

let local = {
    startTime : 0,
    countLine : 0
}

/**
 * Initializes the script startup time to determine the processing time at the end of the conversion process.
 */
module.exports.init = () => {
    local.startTime = process.hrtime();
};


/**
 * Construct the path for the JSON file to the output result. 
 * 
 * @param {string} csvFilepath - the path to the CSV file to convert
 * @returns {string} the path for the JSON file to the output result
 */
module.exports.buildJsonFilepath = (csvFilepath) => {
    const objectPath = path.parse(csvFilepath);
    
    // Assuming that the CSV files to be converted is in the CSV directory.
    const resultJsonFilepath = objectPath.dir.replace('CSV', 'JSON') + path.sep  + objectPath.name + '.json';
    
    return resultJsonFilepath;
};


/**
 * Normalizes the CSV separator in the case of a special character.
 * 
 * @param {string} csvSeparator - character or pattern for separate fields
 * @returns {string} CSV separator normalized
 */
module.exports.normalizeCSVSeparator = (csvSeparator) => {
    let normalizeCSVSeparator = csvSeparator;

    // normalize string with special character to character code
    if (normalizeCSVSeparator.valueOf() === '\\t') {
        normalizeCSVSeparator = String.fromCharCode(9);
    }

    return normalizeCSVSeparator;
};


/**
 * Transforms the first head row in a array
 * 
 * @param {string} line - raw text line from CSV file
 * @param {string} csvSeparator - character or pattern for separate fields
 * @returns {array.string} array of head names
 */
module.exports.retrieveHeaderFields = (line, csvSeparator) => {
    const headerFields = line.split(csvSeparator);

    return headerFields;
};


/**
 * Transforms the raw text line in javascript object
 * 
 * @param {string} line - raw text line from CSV file
 * @param {string} csvSeparator - character or pattern for separate fields
 * @param {array.string} array of head names
 * @return {object} representation of raw text line in javascript object
 */
module.exports.transformLineToObject = (line, csvSeparator, headerFields) => {
    let arrayOfvalues = line.split(csvSeparator);
    let itemResult = {};

    for (let index = 0; index < headerFields.length; index++) {
        let keyName = headerFields[index];
        let keyValue = arrayOfvalues[index];
        itemResult[keyName] = keyValue;
    }

    local.countLine++;
    return itemResult;
};

/**
 * At end of process conversion time, stop time execution.
 * console.log a duration process and memory consumed
 */
module.exports.end = (pathBenchmarkOutputFile) =>  {
    const endTime =  process.hrtime(local.startTime);
    let totalExecutionmilliSeconds = parseInt((endTime[0] * 1e3) + (endTime[1] * 1e-6), 10);

    console.log(`Finish. Number of line read : ${local.countLine}. In ${totalExecutionmilliSeconds} miliseconds`);
    const usedMemory = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`The script uses approximately ${usedMemory} MB`);

    if (pathBenchmarkOutputFile) {
        fs.appendFile(pathBenchmarkOutputFile, `${totalExecutionmilliSeconds};${usedMemory}\r\n`, (err) => {
            if (err) throw err;
        });
    }
};
