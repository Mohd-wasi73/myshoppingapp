const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const {displayRegisterPage,registration,displayLoginPage,logout}=require("../controllers/auth")
router.get('/register',displayRegisterPage);

router.post('/register',registration );


router.get('/login',displayLoginPage);

router.post('/login',
  passport.authenticate('local', { 
        failureRedirect: '/login',
        failureFlash: true
  }), (req, res) => {
      
    //   console.log(req.user);
    //when you trying to edit aredoing something without login then you will jump to the login page and after login you will again rredirect to that page from where you were trying to login ..
      const redirectUrl=req.session.previousUrl;
      delete req.session.previousUrl;
      req.flash('success', `Welcome Back  ${req.user.username} Again!!`);
      //when post request comes from /product/id/reviews then reach at /product/id
     if(redirectUrl && redirectUrl.indexOf("review")!=-1){
         const str=redirectUrl.substr(0,redirectUrl.length-6);
         res.redirect(str);
     }
     else if(redirectUrl && redirectUrl.indexOf("like")){
         res.redirect("/products");
     }
     else if(redirectUrl && redirectUrl.indexOf("add")){
        res.redirect("/products");
    }
     else if(redirectUrl){
        res.redirect(redirectUrl);
     }
     else{
         res.redirect("/products");
     }
      
});

router.get('/logout',logout)





module.exports = router;
