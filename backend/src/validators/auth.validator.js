import {body, validationResult} from "express-validator"

export const registerValidator = [

    body("name")
        .exists().withMessage("Name is required").bail()
        .isString().withMessage("Name must be in string format").bail()
        .trim()
        .isLength({min:2, max:50}).withMessage("Min 2 and max 50 char are allowed"),
    body("email")
        .exists().withMessage("email is required").bail()
        .isString().withMessage("email must be in string format").bail()
        .trim()
        .isLowercase().withMessage("Email must be in lower case"),
    body("password")
        .exists().withMessage("password is required").bail()
        .isString().withMessage("password must be in string format").bail()
        .trim()
        .isLength({min:8}).withMessage("Min 8 char are allowed"),
    body("role")
        .exists().withMessage("role is required").bail()
        .isString().withMessage("role must be in string format").bail()
        .trim()
        .isIn(["user", "owner"]).withMessage("Select user or owner"),
    (req, res, next)=>{
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                message:"bad request",
                errors: errors.array()
            })
        }
        next()
    }
]

export const loginValidator = [
     body("email")
        .exists().withMessage("email is required").bail()
        .isString().withMessage("email must be in string format").bail()
        .trim()
        .isLowercase().withMessage("Email must be in lower case"),
    body("password")
        .exists().withMessage("password is required").bail()
        .isString().withMessage("password must be in string format").bail()
        .trim()
        .isLength({min:8}).withMessage("Min 8 char are allowed"),

    (req, res, next)=>{
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                message:"bad request",
                errors: errors.array()
            })
        }
        next()
    }
]