/**
 * Dependencias
 */
var User = require('../models/user'),
	pass = require('pwd');

/**
 * Ruta para generar nuevo usuario.
 * app.post('/register', )
 */
exports.nuevoUsuario = function(req, res){

	//Se arma objeto con la peticion
	var u = {
		email: req.body.email,
		pass: req.body.pass
	}

	//Se crea usuario
	var user = new User(u);

	//Se guarda
	user.save(function(err) {
	    if (err) {
	      throw err;
	      return;
	    }
	    console.log(user);
	  });
	res.redirect('/');
};

