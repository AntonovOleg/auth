const User = require("./user");
const bcrypt = require("bcrypt");
const localStrategy = require("passport-local").Strategy;

module.exports = function(passport) {
  passport.use(
    new localStrategy((userName, password, done)=>{
      User.findOne({userName: userName}, (err,user)=>{
        if(err) throw err;
        if(!user) return done(null, false);
        bcrypt.compare(password, user.password, (err,result)=>{
          if(err) throw err;
          if(result) {
            return done(null, user)
          }
          else {
            return done (null,false)
          }
        })
      })
    })
  );

  passport.serializeUser((user,cb)=>{
    console.log('serializeUser');
    cb(null,user.id);
  })

  passport.deserializeUser((id,cb)=>{
    console.log('DEserializeUser');
    User.findOne({_id: id}, (err,user)=>{
      const userInformation = {
        userName: user.userName
      };
      cb(err, userInformation);
    })
  })
}