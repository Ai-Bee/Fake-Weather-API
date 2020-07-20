const express = require('express')
const app = express()

const cors = require('cors')

app.use(cors());

const weatherData = require('./data')

const port = process.env.PORT || 4000;

let findObject = (name) => {
     let result = weatherData.filter(el => el.city.toLowerCase() ==  name.toLowerCase() )
     return result;
}

app.get('/cities/:name', (req, res) => {
     const name = req.params.name;
     let answer = findObject(name);
     if(!answer.length == 0){
          res.json(answer)
     } else {
          res.send("Sorry, we don't seem to have data for that city")
     }
    
})

app.get("/cities", (req, res) => {
     const theData = weatherData
     const names = theData.map(el => el.city);
     const lastName = names.pop()
     res.send(`The available cities are ${names} and ${lastName}`)
})

app.listen(port, () => {
     console.log("We're live on " + port + "!!")
})
