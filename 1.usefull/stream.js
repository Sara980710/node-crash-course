const fs = require('fs');

const readStream = fs.createReadStream('./docs/txt3.txt', {encoding: 'utf-8'});
const writeStream = fs.createWriteStream('./docs/txtout.txt');

readStream.on('data', (chunk) => {
    console.log('-------NEW CHUNK-------');
    console.log(chunk);
    writeStream.write('\nNEW CHUNK\n');
    writeStream.write(chunk);
})

const writeStream2 = fs.createWriteStream('./docs/txtoutpipe.txt');

readStream.pipe(writeStream2);