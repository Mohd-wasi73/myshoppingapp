const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const { isLoggedIn } = require("../../middleware");
router.post("/user/:id/remove", isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const user = req.user;
    req.user = await User.findByIdAndUpdate(user._id, {
        $pull: {
            Cart: id
        }
    }, { new: true });
    res.send("removed");
})





module.exports = router;