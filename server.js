


const express = require("express");
const app = express();
const routesProducts = require("./src/models/routes/routesProductos")
const routesCarritos=require("./src/models/routes/routesCarrito")



const PORT = 8080;



app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))
app.use('/api/products', routesProducts)
app.use('/api/carritos', routesCarritos)

const server=app.listen(PORT, ()=>{
    console.log("escuchando puerto 8080")
})
server.on("error", error=> console.log(`Error en servidor ${error}`))