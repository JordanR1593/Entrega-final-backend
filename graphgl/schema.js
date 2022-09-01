const {buildSchema} = require('graphql');

let schema = buildSchema(`
  type Query {
      getPersonaById(id: Int!): Persona
      getPersonasByName(nombre: String): [Persona]
      getAllPersonas: [Persona]
  },
  type Mutation {
      updatePersona(id: Int!, nombre: String): Persona
  },
  type Persona {
      id: ID!
      nombre: String
      edad: Int
  }
`);


const personas = [
  {
    id: 1,
    nombre: 'Jorge',
    edad: 40
  },
  {
    id: 2,
    nombre: 'Carlos',
    edad: 25
  },
  {
    id: 3,
    nombre: 'Gerardo',
    edad: 20
  },
  {
    id: 4,
    nombre: 'Jose',
    edad: 23
  },
  {
    id: 5,
    nombre: 'Carlos',
    edad: 39
  }
];


class Schema {
    constructor(){}
}



var getPersonaById = function (args) {
  var id = args.id;
  return personas.filter(persona => {
      return persona.id == id;
  })[0];
}

var getPersonasByName = function (args) {
  if (args.nombre) {
      var nombre = args.nombre;
      return personas.filter(persona => persona.nombre === nombre);
  } else {
      return personas;
  }
}

var getAllPersonas = function () {
  return personas
}

var updatePersona = function ({ id, nombre }) {
  personas.map(persona => {
      if (persona.id === id) {
          persona.nombre = nombre;
          return persona;
      }
  });
  return personas.filter(persona => persona.id === id)[0];
}


