const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SecretKey = "$ahada12@3#";

const verifyToken = (req, res, next) => {
    const token = req.cookies;
    if(!token)
        return res.status(400).json({message: "Token required"});
    try {
        const decode = jwt.verify(token, SecretKey);
        req.user = decode;
    } catch(error){
        console.log(error);
        return res.status(400).json({message: "Invalid Token"})
    }
    next();

}

const signUp = async (req, res)=> {
    const {firstName, lastName, email, password} = JSON.parse(req.body.user);
    try{
        const user  = await User.findOne({email});
    if(user){
        return res.json({message: "User is already registered"});
    }
    const hashedPasword = await bcrypt.hash(password, 10);
    await User.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPasword,
        profilePicture: `/uploads/${req.file.filename}`,
    });
     return res.json({message: "User is created"})
    } catch(error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    } 
}

const login = async (req, res)=> {
    const {email, password} = req.body;
    try{
        const user  = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "User does not exist"})
        }
        const matchPassword = await bcrypt.compare(password, user.password);
        if(!matchPassword){
            return res.status(400).json({message: "Password incorret"});
        }
        const token = jwt.sign({email: user.email, id: user._id}, SecretKey);
        res.cookie('token', token);
        return res.json({message: "Login succesfuuly", token, email})
    }catch(error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
const getAllUsers = async (req, res) => {
    const email = req.query.email;
    const user = await User.findOne({email});
    res.status(200).json(user);
}

module.exports = { signUp, login, verifyToken, getAllUsers}