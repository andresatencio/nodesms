/**
 * Dependencias
 */
var User = require('../models/models'),
	pass = require('pwd'),
	colors = require('colors'),
	tools = {};

/**
 * Validaciones, y otras yerbas
 */
tools = ( function (){

	var a1, a2;

	function validate (email, pass, cbAccion){

		if( email.length <= 0 ||
			email.length >= 15 ||
			pass.length <= 0 ||
			pass.length >= 10 ) {
			return cbAccion;
		}
	}

	return{
		
		validate: function (email, pass, cbAccion){
					return validate(email, pass, cbAccion);
				}

	}
})();


/**
 * Ruta para generar nuevo usuario.
 * app.post('/register', )
 */
exports.register = function (req, res){

	var email = req.body.email,
		pass = req.body.pass;

	tools.validate(email, pass,	res.send(404, "Error en registro"));

	

	//verifica nombre duplicado
	function userDuplicate (err, doc){
	 	
	 	if (err) {
			res.send(500, "Error");
		}
		if (doc != null) {
			res.send(404, "Error");
		}

		//Se crea usuario
		var user = new User({email: email, pass: pass });

		//Se guarda
		user.save(function(err) {
		    if (err) {
		      res.send("Error", 500);
		      return;
		    }
		    console.log("Se registro USUARIO OK: \n".green + user);
		    res.redirect('/');
		})
		//A sacar
		//user.sms.push({destino: 3364212283, origen:3364212283, msj: "Que onda?"});
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

