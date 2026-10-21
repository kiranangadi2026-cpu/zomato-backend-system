import {Router} from "express"
import { createResturant, deleteResturant, getResturantById, getResturants } from "../controller/resturants.controller.js"

const router = Router()

router.get("/", getResturants)
router.get("/:id", getResturantById)
router.post("/", createResturant)
router.patch("/:id", deleteResturant)

export default router
