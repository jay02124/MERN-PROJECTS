import jwt from 'jsonwebtoken'; 
import User from '../Models/user.model.js'

const protectRoute = async (req, res, next) =>{
    try {
        const token = req.cookies.jwt;
        if(!token){
            return res.status(403).json({error : "Unauthorized - Token is not provided"});
        }       

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            return res.status(403).json({error : "Invalid token"});
        }

        const user = await User.findById(decoded.userId).select("-password");
        if(!user){
            return res.status(403).json({error : "User not found"});
        }

        req.user = user;
        next();

    } catch (error) {
        console.log("Error in ProtectRoute middleware",error.message);
        res.status(500).send("Internal server error"); 
    }
};  

export default protectRoute;