var Analise = require('./models/analise');
var Qs = require('qs');

function getAnalises(res){
	Analise.find(function(err, analises) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(analises); // return all analises in JSON format
		});
};

module.exports = function(app) {

	// analise
	app.get('/api/analises/tag/:aTagDoEquipamento', function(req, res) {

		// use mongoose to get all analises with a tag
		Analise.find({tagDoEquipamento : req.params.aTagDoEquipamento}, function(err, analise) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(analise); // return the analise in JSON format
		});
	});


	app.get('/api/analises/:analise_id', function(req, res) {

		// use mongoose to get one specific analise in the database
		Analise.findOne({_id : req.params.analise_id}, function(err, analise) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(analise); // return the analise in JSON format
		});
	});

	// get all analises
	app.get('/api/analises', function(req, res) {

		// use mongoose to get all analises in the database
		getAnalises(res);
	});

	// create analise and send back all analises after creation
	app.post('/api/analises', function(req, res) {

		// create a analise, information comes from AJAX request from Angular
		Analise.create({
			tagDoEquipamento: req.body.tagDoEquipamento,  
		    nDaAnaliseDoLaboratorio: req.body.nDaAnaliseDoLaboratorio,  
		    laboratorio: req.body.laboratorio,  
		    dataDaAnalise: req.body.dataDaAnalise,  
		    umidadeRelativaDoAr: req.body.umidadeRelativaDoAr,  
    		temperaturaAmbiente: req.body.temperaturaAmbiente,  
		    emOperacao: req.body.emOperacao,  
		    pontoDeColeta: req.body.pontoDeColeta,  
		    temperaturaDoOleo   : req.body.temperaturaDoOleo,  

		    //cromatográfico
		    h2: req.body.h2,  
		    o2: req.body.o2,  
		    n2: req.body.n2,  
		    ch4: req.body.ch4,  
		    co: req.body.co,  
		    co2: req.body.co2,  
		    c2h4: req.body.c2h4,  
		    c2h6: req.body.c2h6,
		    c2h2: req.body.c2h2,
		    tgc: req.body.tgc,
		    tgg: req.body.tgg,
		    conclusoesCroma: req.body.conclusoesCroma,
			
			//fisico quimico

			done : false
		}, function(err, analise) {
			if (err)
				res.send(err);
			
			// get and return all the analises after you create another
			getAnalises(res);
		});

	});

	// delete a analise
	app.delete('/api/analises/:analises_id', function(req, res) {
		Analise.remove({
			_id : req.params.analises_id
		}, function(err, analises) {
			if (err)
				res.send(err);

			getAnalises(res);
		});
	});
};