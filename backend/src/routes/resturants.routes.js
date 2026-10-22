import {Router} from "express"
import { createResturant, deleteResturant, getResturantById, getResturants } from "../controller/resturants.controller.js"
import { authenticate } from "../middlewares/auth.middleware.js"

const router = Router()

router.get("/", getResturants)
router.get("/:id", getResturantById)
router.post("/", authenticate, createResturant)
router.patch("/:id",authenticate, updateResturant)
router.delete("/:id",authenticate, deleteResturant)


export default router
