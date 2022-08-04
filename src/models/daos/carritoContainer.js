
const fs = require("fs");
const Contenedor = require("../../container/container");

class CarritoDaosArchivos extends Contenedor {
  constructor() {
    super("./cartStorage.txt");
  }
  saveCarrito(x) {
    let array = [];
    let object = x;

    try {
      let data = fs.readFileSync("./cartStorage.txt", "utf-8");
      
      array = JSON.parse(data);
    } catch {
      console.log("catch error");
    }
    object.id = array.length + 1;
    
    object.Timestamp = new Date();
    object.Timestamp += object.Timestamp.getTime();
    array.push(object);

    let lastId = array.length + 1; 
    fs.writeFileSync(this.route, JSON.stringify(array, null, "\t"));
    this.id = lastId++;
    return object;
  }
}


module.exports = CarritoDaosArchivos;