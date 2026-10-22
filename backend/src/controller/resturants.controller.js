import { getPagination } from "../utils/pagination.js";
import resturantModel from "../models/resturant.model.js";

function buildLocation(lon, lat){
    const longitude = Number(lon)
    const latitude = Number(lat)

    const isValid = isFinite(longitude) && isFinite(latitude) && longitude >= -180 && longitude <= 180 && latitude >= -90 && latitude <= 90

    return isValid ? {type:"Point", coordinates:[longitude, latitude]} : null
}

export async function getResturants(){
     const {page, limit, skip} = getPagination(req.query)

     const filter = {}
     if(req.query.city){
        filter.city = String(req.query.city)
     }

     const [resturants, total] = await Promise.all([
        resturantmodel.find(filter).sort({name: 1, _id:1}).skip(skip).limit(limit),
        resturantModel.countDocuments(filter)
     ])

     res.status(200).json({
        message:"Resturants are:",
        resturants: resturants,
        data:{
            page, limit, skip
        }
     })

}

export async function getResturantById(req, res){
    const {id} = req.params

    const resturant = await resturantModel.findById(id)

    if(!resturant){
        return res.status(404).json({
            message:"Resturant not found"
        })
    }

    res.status(200).json({
        resturant
    })

}

export async function createResturant(req, res){

    const {name, owner, city, area, cuisines, lon, lat, isOpen} = req.body

    const location = buildLocation(lon, lat)

    if(!location){
        return res.status(400).json({
            message:"Invalid location"
        })
    }

    const resturant = await resturantModel.create({
        name,
        owner: req.user.id,
        city,
        area,
        cuisines,
        location,
        isOpen
    })

    res.status(200).json({
        resturant
    })

}

export async function updateResturant(req, res){

    const {id} = req.params
    const user = req.user.id

    const resturant = await resturantModel.findById(id)

    if(!resturants){
        return res.status(404).json({
            message:"Resturant not found"
        })
    }

    if(!resturant.owner.equals(user)){
        return res.status(400).json({
            message:"You have no right to update this"
        })
    }

    const {name, city, area, cuisines, lon, lat, isOpen} =req.body

    if(name != undefined){
        resturant.name = name
    }
    if(city != undefined){
        resturant.city = city
    }
    if(area != undefined){
        resturant.area = area
    }
    if(cuisines != undefined){
        resturant.cuisines = cuisines
    }

    const location = buildLocation(lon, lat)

    if(location != undefined){
        resturant.location = location
    }
    if(isOpen != undefined){
        resturant.isOpen = isOpen
    }

    await resturant.save()

    return res.status(200).json({
        message:"Resturant saved successfully"
    })

}


export async function deleteResturant(req, res){

    const {id} = req.params
    const user = req.user.id

    const resturant = await resturantModel.findById(id)

    if(!resturant){
        return res.status(404).json({
            message:"Resturant not found"
        })
    }

    if(resturant.owner.equals(user)){
        return res.status(400).json({
            message:"You are not a owner of this resturant"
        })
    }

    await resturantModel.findByIdAndDelete(id)

    res.status(200).json({
        message:"Resturant deleted successfully"
    })

}
