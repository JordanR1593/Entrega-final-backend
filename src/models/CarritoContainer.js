
const fs = require("fs");
const {Container}= require("./Container")
class CarritoContainer extends Container {
    constructor(){
        super('./src/models/data/carritos.json')
       /*  this.nombreArchivo=fileName; */
        this.id=0
        
    }

    saveCarrito(nombre){
       
        let carritos=null;
        try {
            
            carritos=(this.getAllContent())
        } catch (error) {
            this.id=1
            let carrito= [{id:this.id,carrito:nombre}]
            carritos.push(carrito)
            fs.writeFileSync(this.nombreArchivo, JSON.stringify(carritos))
            console.log("se crea archivo carrito")
        }
        carritos.length>0?this.id=carritos.length+1:this.id=1
        let carrito= [{id:this.id,carrito:nombre}]
    
        carritos.push(carrito)
        
                
        fs.writeFileSync(this.nombreArchivo, JSON.stringify(carritos))
    }
    saveProductsCarrito(id,nombre,precio){
        
        let carritos=[];
        let producto
        try {
            
            carritos=(this.getAllContent())
        } catch (error) {
            console.log('No hay archivo')
        }
        
        carritos.forEach(element => {
            if(id==element[0].id){
                
                if(element[0].data==undefined){
                    console.log("hi")
                    element[0].data=[{nombre:nombre,precio:precio,id:1}]
                }else{
                    element[0].data.length>0?this.id=element[0].data.length+1:this.id=1
             producto= {nombre:nombre,precio:precio,id:this.id}
                element[0].data.push(producto)
                }
                
            }
        });
        
        
    
        
        
                
        fs.writeFileSync(this.nombreArchivo, JSON.stringify(carritos))
    }
    deleteProductCarrito(id,nombre){
        let carritos=[];
        try {
            
            carritos=(this.getAllContent())
        } catch (error) {
            console.log('No hay archivo')
        }
        carritos.forEach(element => {
            if(id==element.id ){
                element.forEach(element1 => {
                    if(nombre!=nombre){
                        element1.push(element)
                    }
                });
                
            }
        });
        
        
    
        productos.push(producto)
        
                
        fs.writeFileSync(this.nombreArchivo, JSON.stringify(productos))
    }

    
    
     
}

module.exports = {CarritoContainer};