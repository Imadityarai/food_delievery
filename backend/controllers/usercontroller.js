import userModel from "../models/user_model.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"

//login user
const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"7d"})
}
const loginUser=async(req,res)=>{
const {email,password}=req.body;
if (typeof email !== "string" || typeof password !== "string") {
    return res.status(400).json({success:false,message:"Email and password are required"})
}
try{
    const user =await userModel.findOne({email:email.trim().toLowerCase()});
    if(!user){
        return res.status(401).json({success:false,message:"Email or password is incorrect"})
    }
    const isMatch=await bcrypt.compare(password,user.password)
if(!isMatch){
    return res.status(401).json({success:false,message:"Email or password is incorrect"})
}
const token=createToken(user._id);
res.json({success:true,token});
}
catch(error){
   console.error("Login failed:", error);
   return res.status(500).json({success:false,message:"Unable to log in"})
}
}

const registerUser=async (req,res)=>{
const {name,password,email}=req.body;
if (typeof name !== "string" || !name.trim()) {
    return res.status(400).json({success:false,message:"Name is required"})
}
if (typeof email !== "string" || !validator.isEmail(email.trim())) {
    return res.status(400).json({success:false,message:"Enter a valid email address"})
}
if (typeof password !== "string" || password.length < 8) {
    return res.status(400).json({success:false,message:"Password must be at least 8 characters"})
}
const normalizedEmail = email.trim().toLowerCase();
try{
const exists=await userModel.findOne({email:normalizedEmail});
if(exists){
    return res.status(409).json({success:false,message:"An account with this email already exists"})
}
const salt=await bcrypt.genSalt(10)
const hashedPass=await bcrypt.hash(password,salt);

const newUser=new userModel({
    name:name,
    email:normalizedEmail,
    password:hashedPass,
})
const user =await newUser.save()
const token=createToken(user._id)
res.json({success:true,token});
}
catch(error){
    console.error("Registration failed:", error);
    if (error?.code === 11000) {
        return res.status(409).json({success:false,message:"An account with this email already exists"})
    }
    return res.status(500).json({success:false,message:"Unable to register. Check the API server logs."})

}
}
export {loginUser,registerUser};
