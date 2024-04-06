import bcrypt from 'bcryptjs';
import User from '../Models/user.model.js';

export const signup = async(req, res) => {
    try {
        
        const {fullName, username, password, confirmPassword, gender} = req.body;
        if (password != confirmPassword) {
            return res.status(404).json({error: 'Password must be same in both password and confirm password'});
        }
        
        const user = await User.findOne({username});
        if (user) {
            return res.status(400).json({notices: "Username already exists"});
        }


        //Hashing the passwords
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // https://avatar.iran.liara.run/public
        const boyProfilePic =`https://avatar.iran.liara.run/public/boy?username=${username}`
        
        const girlProfilePic =`https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = new User({
            fullName,
            username,
            password:hashedPassword,
            gender,
            profilePic : gender === "Male" ? boyProfilePic : girlProfilePic
        })

        if(newUser){
            await newUser.save();

            res.status(201).json({
                _id : newUser._id,
                fullName : newUser.fullName,
                username : newUser.username,
                profilePic : newUser.profilePic
            }) 
        }
        else{
        res.status(401).json({errorMessage:"Invalid User data"});
        }

    } catch (error) {
        console.log("error in signup controller", error)
        res.status(500).json({error: 'Internal server error'});
    }
};  


export const login = async(req, res) => {
    
};  

export const logout = async(req, res) => {
    res.send("logout success");
    console.log("Logout");
};

