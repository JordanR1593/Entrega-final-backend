
const mongoose = require('mongoose');
require('dotenv').config()
const configs = require('../config/globals')


console.log(configs.MONGO_URI);



const usuariosCollection = 'usuarios';

const UsuarioSchema = new mongoose.Schema({
    firstName: {type: String, required: true, max: 100},
    lastName: {type: String, required: true, max: 100},
    email: {type: String, required: true, max: 100},
    username: {type: String, required: true, max: 100},
    password: {type: String, required: true, max: 100}
});

module.exports= mongoose.model(usuariosCollection, UsuarioSchema)