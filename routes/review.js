const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Review = require('../models/review');
const { validateReview,isLoggedIn } = require('../middleware');
const {addingReview}=require("../controllers/review");
router.post('/products/:productid/review',isLoggedIn,validateReview,addingReview);



module.exports = router;
