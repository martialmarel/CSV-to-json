'use strict';

const path = require('path');
const { spawnSync } = require( 'child_process' );
const ITERATION = 100;

let scriptName = 'convert_stream_method.js';


let pathCSVFile = 'data/CSV/customer-data.csv';
let CSVFileName = path.parse(pathCSVFile).base;
let csvSeparator = ',';
let pathBenchOutputfile = path.join(__dirname, '/data/bench/'+scriptName.split('.js')[0] + '_' + CSVFileName);

console.info(`benchmark starting : ${scriptName}-${CSVFileName}`); 
for (let i=0; i < ITERATION; i++) {
    const processConvert = spawnSync( 'node', [scriptName, pathCSVFile, csvSeparator, pathBenchOutputfile]);
}


pathCSVFile = 'data/CSV/medium.csv';
CSVFileName = path.parse(pathCSVFile).base;
csvSeparator = ',';
pathBenchOutputfile = path.join(__dirname, '/data/bench/'+scriptName.split('.js')[0] + '_' + CSVFileName);

console.info(`benchmark starting : ${scriptName}-${CSVFileName}`); 
for (let i=0; i < ITERATION; i++) {
    const processConvert = spawnSync( 'node', [scriptName, pathCSVFile, csvSeparator, pathBenchOutputfile]);
}


pathCSVFile = 'data/CSV/large.csv';
CSVFileName = path.parse(pathCSVFile).base;
csvSeparator = ',';
pathBenchOutputfile = path.join(__dirname, '/data/bench/'+scriptName.split('.js')[0] + '_' + CSVFileName);

console.info(`benchmark starting : ${scriptName}-${CSVFileName}`); 
for (let i=0; i < ITERATION; i++) {
    const processConvert = spawnSync( 'node', [scriptName, pathCSVFile, csvSeparator, pathBenchOutputfile]);
}

console.info('benchmark finish');