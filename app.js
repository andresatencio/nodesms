
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , connection = require('./db/connection')
  , routesUsuario = require('./routes/usuario')
  , colors = require('colors');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/que', routes.que);
app.post('/register', routesUsuario.nuevoUsuario);


http.createServer(app).listen(app.get('port'), function(){
  console.log("Guarda que arranca NODESMS!!!".rainbow);
  console.log("Express! Puerto: ".green + app.get('port').toString().yellow);
});
