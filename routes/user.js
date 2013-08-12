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
exports.newUser = function (req, res){

	/*
	 * Funcion que verifica que no exista 
	 * un usuario duplicado
	 */
	function userDuplicate (err, doc){
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

	User.findOne({ email: req.body.email}, userDuplicate);

};

exports.login = function (req, res){

	console.log(req.param("email"));
	console.log(req.param("pass"));
	/*
	if (req.session.user != undefined) {
		res.redirect("/admin");
	}
	*/
	User.findOne({ email: req.body.email },

		function (err, doc){

			if(err) {
				res.send("Error", 500);
			}

			if ( doc == null ){
				console.log("No esta registrado : ".yellow + req.body.email.toString().green);
				res.redirect("/");

			} else if ( doc.pass == req.body.pass ) {
				req.session.user = doc;
				res.send("Antorizado", 200);

			} else {
				res.send("No autorizado", 401);
			}
		})
};