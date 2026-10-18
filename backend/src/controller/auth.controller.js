import userModel from '../models/auth.user.js'
import bcrypt from 'bcryptjs'
import { createAccessToken, createRefreshToken } from '../utils/auth.utils.js'
import cookie from 'cookie-parser'

export async function register (req, res) {
  const { name, email, password } = req.body

  const isUserExists = await userModel.findOne({ email })
  if (isUserExists) {
    return res.status(400).json({
      message: 'USer already existe'
    })
  }

  const user = await userModel.create({
    name,
    email,
    password: await bcrypt.hash(password, 12)
  })

  const accessToken = await createAccessToken({
    userId: user._id,
    role: user._role
  })

  const refreshToken = await createRefreshToken({
    userId: user._id,
    role: user._role
  })

  await userModel.findByIdAndUpdate(user._id, {
    refreshToken
  })

  res.cookie('refreshToken', refreshToken)

  return res.status(200).json({
    message: 'User registered successfully',
    user: {
      name: user.name,
      email: user.email,
      password: password.password
    },
    accessToken
  })
}

export async function login (req, res) {
  const { email, password } = req.body

  const user = await userModel.findOne({ email })

  if (!user) {
    return res.status(400).json({
      message: 'User not found'
    })
  }

  const validPassword = await bcrypt.compare(password, user.password )

  if (!validPassword) {
    return res.status(400).json({
      message: 'Email or password is incorrect'
    })
  }

  const accessToken = await createAccessToken({
    userId: user._id,
    role: user._role
  })

  const refreshToken = await createRefreshToken({
    userId: user._id,
    role: user._role
  })

  await userModel.findByIdAndUpdate(user._id, {
    refreshToken
  })

  res.cookie('refreshToken', refreshToken)

  return res.status(200).json({
    message: 'User Logged in',
    user: {
      name: user.name,
      email: user.email
    },
    accessToken
  })
}

export async function logout (req, res) {
  try {
    const user = await userModel.findByIdAndUpdate(req.user._id, {
      refreshToken: null
    })

    res.clearCookie('refreshToken', null, {
      httpOnly: true
    })

    return res.status(200).json({
      message: 'User logged out successfully'
    })
  } catch (err) {
    
    console.log(err)
    return res.status(400).json({
      message: 'Error while logging out'
    })
  }
}
