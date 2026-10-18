import {Router} from "express"
import { registerValidator } from "../validators/auth.validator.js"

const router = Router()

router.post("/register", registerValidator)
router.post("/login")

export default router