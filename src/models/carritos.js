import mongoose from "mongoose";
const productosCollection = "productos"

const productosSchema = new mongoose.Schema({
    nombre:{type:String, required:true},
    precio:{type:Number, required:true}
})
export const productos = mongoose.model(productosCollection, productosSchema)