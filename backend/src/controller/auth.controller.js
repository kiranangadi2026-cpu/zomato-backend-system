import userModel from "../models/auth.user.js"
import bcrypt from "bcryptjs"
import { createAccessToken, createRefreshToken } from "../utils/auth.utils.js"
import cookie from "cookie-parser"

export async function register(req, res){

    const {name, email, password} = req.body

    const isUserExists = await userModel.findOne({email})
    if(isUserExists){
        return res.status(400).json({
            message:"USer already existe"
        })
    }

    const user = userModel.create({
        name,
        email,
        password: await bcrypt.hash(password, 12)
    })

    const accessToken = createAccessToken({
        userId: user._id,
        role: user._role
    })

    const refreshToken = createRefreshToken({
        userId: user._id,
        role: user._role
    })

    await userModel.findByIdAndUpdate(user._id, {
        refreshToken
    })

    res.cookie("refreshToken", refreshToken)

    return res.status(200).json({
        message:"User registered successfully",
        user:{
            name: user.name,
            email: user.email,
            password: password.password
        },
        accessToken
    })
}

export async function login(req, res){

    const {email, password} = req.body

    const user = await userModel.findOne({email})

    if(!user){
        return res.status(400).json({
            message:"User not found"
        })
    }

    const accessToken = createAccessToken({
        userId: user._id,
        role: user._role
    })

    const refreshToken = createRefreshToken({
        userId: user._id,
        role: user._role
    })

    await userModel.findByIdAndUpdate(user._id, {
        refreshToken
    })

    res.cookie("refreshToken", refreshToken)


    return res.status(200).json({
        message:"User Logged in",
        user:{
            name: user.name,
            email: user.email,
        }
    })

}