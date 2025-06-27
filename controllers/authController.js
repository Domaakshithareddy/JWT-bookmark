require('dotenv').config();
const User=require('../models/User');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken')
const {createAccessToken,createRefreshToken,sendTokens}=require('../utils/token');

const signupUser=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const existing=await User.findOne({email});
        if (existing) return res.status(400).json({message:'User already exists'});
        const newUser=new User({email,password});
        const accessToken=new createAccessToken({userId:newUser._id});
        const refreshToken=new createRefreshToken({userId:newUser._id});

        newUser.refreshTokens.push(refreshToken);
        await newUser.save();
        sendTokens(res,accessToken,refreshToken);
    }
    catch (err){
        res.status(500).json({ message: 'Signup failed', error: err.message });
    }
};

const loginUser=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if (!user) return res.status(400).json({message:'Invalid cred'});
        
        const isMatch=await bcrypt.compare(password,user.password)
        if (!isMatch) return res.status(401).json({message:'Invalid cred'});

        const accessToken=new createAccessToken({userId:newUser._id});
        const refreshToken=new createRefreshToken({userId:newUser._id});

        user.refreshTokens.push(refreshToken);
        await user.save();
        sendTokens(res,accessToken,refreshToken);
    }
    catch (err){
        res.status(500).json({ message: 'Login failed', error: err.message });
    }
};

const refreshAccessToken=async(req,res)=>{
    const {refreshToken}=req.body;
    if (!refreshToken) return res.status(401).json({message:'Missing refresh token'});

    try{
        const payload=jwt.verify(refreshToken, process.env.REFRESH_TOKEN);
        const user=await User.findById(payload.userId);
        if (!user || !user.refreshTokens.includes(refreshToken)) {
            return res.status(403).json({message:'Invalid refresh token'});
        }
        const newRefresh=createRefreshToken({userId:user._id});
        user.refreshTokens=user.refreshTokens.filter(rt=>rt!==refreshToken);
        user.refreshTokens.push(newRefresh);
        await user.save();
        const newAccess=createAccessToken({userId:user._id});
        sendTokens(res,newAccess,newRefresh);
    }
    catch (err){
        res.status(403).json({ message: 'Invalid token', error: err.message });
    }
};

const logoutUser=async (req,res)=>{
    const {refreshToken}=req.body;
    if (!refreshToken) return res.status(400).json({message:'Missing token'});
    try{
        const payload=jwt.verify(refreshToken,process.env.REFRESH_TOKEN);
        const user=await User.findById(payload.userId);
        if (!user) return res.status(400).json({ message: 'User not found' });
        user.refreshTokens=user.refreshTokens.filter(rt=>rt!==refreshToken);
        await user.save();
        res.status(204).send();
    }
    catch (err){
        res.status(403).json({ message: 'Invalid token', error: err.message });
    }
}

module.exports={signupUser,loginUser,refreshAccessToken,logoutUser}