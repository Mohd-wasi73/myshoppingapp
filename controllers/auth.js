const User=require("../models/user");
module.exports.displayRegisterPage= (req, res) => {
    
    res.render('auth/signup');
}
module.exports.registration=async (req, res) => {

        try {
            
            const { username, password, email,role } = req.body;
            const user = new User({ username, email,role });
            const newUser = await User.register(user, password);
            req.login(newUser, function(err) {
                
                if (err){
                    return next(err);
                }
    
                req.flash('success', 'Welcome , You are Registered Successfully');
                return res.redirect('/products');
            });
        }
        catch (e) {
          
            req.flash('error', e.message);
            res.redirect('/register');
        }
}
module.exports.displayLoginPage= (req, res) => {
    
    res.render('auth/login');
}
module.exports.logout= (req, res) => {
    
    req.logout();

    req.flash('success', 'GoodBye!!');
    res.redirect('/products');
}