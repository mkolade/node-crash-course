const fs = require('fs');

//To read files
    /* fs.readFile('./docs/blogs.txt',(err,data) => {
        if(err){
            console.log(err)
        }
        console.log(data.toString());
    })

    console.log('Last line'); */

//To write files
    /* fs.writeFile('./docs/blogs.txt','Hello World',() =>{
        console.log('file was written')
    })

    fs.writeFile('./docs/blogs2.txt','Hello World',() =>{
        console.log('file was written')
    }) */

//To create and delete directories
    if(!fs.existsSync('./assets')){
        fs.mkdir('./assets',(err) =>{
            if(err){
                console.log(err)
            }

            console.log('Folder Created')
        })
    }else{
        fs.rmdir('./assets',(err) => {
            if(err){
                console.log(err)
            }

            console.log('Folder Removed')
        })
    }

//To delete files
    if(fs.existsSync('./docs/blogs2.txt')){
        fs.unlink('./docs/blogs2.txt', (err) =>{
            if(err){
                console.log(err)
            }

            console.log('File Deleted')
        })
    }
    