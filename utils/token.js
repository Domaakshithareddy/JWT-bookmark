require('dotenv').config();
const jwt=require('jsonwebtoken');

function createAccessToken(payload){
    return jwt.sign(
        payload,
        process.env.ACCESS_TOKEN,
        {expiresIn:'5m'}
    );
}

function createRefreshToken(payload){
    return jwt.sign(
        payload,
        process.env.REFRESH_TOKEN,
        {expiresIn:'10m'}
    );
}

function sendTokens(res,accessToken,refreshToken){
    res.status(200).json({
        accessToken,
        refreshToken
    });
}

module.exports={createAccessToken,createRefreshToken,sendTokens,}