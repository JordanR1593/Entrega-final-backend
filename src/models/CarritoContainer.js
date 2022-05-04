
const fs = require("fs");
const {Container}= require("./Container")
class CarritoContainer extends Container {
    constructor(){
        super('./src/models/data/productos.json')
       /*  this.nombreArchivo=fileName; */
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
        let producto= {nombre:nombre,precio:precio,id:this.id}
    
        productos.push(producto)
        
                
        fs.writeFileSync(this.nombreArchivo, JSON.stringify(productos))
    }

    editProductById(id,nombre,precio){
        let usuarios=[]
        let usuario=null
        try {
            
            usuarios=this.getAllContent()
        } catch (error) {
            console.log('No hay archivo')
        }
        usuarios.forEach(user => {
        if(user.id==id){
            usuario=user
            usuario.nombre=nombre
            usuario.precio=precio
        }
    });
    fs.writeFileSync(this.nombreArchivo, JSON.stringify(usuarios))
    }
    
     
}

module.exports = {CarritoContainer};