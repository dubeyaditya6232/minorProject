import express from "express";
import { deleteUser, getAllUser, getUser, updateUser } from "../controllers/UserController.js";
import User from "../models/User.js"
import { CreateError } from "../utils/error.js";
import { verifyToken, verifyUser, verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// router.get("/checkauthentication",verifyToken, (req,res,next)=>{
//     res.send("Hello user , you are logged in");
// })

// router.get("/checkuser/:id", verifyUser, (req,res,next)=>{
//     res.send("hello user, you are logged in adn you can delete your account")
// })

// router.get("/checkadmin/:id", verifyAdmin, (req,res,next)=>{
//     res.send("hello admin, you are logged in adn you can delete all accounts")
// })
// //Update

router.put("/:id", verifyUser ,updateUser);

//Delete

router.delete("/:id",verifyUser ,deleteUser);

//Get

router.get("/:id", verifyUser,getUser);

//Get All

router.get("/",verifyAdmin ,getAllUser);

export default router;