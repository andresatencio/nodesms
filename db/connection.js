var data = require("./data"),
  mongoose = require("mongoose"),
  db = mongoose.connection;

/*
 * Se conecta con la base
 */
module.exports = mongoose.connect(data.uri, data);

/*
 * Captura los eventos que pueden suceder al conectarse a la db
 */

//Error
db.on('error', function (data){
  console.log("Error al conectarse con la base de datos");
  console.log("Mongodb:\n".error + data);
});

//Conectado
db.on('connected', function (){
  console.log("La db esta conectada OK");
});

//Desconectado
db.on('disconnected', function (){
  console.log("La db se desconecto");
});

//Abierta
db.once('open', function () {
  console.log("La db ya esta disponible OK");
});
