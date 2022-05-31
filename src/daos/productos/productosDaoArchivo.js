const fs = require("fs");
const {Container}= require("../Container")
class ProductDao extends Container {
    constructor(){
        super('../../data/productos.json')
       
        this.id=0
        
    }

    saveProducto(nombre,precio){
       
        let productos=[];
        
        try {
            
            productos=(this.getAllContent())
        } catch (error) {
            console.log('No hay archivo')
        }
        productos.length>0?this.id=productos.length+1:this.id=1
        let products= {nombre:nombre,precio:precio,id:this.id}
    
        productos.push(products)
        
                
        fs.writeFileSync(this.nombreArchivo, JSON.stringify(productos))
    }

    editProductById(id,nombre,precio){
        let productos=[]
        let product=null
        try {
            
            productos=this.getAllContent()
        } catch (error) {
            console.log('No hay archivo')
        }
        usuarios.forEach(user => {
        if(user.id==id){
            product=user
            user.nombre=nombre
            user.precio=precio
        }
    });
    fs.writeFileSync(this.nombreArchivo, JSON.stringify(productos))
    }
    
     
}

module.exports = {ProductDao};