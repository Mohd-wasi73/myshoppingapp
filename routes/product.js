
const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const { validateProduct,isLoggedIn,isSeller } = require('../middleware');
const {showAllProducts,newProductForm,addNewProduct,showPerticularProduct,editForm,addEditedProduct,deletePerticularProduct}=require("../controllers/products");
router.get("/",(req,res)=>{
    res.render("home");
})
router.route('/products')
    .get(showAllProducts )
    .post(isLoggedIn,validateProduct,isSeller,addNewProduct)

router.get('/products/new',isLoggedIn,isSeller,newProductForm );

router.route("/products/:id")
     .get(showPerticularProduct)
     .patch(isLoggedIn,isSeller, validateProduct,addEditedProduct)
     .delete(isLoggedIn,isSeller,deletePerticularProduct);


router.get('/products/:id/edit',isLoggedIn,editForm);




module.exports = router;
