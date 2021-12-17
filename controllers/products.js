const Product=require("../models/product")
module.exports.showAllProducts=async (req, res) => {
    
    try {
        const products = await Product.find({});
        res.render('products/index', { products });
    }
    catch (e) {
        res.status(500).render('error',{err:e.message})
    }
}
module.exports.newProductForm=(req, res) => {

    try {
        res.render('products/new');
    }
    catch (e) {
         res.status(500).render('error',{err:e.message})
    }  
}
module.exports.addNewProduct=async (req, res) => {
    
    try {
        const { name, img, desc, price } = req.body;
        await Product.create({ name, img, price: parseFloat(price), desc , author:req.user._id});
        req.flash('success', 'Successfully added a new product!');
        res.redirect('/products');
    }
    catch (e) {
        res.status(500).render('error', { err: e.message })
    }
}
module.exports.showPerticularProduct= async (req, res) => {


    try {
        const { id } = req.params;
        const product = await Product.findById(id).populate('reviews');
        res.render('products/show', { product}); 
    }
    catch (e) {
        res.status(500).render('error',{err:e.message})
    }
}
module.exports.editForm= async (req, res) => {
    
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.render('products/edit', { product });
    }
    catch (e) {
        res.status(500).render('error',{err:e.message})
    }  
}
module.exports.addEditedProduct=async (req, res) => {
    

    try {
        const { id } = req.params;
        const { name, price, img, desc } = req.body;
        await Product.findByIdAndUpdate(id, { name, price, desc, img });
        req.flash('success', 'Edit Your Product Successfully');
        res.redirect(`/products/${id}`);
    }
    catch (e) {
        req.flash('error', e.message);
        res.redirect(`/products/${id}/edit`);
    } 
}
module.exports.deletePerticularProduct=async (req, res) => {
    
    try {
            const { id } = req.params;
            await Product.findByIdAndDelete(id);
            req.flash("success","product deleted Successfully");
            res.redirect('/products');
        }
    catch (e) {
        res.status(500).render('error',{err:e.message}) ;  
    }
}