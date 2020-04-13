const request = require('request')

const showWeather = require('./forecast')

const geoCodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places'

const accessToken = 'pk.eyJ1Ijoic2luZ2htYTMiLCJhIjoiY2s4ZHJhZmw0MDA0MTNucGFtMm10MTlxeiJ9.UGTHT_0KtL19x-Ln_dqDhg'

const geoCodedData = (a, callback)=>{
  request({url:geoCodeURL+"/"+encodeURIComponent(a)+".json?access_token="+accessToken+"&limit=1",json: true}, (error, {body})=>{
    if(error){
      callback('Unable to connect to Geocode Api', undefined)
      //console.log("Unable to connect to Geocode Api")
    }else if(body.features.length===0){
      callback('Invalid address. Please provide vaild address', undefined)
      // console.log("Invalid address. Please provide vaild address")
    }else{
      callback(undefined, {
        Latitude:body.features[0].center[1],
        Longitude:body.features[0].center[0],
        Location:body.features[0].place_name
      })
      // const lng = response.body.features[0].center[0]
      // const lat = response.body.features[0].center[1]
      // const location = response.body.features[0].place_name
     // console.log(response);
     //showForecast(location)
    
    }
  })

}


module.exports = geoCodedData