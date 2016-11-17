var express = require('express');
var bodyParser = require('body-parser');
var json2csv = require('json2csv');
var fs = require('fs');

var nodemailer = require('nodemailer');
var mandrillTransport = require('nodemailer-mandrill-transport');

// Start Server
var app = express();
// var router = express.Router();
var port =  3000 ;
// Public path configuration
app.use(express.static(__dirname + '/App'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.post('/send', sendEmail);

function sendEmail(req, res) {

	var data = req.body;
	
	var transport = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
		    user: 'uai.case.registros@gmail.com',
		    pass: '3l3c720n'
		}
	});


	var bdy = "<h3>Gracias por participar de la Charla.</h3></br><p>Lo invitamos en los proximos dias a debatir dentro de un foro sobre la tematica.</p><a href='https://uai-registro.firebaseapp.com/#/blog'>VISITA NUESTRO BLOG</a> ";


	 var mailOptions = {
	    from: 'UAI <uai.case.registros@gmail.com>',
	    to: data.mail,
	    cc: 'carlos.neil@uai.edu.ar',
	    subject: "Caiiaasi 2016",
	    text: 'La Estructura de los Artículos Científicos',
		html: bdy,
		attachments : [
			{
				filename: 'la estructura de los articulos cientificos (CONAIISI 2016).pdf',
            	content: fs.createReadStream('app/send.pdf')
			}
		]
	};

	 transport.sendMail(mailOptions, function(error, info){

		if(error){
	        console.log(error);
	        res.json({yo: 'error'});
	    }else{
			console.log("success")
	        res.redirect('/');
	    };
	});




}

// var csv = json2csv({ data: myCars, fields: fields });
//
// fs.writeFile('file.csv', csv, function(err) {
// 	if (err) throw err;
// 	console.log('file saved');
// });



// Start App
console.log('Starting App... \nlistening on port ' + port);
app.listen(port);
