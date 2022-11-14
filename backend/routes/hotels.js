import express from "express";
import { countByCity, countByType, createHotel, deleteHotel, getAllHotel, getHotel, updateHotel } from "../controllers/hotelController.js";
import Hotel from "../models/Hotel.js"
import { CreateError } from "../utils/error.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// Create
router.post("/",verifyAdmin,createHotel);

//Update

router.put("/:id",verifyAdmin, updateHotel);

//Delete

router.delete("/:id",verifyAdmin,  deleteHotel);

//Get

router.get("/find/:id", getHotel);

//Get All
router.get("/", getAllHotel);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);

export default router;