import jwt, { decode } from 'jsonwebtoken'
import config from '../config/config.js'

export async function authenticate (req, res, next) {
  try {
    const accessToken = req.headers.authorization.split(' ')[1]

    if (!accessToken) {
      return res.status(400).json({
        message: 'Invalid accessToken'
      })
    }

    const decoded = jwt.verify(accessToken, config.ACCESS_TOKEN_SCERET)

    req.user = decoded

    next()
  } catch (err) {
    return res.status(401).json({
      message: 'Invalid or expired access token'
    })
  }
}
