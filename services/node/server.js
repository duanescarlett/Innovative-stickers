const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const PORT = 3001
const User = require('./db/model/User')


app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/api/users', function(req, res) {
    res.json([
        "Sally",
        "Bernie",
        "Robbie",
    ])

    // User.findAll()
    //     .then(gig => {
    //         console.log(gig)
    //         res.sendStatus(200)
    //     })
    //     .catch(err => console.log("This:->  " + err))
})

app.listen(PORT, function() {
    console.log("Node Server running on PORT:" + PORT)
})