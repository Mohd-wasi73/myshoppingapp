const express=require("express");
const router=express.Router();
const User=require("../models/user");
const {isLoggedIn}=require("../middleware");
const {showCart,addNewProductIntoCart}=require("../controllers/cart");
router.get("/user/cart",isLoggedIn,showCart)
router.post("/products/:id/add",isLoggedIn,addNewProductIntoCart)






module.exports=router;