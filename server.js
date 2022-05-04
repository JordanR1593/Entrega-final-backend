const {ProductContainer} = require("./src/models/ProductContainer")
const {CarritoContainer} = require("./src/models/CarritoContainer")

const express = require("express");
const {Router}=express

const app = express();
const PORT = 8080;

const products=new ProductContainer()
const carrito=new CarritoContainer()
app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))

//GET

app.get('/',(req,res)=>{
    let productos = products.getAllContent()
    res.json((productos))
})

app.get('/:id',(req,res)=>{
    let id= req.params.id
    console.log("id: "+id)
    let productos = products.getContentById(id)
    
    res.json((productos))
})

//POST
app.post("/",(req,res)=>{
    
    res.json(products.saveProducto(req.body.nombre,req.body.price))
})
//PUT
app.put("/:id",(req,res)=>{
    let id= req.params.id
    res.json(products.editProductById(id,req.body.nombre,req.body.price))
})
//DELETE
app.delete("/:id",(req,res)=>{
    let id= req.params.id
    res.json(products.deleteContentById(id))
})

const server=app.listen(PORT, ()=>{
    console.log("escuchando puerto 8080")
})
server.on("error", error=> console.log(`Error en servidor ${error}`))