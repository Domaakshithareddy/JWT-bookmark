const jwt=require('jsonwebtoken');

const authMiddleware=(req,res,next)=>{
    const authHeader=req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({message:'No Token provided'});
    }
    const token=authHeader.split(' ')[1];
    try{
        const decoded=jwt.verify(token,process.env.ACCESS_TOKEN);
        req.user=decoded;
        next();
    }
    catch (err) {
        return res.status(401).json({message:'Invalid or expired token'});
    }
};

module.exports=authMiddleware;