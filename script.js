#!/usr/bin/env node 


import fs from 'fs'
import minimist from 'minimist'
import { Transform } from 'stream'
import path,{dirname} from 'path'

const basePath = path.resolve(process.env.BASE_PATH||"")
console.log(basePath)

const args = minimist(process.argv.slice(2),{
    string:["file"],
    boolean:["help","in"]
})

if(args.help){
    printHelp
}
else if(args.file){
    const filePath = path.join(basePath,args.file)
    const fileStream = fs.createReadStream(filePath)
    processStream(fileStream)
}
else if(args.in || args["_"].includes('-')){
    processStream(process.stdin)
}
else{
    error("incorrect script usage", true)
}




function processStream(inStream){
    let inputStream = inStream
    let outputStream 
    
    //transform stream to transform stream
    
    let transformStream = new Transform({
        transform(chunck,enc,next){
            this.push(chunck.toString().toUpperCase())
            next()
        }
    })
    
    inputStream = inputStream.pipe(transformStream)
    
    outputStream = process.stdout
    
    inputStream.pipe(outputStream)
    

    
}






function error(error, showHelp= false ){
    

    console.error(error)
    if(showHelp){
        console.log('')
        printHelp()
    }
}




function printHelp(){
    console.log("")
    console.log("scipt usage")
    console.log("--help     prints this help")
    console.log("--file={fileName}   reads file from {filename}")
    console.log("--in or -           reads file from stdIn")
    
    
    
}



