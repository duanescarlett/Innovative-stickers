const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const User = require('../db/model/User')

router.post('/', (req, res, next) => {
    User.findOne({
        where: {
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password)
        }
    })
    .then(user => {
        req.session.id = req.body.email
        req.session.loggedin = true
        req.session.email = req.body.email
        res.redirect('../../user')
    })
    .catch(err => next(err));
})

router.get('/logout', (req, res) => {
    req.session.destroy(function(err) {
        // cannot access session here
        // res.render('home')
        res.redirect('../../')
    })
})

router.post('/signup', (req, res, next) => {
    // console.log(req.body.age_over)
    let ans = false;
    if(req.body.age_over === 'on'){
        ans = true
    }
    User.create({
        name: req.body.name,
        email: req.body.email, 
        age_over: ans,
        password: bcrypt.hashSync(req.body.password)
    })
    .then(() => {
        req.session.loggedin = true
        req.session.email = req.body.email
        res.redirect('../../login')
    })
    .catch(err => next(err));
})

module.exports = router