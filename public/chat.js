const socket = io.connect();


// --------------------

function renderChat(data) {
 
  const html = data.posts.map((elem, index) => {
    
      let fecha = new Date();

      let dia = fecha.getDate();
      let anio = fecha.getFullYear();
      let mes = fecha.getMonth() + 1;

      let hora = fecha.getHours() + ":";
      let minutos = fecha.getMinutes() + ":";
      let segundos = fecha.getSeconds();

      return `<div>
            <strong><h5>${elem.author.nombre} ${elem.author.apellido}:</h5></strong>
            <h6>Mensaje enviado ${dia}/${mes}/${anio} hora: ${hora}${minutos}${segundos}</h6>
            <p><em>${elem.text.text}</em></p>
        </div>`;
    })
    .join(" ");

  document.getElementById("filaTexto").innerHTML = html;
}
function addMessagechat(e) {
  const mensaje = {
    author: {
      email: document.getElementById("email").value,
      nombre: document.getElementById("nombre").value,
      apellido: document.getElementById("apellido").value,
      edad: document.getElementById("edad").value,
      alias: document.getElementById("alias").value,
    },
    text: { text: document.getElementById("texto").value },
  };

  socket.emit("newChat", mensaje);
  return false;
}

socket.on("chat", (data) => { 
  
  try {
    let authorSchema = new normalizr.schema.Entity(
      "E-mail",
      {},
      { idAttribute: "email" }
    );

    let postSchema = new normalizr.schema.Entity("POST", {
      author: authorSchema,
    });
    let dataSchema = new normalizr.schema.Entity("DATA", {
      posts: [postSchema],
    });

    let desnormalization = normalizr.denormalize(
      data.result,
      dataSchema,
      data.entities
    );

    
    renderChat(desnormalization);
  } catch (error) {
    console.log("ERROR - NO FUNCIONA");
    console.log(error);
  }
});



  