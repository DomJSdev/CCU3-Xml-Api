import {readFile,writeFile,readdir} from 'fs/promises'


async function read (fileName,json=false){

    try {
        let fileContent = await readFile(fileName,{encoding:'utf-8'})
        if(json) {
            return JSON.parse(fileContent)
        }
        return fileContent
        
    } catch (error) {
        return new Error(error)     
    }
    
}


async function write (fileName,context,json=false){
    if( ! typeof context === 'string') context = JSON.stringify(context)
    console.log(typeof context)
    try {
        let fileContent = await writeFile(fileName,context)
        if(json) {
            return JSON.parse(fileContent)
        }
        return fileContent
        
    } catch (error) {
        return new Error(error)     
    }
    
}

async function dir (path){
    let fileDetails = []
    try {
        let dirContent = await readdir(path,{encoding:'utf-8'})
        console.log(dirContent)
        for(let i=0;i<dirContent.length;i++){
            fileDetails.push({
                name:dirContent[i],
                data:read(`${path}/${dirContent[i]}`)
            })
        }
        console.log(fileDetails)
        return fileDetails
        
    } catch (error) {
        return new Error(error)     
    }
}

async function getRouters(){
    let routers = '<a href="/">Home</a>'
    let fileContent =await read('./xml-api-skripts/skripts.json',true)
    console.log(fileContent)
    fileContent.forEach(routs => {
        routers += `<a href="/${routs.name}">${routs.name}</a>`
    });
    console.log(routers)
    return routers

}
module.exports ={
    read,write,dir,getRouters
}