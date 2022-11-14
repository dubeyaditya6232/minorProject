import express from "express";
import { createRoom, deleteRoom, getAllRoom, getRoom, updateRoom } from "../controllers/roomController.js";
import Room from "../models/Room.js"
import { CreateError } from "../utils/error.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// Create
router.post("/:hotelid",verifyAdmin,createRoom);

//Update

router.put("/:id",verifyAdmin, updateRoom);

//Delete

router.delete("/:id/:hotelid",verifyAdmin,  deleteRoom);

//Get

router.get("/:id", getRoom);

//Get All

router.get("/", getAllRoom);

export default router;