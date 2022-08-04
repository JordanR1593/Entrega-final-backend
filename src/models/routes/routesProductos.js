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
    
    
log4js.configure({
    appenders: {
      Console: { type: "console" },
      // errorFile: { type: "file", filename:'loggerError.log' },
      warnFile: { type: "file", filename: "warn.log" },
      errorFile: { type: "file", filename: "error.log" },
    },
    categories: {
      default: { appenders: ["warnFile", "Console"], level: "warn" },
      info: { appenders: ["Console"], level: "info" },
      error: { appenders: ["errorFile", "Console"], level: "error" },
    },
  });
  let compression = null;

  io.on("connection", (socket) => {
    try {
      let prueba = productos.read();
      socket.emit("messages", prueba);
      socket.on("new-message", (data1) => {
        productos.save(data1);
        prueba.push(data1);
  
        io.sockets.emit("messages", prueba);
      });
    } catch (error) {
      let logger = log4js.getLogger("errorConsole");
      logger.error("PROBANDO EL LOG DE ERROR");
    }
  });
    

module.exports=productsRoutes
