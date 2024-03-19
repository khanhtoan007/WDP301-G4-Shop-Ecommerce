const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser'); // Use require instead of import
const dotenv = require('dotenv');
dotenv.config();
const session = require('express-session');
const passport = require('passport');
const userdb = require("./models/userModel");
const OAuth2Strategy = require('passport-google-oauth20').Strategy;

const clientid= process.env.GOOGLE_CLIENT_ID;
const clientsecrect= process.env.GOOGLE_CLIENT_SECRECT;



connectDB();
const app = express();


// Your server code goes here

app.use(cors({
    origin:"http://localhost:3000",
    methods:"GET,POST,PUT,DELETE",
    credentials:true
}));

app.use(express.json());

app.use(session({
    secret:"2711641abcdww",
    resave:false,
    saveUninitialized:true
}))

app.use(passport.initialize());
app.use(passport.session);
passport.use(
  new OAuth2Strategy({
    clientID: clientid,
    clientSecret: clientsecrect,
    callbackURL:"/auth/google/callback",
    scope:["profile","email"]
  }, 
  async(accessToken, refresh, profile,done) =>{
    console.log("profile",profile);
    try {
      let user = await userdb.findOne({googleId:profile.id});

      if(!user){
        user = new userdb({
          googleId:profile.id,
          displayName:profile.displayName,
          email:profile.emails[0].value,
          image:profile.photos[0].value
        });
        await user.save();
      }

      return done(null,user)
    } catch (error) {
      return done(error,null)
    }
  }
  )
  )

  passport.serializeUser((user,done)=> {
    done(null,user);
  })
  passport.deserializeUser((user,done)=> {
    done(null,user);
  })

  app.get("auth/google", passport.authenticate("google",{scope:["profile", "email"]}));
  app.get("/auth/google/callback", passport.authenticate("google",{
    successRedirect:"http://localhost:3000/dashboard",
    failureRedirect:"http://localhost:3000/login"

  }))

// Middleware
app.use(bodyParser.json());



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
