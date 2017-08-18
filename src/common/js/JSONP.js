import dataJsonp from 'jsonp'

export default function jsonp(url,data,option){
	url+= (url.indexOf('?')>0?'&':'?')+parm(data); 
	return new Promise(function(resolve,reject){
		dataJsonp(url,option, (err,data)=>{
			if(!err){
				resolve(data)
			}else{
				reject(err)
			}
		})  
	})
}

function parm(data) {
	let url = "";
	let dataArr=Object.keys(data);
	if(dataArr.length>0){
		dataArr.forEach(item=>{
			url+=`&${item}=${data[item]?encodeURIComponent([item]):''}`
		})
	}
	return url?url.slice(1):''
}