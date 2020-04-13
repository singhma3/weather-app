const request = require('request')

const url = 'http://api.weatherstack.com/current?access_key=88e260e28d36d99d2330e89702515fda&&query='

// const showWeather = (lat,lng, location)=>{
//     //console.log(url+lat+','+lng+'?units=si')
//     request({url:url+lat+','+lng+'?units=si', json: true},(error, response)=>{
//       if(error){
//           console.log('Unable to connect to Weather api')
//       }else if(response.body.error){
//           console.log('Unable to find weather details for provided location')
//       }else{
//         console.log('It is currently '+response.body.currently.temperature+' degrees at '+location+'. There is '+response.body.currently.precipProbability+'% chances of rain')
//        // console.log('It is currently HT'+response.body.daily.data[0].temperatureHigh+' degrees out. There is '+response.body.currently.precipProbability+'% chances of rain')
//       }
//     })
//   }

const showWeather = (lat,lng,  callback)=>{
  //console.log(url+lat+','+lng+'?units=si')
  request({url:url+lat+','+lng+'&units=m', json: true},(error, {body})=>{
    if(error){
        callback('Unable to connect to Weather api', undefined)
    }else if(body.error){
        callback('Unable to find weather details for provided location', undefined)
    }else{
      callback(undefined,{
        currTemperature:body.current.temperature,
        currPrecip:body.current.precip
      })
    }
  })
}

module.exports = showWeather