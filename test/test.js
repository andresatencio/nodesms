var request = require('superagent');
var expect = require('expect.js');

function suma (a, b){
	return a + b;
}

describe('URL', function(){

	var url = "http://localhost:3000";

	it('/', function(done){
   		request.get(url).end(function(res){
    	expect(res).to.exist;
		expect(res.status).to.equal(200);
		done();
  		})
   	});
});