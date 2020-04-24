const express = require('express')
const router = express.Router()
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const redis = require('../db/redis')

const shash = (word) => {
    // Make a hash of the password
    let hash = crypto
        .createHash('sha256')
        .update(word)
        .digest('hex')
    return hash
}

router.post('/api/registration', (req, res) => {
    let email = req.body.email
    let password = req.body.password
    let con_pass = req.body.con_pass
    let type = req.body.type

    if(con_pass === password){
        let hash = shash(password)
        let num = Math.floor(Math.random() * 1000000000000)
        let time = Date.now()

        redis.get(email)
        .then(data => {
            if(data !== null){
                res.status(422).json({error: 'This email already exist'})
            }
            else{
                // Create the hash
                redis.client.hmset(num, [
                    'email', email,
                    'password', hash,
                    'type', type,
                    'timestamp', time
                ], (err, reply) => {
                    if(err){
                        res.status(422).json({error: 'This user already exist'})
                    }
                    else{
                        // Create the set
                        redis.client.set(email, num)
                        // Add user to the user list
                        redis.client.lpush('users', email)
                        console.log("User was added to datastore " + reply)

                        res.json({user: 'A new user was created'})
                    }
                })
            }
        })
    }
    else{
        res.json({error: 'Your passwords dont match'})
    }
})

router.post('/api/login', (req, res) => {
    let email = req.body.email
    let password = req.body.password

    // Create a session token
    let token = jwt.sign({
        email: email,
        time: Date.now()
    }, process.env.JWT_KEY, {
        expiresIn: "24h"
    })

    // If user exist and authenticate
    redis.get(email)
    .then(data => {
        if(data === null) res.status(422).json({error: 'This user does not exist.'})

        // Add session to datastore
        redis.client.hmset(data, [
            'token', token
        ], (err, reply) => {
            if(err){
                res.status(422).json({error: 'This user does not exist'})
            }
            else{
                redis.hgetall(data)
                .then(data => {
                    password = shash(password)
                    if(password === data.password){
                        redis.client.set('cache', data['type'],
                        (err, reply) => {
                            if(err) res.status(422).json({error: err})
                            else{
                                delete data.password
                                res.json({
                                    sessionToken: data['token'],
                                    type: data['type']
                                })
                            }
                        })
                    }
                    else{
                        res.json({error: 'The password or email address is incorrect'})
                    }
                })
                .catch(err => {
                    res.json({error: err})
                })
            }
        })
    })
    .catch(err => {
        res.json({error: err})
    })
})

module.exports = router