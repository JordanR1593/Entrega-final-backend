const express = require("express");
const {Router}=express
const productsRoutes= Router()
const {ProductContainer}=require("../ProductContainer")
const products=new ProductContainer()

//GET

    productsRoutes.get('/',(req,res)=>{
        let productos = products.getAllContent()
        res.json((productos))
    })
    
    productsRoutes.get('/:id',(req,res)=>{
        let id= req.params.id
        console.log("id: "+id)
        let productos = products.getContentById(id)
        
        res.json((productos))
    })
    
    //POST
    productsRoutes.post("/",(req,res)=>{
        
        res.json(products.saveProducto(req.body.nombre,req.body.price))
    })
    //PUT
    productsRoutes.put("/:id",(req,res)=>{
        let id= req.params.id
        res.json(products.editProductById(id,req.body.nombre,req.body.price))
    })
    //DELETE
    productsRoutes.delete("/:id",(req,res)=>{
        let id= req.params.id
        res.json(products.deleteContentById(id))
    })
    
    

module.exports=productsRoutes
