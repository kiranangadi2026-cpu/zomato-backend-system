import jwt from "jsonwebtoken"
import config from "../config/config.js"

export async function createAccessToken({userId, role}){
    const accessToken = jwt.sign({userId, role}, config.ACCESS_TOKEN_SCERET, {expiresIn:"7Days"})
    return accessToken
}

export async function createRefreshToken({userId, role}){
    const refreshToken = jwt.sign({userId, role}, config.REFRESH_TOKEN_SCERET, {expiresIn:"15M"})
    return refreshToken
}

export async function readAccessToken(accessToken){
    return jwt.verify(accessToken, config.ACCESS_TOKEN_SCERET)
}

export async function readRefreshToken(refreshToken){
    return jwt.verify(refreshToken, config.REFRESH_TOKEN_SCERET)
}