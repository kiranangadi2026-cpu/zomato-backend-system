import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength: 2,
        maxLength:50
    },
    email:{
        type:String,
        required:true,
        lowerCase: true
    },
    password:{
        type:String,
        required:true,
        minLength:8
    },
    role:{
        type:String,
        required:true,
        enum:["user", "owner"]
    },
    refreshToken:{
        type:String,
        required:true
    }
}, {timestamps:true})

const userModel = mongoose.model("ZomatoUser", userSchema)
export default userModel