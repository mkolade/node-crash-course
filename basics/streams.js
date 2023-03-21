const fs = require('fs');

const readStream = fs.createReadStream('./docs/blogs2.txt',{encoding: 'utf8'})
const writeStream = fs.createWriteStream('./docs/blogs3.txt')

//Reading and writing streams
/* readStream.on('data',(chunk) =>{
    console.log('------New Chunk------')
    console.log(chunk)

    writeStream.write('\nNew Chunk\n')
    writeStream.write(chunk)
}) */

//Piping-: shorter way for the above code

readStream.pipe(writeStream)