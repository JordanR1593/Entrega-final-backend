const ContainerMongo = require('../../contenedores/ContainerMongo')
const userModel = require('../../models/usuarios')

class UserDaoMongo extends ContainerMongo{
  constructor() {
    super(userModel);
  }
  async save(){
    const productosSaveModel = new model.carritos(producto)
    let productosSaved = await productosSaveModel.save()
    console.log(productosSaved)
  }
  async getAll(){
    console.log('Read all');
    let productos = await model.productos.find({});
    console.log(productos);
  }
  async update(id){
    let productosUpdate = await model.productos.updateOne(
      {nombre: 'Juan'},
      {$set: { precio: 654321 } }
    );
    console.log(productosUpdate);
  }
  async getById(id){
    let productosDelete = await model.productos.deleteOne(
      {nombre: 'Juan'}
  );
  }
} 

module.exports = { UserDaoMongo }