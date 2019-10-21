
const express = require('express')
const app = express()
const museum = require('./met.js')
const port = process.env.PORT || 3000

app.listen(port, function(){ 
	console.log('Up and running Marcelas Exam 2!')
})

app.get('', function(req,res){
	res.send({
		greeting: "Welcome to Marcela's 100% Exam 2!"
	})
})

app.get('/students/:id', function(req,res){
	if(!req.params.id){
		res.send({
			error: 'Matricula incorrecta'
		})
	}else{
		if(req.params.id == 'A00000001'){
			res.send({
				id: "A00815888",
				fullname: "Marcela Ma. Garza Botello",
				nickname: "100 en este examen",
				age: 25
			})
		}
	}
})

app.get('/met',function(req,res){
	if(!req.query.search){
		return res.send({
			error: 'Debes enviar un search term'
		})
	}
	museum.artFunc(req.query.search, function(error,response){
		if(error){
			return res.send({
				error: error
			})
		}
		if(response.objId){
			var searchT = response.searchT
			museum.objFunc(response.objId, response.searchT, function(error, response){
				if(error){
					return res.send({
						error: error
					})
				}
				return res.send({
					searchTerm: searchT,
					artist : response.artist,
					title: response.title,
					year: response.year,
					technique: response.technique,
					metUrl: response.metUrl
				})
			})
		}else{
			return res.send(response)
		}
	})
})

app.get('*', function(req,res){
	res.send({
		error: 'Ruta invalida pero este examen es para 100'
	})
})