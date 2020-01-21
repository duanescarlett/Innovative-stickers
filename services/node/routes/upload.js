const express = require('express');
const router = express.Router()
var multer  = require('multer')
const Photo = require('../db/model/Photos')
const User = require('../db/model/User')
const Tag = require('../db/model/Tag')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname)
    }
})

const upload = multer({storage: storage, limits:{
    fileSize: 1024 * 1024 * 5
}})

router.post('/', upload.single('sticker'), (req, res, next) => {
    // console.log(req)
    
    Photo.create({
        name: req.file.filename,
        user: req.session.email
    })
    .then(() => {
        // console.log(req.body.tags)
        var chops = req.body.tags.split(", ")

        chops.forEach((tag) => {
            
            Tag.create({
                name: tag,
                photo_name: req.file.filename
            })
            .then(() => {
                console.log("The tag called: " + tag + " was added")
            })
            .catch(err => next(err))
        }) 

        if(req.file) {
            res.redirect('../../userhome')
        }
        
    })
    .catch(err => next(err));

})

router.post('/proPicUpload', upload.single('profilePic'), (req, res, next) => {
    // console.log(req)
    
    User.update({
        profilePic: req.file.filename
    }, {
        where: {
            email: req.session.email
        }
    })
    .then(() => {
        if(req.file) {
            res.redirect('../../userhome')
        }
    })
    .catch(err => next(err));

})

module.exports = router;