import {Router} from "express"
import { loginValidator, registerValidator } from "../validators/auth.validator.js"
import { login, register } from "../controller/auth.controller.js"

const router = Router()

router.post("/register", registerValidator, register)
router.post("/login",loginValidator, login)

export default router