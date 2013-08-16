
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , connection = require('./db/connection')
  , routesUser = require('./routes/user')
  , colors = require('colors');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.cookieParser());
  app.use(express.session({ secret: "nodesms shhh" }));
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
app.post('/register', routesUser.register);
app.post('/login', routesUser.login);
app.get('/logout', routesUser.logout);


http.createServer(app).listen(app.get('port'), function(){
  console.log("Guarda que arranca NODESMS!!!".rainbow);

  console.log("Express! Puerto: ".green + app.get('port').toString().yellow);
});
