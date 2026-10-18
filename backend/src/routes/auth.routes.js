import {Router} from "express"
import { loginValidator, registerValidator } from "../validators/auth.validator.js"
import { login, logout, register } from "../controller/auth.controller.js"
import { authenticate } from "../middlewares/auth.middleware.js"

const router = Router()

router.post("/register", registerValidator, register)
router.post("/login",loginValidator, login)
router.post("/logout",authenticate, logout)

export default router