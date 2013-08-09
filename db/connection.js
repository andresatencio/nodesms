var data = require("./data"),
  mongoose = require("mongoose"),
  db = mongoose.connection,

/*
 * Variables color para manejo de mensajes de consola
 * Seteo de colores
 */
  colors = require('colors');
  colors.setTheme({
    silly: 'rainbow',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'grey',
    info: 'green',
    data: 'grey',
    help: 'cyan',
    warn: 'yellow',
    debug: 'blue',
    error: 'red'
  });

/*
 * Se conecta con la base
 */
module.exports = mongoose.connect(data.uri, data);

/*
 * Captura los eventos que pueden suceder al conectarse a la db
 */

//Error
db.on('error', function (data){
  console.log("Error al conectarse con la base de datos".error);
  console.log("Mongodb:\n".error + data);
});

//Conectado
db.on('connected', function (){
  console.log("La db esta conectada OK".info);
});

//Desconectado
db.on('disconnected', function (){
  console.log("La db se desconecto".warn);
});

//Abierta
db.once('open', function () {
  console.log("La db ya esta disponible OK".info);
});
