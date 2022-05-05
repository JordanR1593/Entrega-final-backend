const express = require("express");
const {Router}=express
const carritosRoutes= Router()
const {CarritoContainer}=require("../CarritoContainer")
const carrits=new CarritoContainer()

//GET

    carritosRoutes.get('/',(req,res)=>{
        let carritos = carrits.getAllContent()
        res.json((carritos))
    })
    
    carritosRoutes.get('/:id',(req,res)=>{
        let id= req.params.id
        console.log("id: "+id)
        let carritos = carrits.getContentById(id)
        
        res.json((carritos))
    })
    
    //POST
    carritosRoutes.post("/",(req,res)=>{
        
        res.json(carrits.saveCarrito(req.body.nombre,req.body.price))
    })

    carritosRoutes.post("/:id/products",(req,res)=>{
        
        res.json(carrits.saveProductsCarrito(req.params.id,req.body.nombre,req.body.price))
    })
    //PUT
    /* carritosRoutes.put("/:id",(req,res)=>{
        let id= req.params.id
        res.json(carrits.editProductById(id,req.body.nombre,req.body.price))
    }) */
    //DELETE
    carritosRoutes.delete("/:id",(req,res)=>{
        let id= req.params.id
        res.json(carrits.deleteContentById(id,false))
    })
    
    

module.exports=carritosRoutes
