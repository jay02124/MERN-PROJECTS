import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullName:{
        type: String,
        required: true
    },  
    username: {  
        type: String,  
        required: true  
    },
    password: {  
        type: String,  
        required: true,
        minlenght: 6  
    },
    gender: {  
        type: String,  
        required: true,
        enum: ["Male", "Female"]  
    },
    profilePic: {  
        type: String,  
        default : ""
    },
});  

const User = mongoose.model('User', userSchema); 

export default User;