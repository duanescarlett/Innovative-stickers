const createError = require('http-errors')
const express = require('express')
const bodyParser = require('body-parser')
const handlebars = require('express-handlebars')
const jwt = require('jsonwebtoken')
const authRouter = require('./routes/security')
const upload = require('./routes/upload')
const secRoute = require('./routes/security')
// const Photo = require('./db/model/Photos')
// const User = require('./db/model/User')

const app = express()

// Setup handlebars template engine
app.engine('handlebars', handlebars())
app.set('view engine', 'handlebars')

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(secRoute)

app.use('/public', express.static(__dirname + '/static'))
app.use('/uploads', express.static(__dirname + '/uploads'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
    // res.render('home')
})

app.get('/home', (req, res, next) => {
    if(req.session.loggedin){
        res.cookie('cookie', req.session.id)
        User.findOne({
            where: {
                email: req.session.email
            }
        })
        .then(img => {
            console.log("this " + img.profilePic)
            proPic = img.profilePic

            Photo.findAll({
                attributes: ['name', 'user']
            })
            .then(pic => {
                console.log(pic)
                res.render('userHome', {
                    email: req.session.email,
                    photo: pic,
                    profilePic: proPic
                })
            })
            .catch(err => next(err));
        })
        .catch(err => next(err))
    }
    else{
        res.render('home')
    }
})

app.get('/logout', (req, res) => {
    req.session.loggedin = false
    res.render('home')
})

app.get('/user', (req, res, next) => {
    res.cookie('cookie', req.session.id)
    if(req.session.loggedin){

        let dp = undefined

        User.findOne({
            where: {
                email: req.session.email
            }
        })
        .then(img => {
            console.log("this " + img.profilePic)
            proPic = img.profilePic

            Photo.findAll({
                attributes: ['name', 'user']
            })
            .then(pic => {
                res.render('userHome', {
                    email: req.session.email,
                    photo: pic,
                    profilePic: proPic
                })
            })
            .catch(err => next(err))
        })
        .catch(err => next(err))
    }
    else{
        res.render('home')
    }
})

app.get('/profile', (req, res) => {
    res.cookie('cookie', 'cooking')
    if(req.session.loggedin){
        res.render('profile', {email: req.session.email})
        // res.send(req.session)
    }
    else{
        res.send("Please login to view this page...")
    }
})

app.get('/login', (req, res) => {
    // Create the token for the session
    let token = jwt.sign({
        user: username
    }, process.env.JWT_KEY, {
        expiresIn: "24h"
    })
    res.render('login')
})

app.get('/signup', (req, res) => {
    res.render('signUp', {email: req.session.email})
})

app.get('/gallery', (req, res) => {
    res.render('gallery', {email: req.session.email})
})

app.get('/propic', (req, res) => {
    res.render('uploadPropic')
})

app.get('/uploadSticker', (req, res) => {
    if(req.session.loggedin){
        res.render('uploadSticker', {email: req.session.email})
    }
    else{
        res.render('login')
    }
})

app.use('/auth', authRouter)
app.use('/upload', upload)

app.use((req, res, next) =>{
    next(createError(404))
})

app.use(function ( err, req, res, next) {
    res.status(err.status || 500);
    res.send({
        message: err.message
    })
})

app.listen(3001)

module.exports = app