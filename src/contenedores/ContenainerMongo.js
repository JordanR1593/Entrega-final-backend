import * as model from "../../src/models/productos";
const mongoose = require('mongoose');

class ContainerMongo {
  constructor(model) {
    const URL='mongodb://localhost:27017/ecommerce'
    mongoose.connect(URL, {
      useNewUrlParser: true, 
      useUnifiedTopology: true
    }, () => console.log('Connected'))

    this.model = model;
  }
}

module.exports = ContainerMongo;