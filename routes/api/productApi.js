const express = require("express");
const router = express.Router();

const { isLoggedIn } = require("../../middleware");
const User = require("../../models/user");
router.post("/products/:productId/like", isLoggedIn, async (req, res) => {
    // first check client-request is ajax or not(will checke din isLoggedIn)
    //if not ajax request then server will through 401 status fro isLoggedIn middlewere.
    //since its ajax request so only data could be send not render or redirect.
    const { productId } = req.params;
    const user=req.user;
    const isLiked = user.wishlist.includes(productId);
    if (isLiked) {
        
        req.user = await User.findByIdAndUpdate(req.user._id, {
            $pull: {
                wishlist: productId
            }
        }, { new: true });//new==true so that updated object could return.
                
    }
    else{
        req.user = await User.findByIdAndUpdate(req.user._id, {
            $addToSet: {
                wishlist: productId
            }
        },{new:true});
        
        
    }
    res.send("Liked");
})
module.exports = router;