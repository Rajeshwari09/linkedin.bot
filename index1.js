const express = require('express');
const passport = require('passport');
const app = express();
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

// passport.use(new LinkedInStrategy ({
  
//   clientID:   
//   clientSecret: 
//   callbackURL: "http://3000/auth/linkedin/callback"},
//   (accessToken)=>{
//     console.log(accessToken);
//   })
// );


passport.use(new LinkedInStrategy({
  clientID: '81j1irsj8abe5e' ,
  clientSecret: 'HuegLtKR9lRACyyy' ,
  callbackURL: "http://127.0.0.1:3000/auth/linkedin/callback",
  scope: ['r_emailaddress', 'r_basicprofile'],
}, function(accessToken, refreshToken, profile, done) {
  // asynchronous verification, for effect...
  process.nextTick(function () {
    // To keep the example simple, the user's LinkedIn profile is returned to
    // represent the logged-in user. In a typical application, you would want
    // to associate the LinkedIn account with a user record in your database,
    // and return that user instead.
    return done(null, profile);
  });
}));


app.get('/auth/linkedin',
  passport.authenticate('linkedin', { state: 'SOME STATE'  }),
  function(req, res){
    // The request will be redirected to LinkedIn for authentication, so this
    // function will not be called.
  });

app.get('/auth/linkedin/callback', passport.authenticate('linkedin', {
  successRedirect: '/',
  failureRedirect: '/login'
}));
console.log("2");
app.get('/auth/linkedin',
 passport.authenticate
 ('linkedin',
 {scope : ['profile','email'] })
);

const PORT = process.env.PORT || 3000;
app.listen(3000);