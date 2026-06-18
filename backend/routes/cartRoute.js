import express from "express"
import { addtoCart,remveFromCart,fetchCart } from "../controllers/cartcontroller.js"
import authMiddleware from "../middlewares/auth.js";
const cartRouter=express.Router()

cartRouter.post('/add',authMiddleware,addtoCart);
cartRouter.post('/remove',authMiddleware,remveFromCart)
cartRouter.get("/list",authMiddleware,fetchCart)
export default cartRouter;