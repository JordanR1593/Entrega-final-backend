const express = require("express");
const {Router}=express
const carritosRoutes= Router()
const {CarritoContainer}=require("../CarritoContainer")
const carrits=new CarritoContainer()



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
    
    
    carritosRoutes.post("/",(req,res)=>{
        
        res.json(carrits.saveCarrito(req.body.nombre,req.body.price))
    })

    carritosRoutes.post("/:id/products",(req,res)=>{
        
        res.json(carrits.saveProductsCarrito(req.params.id,req.body.nombre,req.body.price))
    })
    
    carritosRoutes.delete("/:id",(req,res)=>{
        let id= req.params.id
        res.json(carrits.deleteContentById(id,false))
    })
    
    io.on("connection", (socket) => {
        try {
         
      
          const chat = chatContainer.read();
          const dataContainer = { id: 1, posts: [] };
          dataContainer.posts = chat;
          const chatNormalizado = normalization(dataContainer);
      
          socket.emit("chat", chatNormalizado);
      
          socket.on("newChat", (data) => {
            data.author.avatar = "avatar";
            chatContainer.save(data);
            
            chat.push(data);
            
            dataContainer.posts = chat;
            let dataNocomprimida = JSON.stringify(dataContainer).length;
            let dataNormalized = normalization(dataContainer);
            let dataComprimida = JSON.stringify(dataNormalized).length;
            compression = compressionRatio(dataNocomprimida, dataComprimida);
          });
      
          try {
            socket.emit("compression", compression);
          } catch (error) {
            let logger = log4js.getLogger("error");
      
            logger.error("Error: En la Compresion del Chat");
            console.log(error);
          }
        } catch (error) {
          let logger = log4js.getLogger("error");
      
          logger.error("Error: Hubo un error en la ruta del Chat");
          console.log(error);
        }
      });

module.exports=carritosRoutes
