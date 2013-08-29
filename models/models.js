//Dependencies
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	pwd = require('pwd');
	
//Scheme User
var schemaUser = {
	provider: String,
  	uid: String,
  	nombre: String,
  	image: String,
  	creado: {type: Date, default: Date.now},
	email: {type: String, unique: true, trim: true, lowercase: true },
	pass: {type: String},
	sms: [{ destino: Number, origen: Number , msj: String}]
};

var models = Schema(schemaUser);


/**
 * Middleware encrypts the user's password
 * Sera implementado a futuro
 */
/*
modelUser.pre('save', function(next) {

    var user = this;
    
    //hash
    pwd.hash(user.pass, "=)" ,function(err, hash){
		
		if(err){
			console.log('Error generated hash');
		}
		
		user.pass = hash;
		user.salt = "Guillermina";
		user.estado = true;

		next();

	});
	
});
*/

var User = mongoose.model('Usuario', models);

//Exports User
module.exports = User;




