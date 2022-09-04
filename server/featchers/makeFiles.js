import {writeFile} from 'fs/promises'

/**
 * 
 * @param {string} path 
 * @param {string} end '.html' 
 * @param {array} array of file names 
 * @param {string} tamplate what will write in the files
 */
async function makeFiles(path,end,files,tamplate){

    if(typeof files === 'string'){

        try {
            let filePath = path + file.name + end 
            writeFile(filePath,tamplate,{encoding:'utf-8'} ) 
        } catch (error) {
            console.log(error)
        }

    }else{

    files.forEach(file => {

    try {
        if(typeof tamplate === "string") tamplate = JSON.stringify(tamplate)    
       
        let filePath = path + file.name + end 
        writeFile(filePath,tamplate,{encoding:'utf-8'} ) 
            
    } catch (error) {
        console.log(error)
    }    
    })
}
}

module.exports = {
    makeFiles
}