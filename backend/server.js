const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require("body-parser");
const User = require("./user")

mongoose.connect("mongodb+srv://OlegAntonov:Antonov_123@olegclaster.t6nr6.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, ()=> {
  console.log("Connected to database")
})

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}))
app.use(session({
  secret: 'secretCode',
  resave: true,
  saveUninitialized: true
}))

app.use(cookieParser("secretCode "))

app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport)

app.post("/login",(req,res, next)=>{
  console.log('try login');
  passport.authenticate("local", (err,user,info)=>{
    console.log('user:');
    console.log(user);
    if(err) throw err;
    if(!user) res.send("No users");
    else {
      req.login(user, err => {
        if(err)throw err;
        res.send("Authenticate success");
      })
    }
  })(req,res,next);
})

app.post("/register", (req,res)=>{
  console.log(req.body);
  User.findOne({userName: req.body.userName}, async (err,doc)=>{
    console.log('findOne start');
    console.log('doc is: ');
    console.log(doc);
    // if(err) throw err;
    console.log('!err');
    if(doc) res.send("Already registered");
    if(!doc) {
      console.log('!doc');
      const hashPass = await bcrypt.hash(req.body.password,10);
      console.log('hash is:',hashPass);
      console.log('userName:');
      console.log(req.body.userName);
      const newUser = new User({
        userName: req.body.userName,
        password: hashPass
      });
      console.log('newUser:');
      console.log(newUser);
      console.log('save started');
      await newUser.save().then((saved)=>console.log('saved:', saved)); //!!!
      console.log('save ended');
      res.send("User created")
    }
  });
  console.log('findOne end');
})

app.get("/user", (req,res)=>{
  res.send((req.user));
})


app.listen(4000, ()=> {
  console.log("Server started")
})