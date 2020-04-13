const path = require("path")
const express = require('express')
const hbs = require('hbs')

const app = express()

const geoCode = require('./utils/geocode')
const showWeather = require('./utils/forecast')

// Set paths for Express config
const directoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(directoryPath))

app.get('', (req, res)=>{
    res.render('index',{
        title: 'Home Page',
        name: 'Manjeet Singh N'
    })
}).get('/about', (req,res)=>{
    res.render('about',{
        title:'About Me',
        name: 'Manjeet Singh N'
    })
}).get('/help',(req,res)=>{
    res.render('help',{
        message: 'This is a help message',
        title:'Help',
        name:'Manjeet Singh N'
    })
})
app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Please enter a valid address'
        })
    }
    geoCode(req.query.address,(error, {Latitude, Longitude, Location}={})=>{            

        if(error){
            return res.send({
                    error
            })
            //return console.log(error)
        }
          showWeather(Latitude,Longitude,(error, {currTemperature, currPrecip})=>{
                if(error){
                    return res.send({
                        error
                })
                   //return console.log(error)
                }

                res.send({
                    Forecast: 'It is currently '+currTemperature+' degrees at '+Location+'. There is '+currPrecip+'% chances of rain'
            })
                // console.log('It is currently '+currTemperature+' degrees at '+Location+'. There is '+currPrecip+'% chances of rain')                        
            })                
    })
    
})

app.get("/product", (req, res)=>{
    if(!req.query.search){
       return res.send({
            error:"Please provide a search term"
        })
    }
    res.send({
        products: []
    })
})
app.get('/help/*',(req, res)=>{
    res.render('error',{
        title: '404',
        errorMessage: 'Help document not found',
        name: 'Manjeet Singh N'
    })
}).get('*',(req,res)=>{
    res.render('error',{
        title: '404',
        errorMessage: 'Page not found',
        name: 'Manjeet Singh N'
    })
})

app.listen(3000,()=>{
    console.log('Server started at port 3000')
})