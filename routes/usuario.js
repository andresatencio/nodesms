/**
 * Dependencias
 */
var User = require('../models/models'),
	pass = require('pwd'),
	colors = require('colors');
/**
 * Ruta para generar nuevo usuario.
 * app.post('/register', )
 */
exports.nuevoUsuario = function(req, res){

	/*
	 * Funcion que verifica que no exista 
	 * un usuario duplicado
	 */
	function usuarioDuplicado (err, doc){
	 	if (err) {
				res.send("Error", 500);
			}
			if (doc != null) {
				res.send("Error", 404);
			}
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
			      res.send("Error", 500);
			      return;
			    }
			    console.log("Se registro USUARIO OK: \n".green + user);
			    res.redirect('/');
			})
	}
	User.findOne({ email: req.body.email }, usuarioDuplicado);
};

