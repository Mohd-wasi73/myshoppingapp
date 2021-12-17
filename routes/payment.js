const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Razorpay = require("razorpay");
const { v4: uuidv4 } = require('uuid');

const { isLoggedIn } = require("../middleware");
//initialize the razor pay
const razorpay = new Razorpay({
    key_id: "rzp_test_ZoEYYPL9ldUmXT",
    key_secret: "DUufnNrAsTKXj1RjZcl0gwy9"
})
//now it recieverequest from payment so that client can get the user id for each order
router.post("/user/checkout", isLoggedIn, async (req, res) => {
    const user = await User.findById(req.user._id).populate("Cart");
    const totalamount = user.Cart.reduce((sum, product) => {
        return sum = sum + product.price;
    }, 0)
    var options = {
        amount: `${totalamount*100}`,  // amount to be transactioned in the smallest currency unit
        currency: "INR",
        receipt: uuidv4()
    };
    razorpay.orders.create(options, function (err, order) {
        res.json(order);
    });
})
router.post("/user/checkout/completed",isLoggedIn,async(req,res)=>{
    
      const detail= await razorpay.payments.fetch(req.body.razorpay_payment_id);
      console.log(detail);
      if(detail.status=="captured"){
          
          req.user=await User.findByIdAndUpdate(req.user._id,{Cart:[]},{new:true});
          res.render("paymentDetail",{detail});
      }
      else{
          res.redirect("/products");
      }
     
})


module.exports = router;