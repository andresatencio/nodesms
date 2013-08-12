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
exports.register = function (req, res){

	/**
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
			    user.sms.pull({dest: 3364212283, origen:3364212283, msj: "Que onda?"});
			    res.redirect('/');
			})
			
	}

	User.findOne({ email: req.body.email}, userDuplicate);

};

/**
 * Manejo del login
 */
exports.login = function (req, res){

	//En el caso de que la session esta vigente, lo redirecciona
	if (req.session.user != undefined) {
		res.redirect("/admin");
	}

	/**
	 * Funcion que valida login
	 */
	function userValidate (err, doc) {

		if(err) {
			res.send("Error", 500);
			return;
		}
		// Si doc es nulo, es que no esta registrado ese usuario
		if ( doc == null ) {
			console.log("No esta registrado : ".yellow + req.body.email);
			res.redirect("/");
			return;

		} else if ( doc.pass == req.body.pass ) {
			req.session.user = doc;
			res.send("Antorizado", 200);
			return;
			
		} else {
			res.send("No autorizado", 401);
		}
	};

	User.findOne({ email: req.body.email }, userValidate);
};

