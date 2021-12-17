const User=require("../models/user");

module.exports.showCart=async (req,res)=>{
    const user=await User.findById(req.user._id).populate("Cart");
    const totalprice=user.Cart.reduce((sum,curr)=>{return sum+curr.price},0)
    res.render("products/userscart",{user,totalprice});

}
module.exports.addNewProductIntoCart=async (req,res)=>{
    const {id}=req.params;
    req.user=await User.findByIdAndUpdate(req.user._id,{$addToSet:{
        Cart:id
    }},{new:true});
    res.redirect("/user/cart");
}