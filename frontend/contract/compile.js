const fs = require('fs')
import path from 'path';

// const solc = require('solc');


const wethPath = path.resolve(__dirname, 'weth9.sol');
const source = fs.readFileSync(wethPath);

// console.log(solc.compile(source, 1));

// 2nd arg of 1 represents 1 file to compile
// module.exports = solc.compile(source, 1).contracts[':Greetings'];, 'utf8');

export default source;
