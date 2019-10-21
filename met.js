
const request = require('request') 

const artFunc = function(search, callback){
	const url = 'https://collectionapi.metmuseum.org/public/collection/v1/search?q=' + search
	request({url, json:true}, function(error, response){
		if(error){
			callback(error, undefined)
		}else{
			const data = response.body
			if(data.Response == 'False'){
				callback(data.Error, undefined)
			}else{
				const obj = {
					searchT: search,
					total: data.total,
					objId: data.objectIDs[0]
				}
				callback(undefined, obj)
			}
		}
	})
}

const objFunc = function(objId, search, callback){
	var searchT = search
	const url = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/' + objId
	request({url, json:true}, function(error,response){
		if(error){
			callback('Unable to connect to art service', undefined)
		}else{
			const data = response.body
			if(data.Response == 'False'){
				callback(data.Error, undefined)
			}
			const obj = {
				artist : data.constituents[0].name,
  				title: data.title,
			  	year: data.objectEndDate,
			  	technique: data.medium,
			  	metUrl: data.objectURL
			}
			callback(undefined, obj)
		}
	})
}

module.exports = {
	artFunc : artFunc,
	objFunc : objFunc
}