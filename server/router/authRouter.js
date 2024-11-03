const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { signUp, login, verifyToken, getAllUsers}  = require('../controller/auth');


const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.resolve(`./public/uploads`))
    },
    filename: function(req, file, cb){
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const fileType = (req, file, cb) => {
    if ( file.mimetype == "image/png" || file.mimetype == "image/jpeg" || file.mimetype == "image/jpg" || file.mimetype == "application/pdf") {
    cb(null, true) } else { cb(null, false)}
    }

const upload = multer({ storage: storage, fileFilter: fileType})

router.get('/test', verifyToken, (req, res, next)=> {
    return res.json("Hello");
})
router.get('/user', getAllUsers)
router.post('/signup', upload.single('profile'), signUp)
router.post('/login', login)


module.exports = router