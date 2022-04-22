#!/usr/bin/env node 
import fs from 'fs'
import path from "path"
import minimist from 'minimist'
import  getStdnIn from 'get-stdin'


const args = minimist(process.argv.slice(2),{
    string:["file"],
    boolean:["help"]
})


if(args.help){
    printHelp()
}
else if(args.file){
    const filePath =  path.resolve(args.file)
    fs.readFile(filePath,(error,content)=>{
        if(error) handleError(error);
        processContent(content.toString())
    })}
else if(args.in || args["_"].includes("-") ){
    
    getStdnIn().then(processContent).catch(handleError)
}
else{
    printHelp()
}


function processContent(content){
    
    process.stdout.write(content.toUpperCase()+ "\n")
}


function handleError(error){
process.stderr.write("an error occured",error.message)
    
    
}





function printHelp(){
    console.log("./scriptjs")
    console.log("             ")
    console.log("            ./script.js --FILE=[FILE_NAME]")
    console.log("./script.js --help")
    
}