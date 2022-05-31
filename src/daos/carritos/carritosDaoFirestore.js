const { ContainerFirestore } = require('../../contenedores/ContainerFirestore')

class CarritoDaoFirestore extends ContainerFirestore {
  constructor(){
    super('productos')
    this.id = 0
    this.checkId()
  }

  // Chequea para obtener el ultimo ID y asignarlo al id local (this.id)
  async checkId(){
    let carritos = await this.getAll()

    if(productos.length > 0) {

      this.id = parseInt(carritos[carritos.length - 1].id) + 1
    }
  }

  saveCarrito(nombre){
    if(carritos){
      console.log(carritos)
      this.save(carritos, this.id)
      // console.log(this.id)
      this.id++
      return carritos
    } else {
      return 'Not saved'
    }
  }

  updateUser(carritos, id){
    if(carritos) {
      console.log(carritos)
      this.update(carritos, id)
      return carritos 
    } else {
      return 'Not updated'
    }
  }
  saveProductsCarrito(id,nombre,precio){
    if(carritos) {
      console.log(carritos)
      this.SaveProductCarrito(carritos, id)
      return carritos 
    } else {
      return 'Not updated'
    }
    
}
 deleteProductCarrito(id){
  if(carritos) {
    console.log(carritos)
    this.delete( id)
    return carritos 
  } else {
    return 'Not updated'
  }
 }
}

module.exports = { CarritoDaoFirestore }