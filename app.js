if (process.env.NODE_ENV !== 'production') {//.dotevn module is used to set environamental variable ,environmental variable is nothing but a variable that is assigned by the operating sysytem,these variables are decoupled with application.these variable can be accessed from application through API.but .env is used in only developmnent purpose.
    require('dotenv').config();
}

const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const DB="/mongodb+srv://mohd_wasi016:W%40si016allenkota@cluster0.zfc94.mongodb.net/E-CommerseApp?retryWrites=true&w=majority";

const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const seed=require("./seed");
mongoose.connect(DB,{//this object is return so that we cant get depricaton error in mongo atlas
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
    .then(() => console.log('DB Connected'))
    .catch((err) => console.log(err));
// seed();
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


const sessionConfig = {
    secret: 'weneedsomebettersecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000* 60 * 60 * 24 * 7 * 1,
        maxAge:1000* 60 * 60 * 24 * 7 * 1
    }
}

app.use(session(sessionConfig));
app.use(flash());


// Initialising middleware for passport
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//Telling the passport to check for username and password using authenticate method provided by the passport-local-mongoose package
passport.use(new LocalStrategy(User.authenticate())); 

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})



//--------------------------------------------------
// Routes
const productRoutes = require('./routes/product');
const reviewRoutes = require('./routes/review');
const authRoutes = require('./routes/auth');
const paymentRoutes=require("./routes/payment");
//APIs

const productApi=require("./routes/api/productApi");
const addToCart=require("./routes/addtocart");
const removeFromCart=require("./routes/api/removefromcart");

app.use(paymentRoutes);
app.use(removeFromCart);
app.use(addToCart);
app.use(productApi);
app.use(productRoutes);
app.use(reviewRoutes);
app.use(authRoutes);

app.all('*',(req,res)=>{
    res.render("error",{err:"Page Not Found"});
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`server running`);
});
