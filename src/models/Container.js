
const fs = require('fs');

class Container {
    constructor(fileName){
        this.nombreArchivo=fileName;
        this.id=0
    }

    

    getContentById(id){
        let Contents=[]
        let Content=null
        try {
            let file = fs.readFileSync(this.nombreArchivo,'utf-8')
            Contents=(JSON.parse(file))
            console.log(Contents)
        } catch (error) {
            console.log('No hay archivo')
        }
        Contents.forEach(user => {
        if(user.id==id){
            Content=user
        }
    });
    return Content
    }
    
     getAllContent(){
         
        let Contents=[]
        
        try {
            let file = fs.readFileSync(this.nombreArchivo,'utf-8')
            
            Contents=JSON.parse(file)
           
        } catch (error) {
            console.log("No hay archivo")
        }
        return Contents
     }
     
    deleteContentById(id,num){
        let Cont=[]
        let Contents=[]
        
        try {
            let file = fs.readFileSync(this.nombreArchivo,'utf-8')
            Contents=JSON.parse(file)
        } catch (error) {
            console.log('No hay archivo')
        }
        if(num==true){
            Contents.forEach(ele => {
                if(ele.id!=id){
                    Cont.push(ele)
                    
                }
                
            });
            let identificador=1
            Cont.forEach(ele=>{
                
                ele.id=identificador
                identificador++
                })
        }else{
            Contents.forEach(ele => {
                console.log(ele[0])
                if(ele[0].id!=id){
                    Cont.push(ele)
                    
                }
                
            });
            /* let identificador=1
            Cont.forEach(ele=>{
                
                ele.id=identificador
                identificador++
                }) */
        }
        
    
    fs.writeFileSync(this.nombreArchivo, JSON.stringify(Cont))
    
    }
     
}

module.exports = {Container}