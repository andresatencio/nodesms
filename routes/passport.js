var passport = require('passport'), 
    TwitterStrategy = require('passport-twitter').Strategy;
    User = require('../models/models')
/**
 * Set login con TW
 */
passport.use(new TwitterStrategy({
    consumerKey: process.env.consumerKey,
    consumerSecret: process.env.consumerSecret,
    callbackURL: "http://localhost:3000/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, done) {
    User.findOne({uid: profile.id}, function(err, user) {
      if(user) {
        done(null, user);
      } else {
        var user = new User();
        user.provider = "twitter";
        user.uid = profile.id;
        user.name = profile.displayName;
        user.image = profile._json.profile_image_url;
        user.save(function(err) {
          if(err) { throw err; }
          done(null, user);
        });
      }
    })
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.uid);
});

passport.deserializeUser(function(uid, done) {
  User.findOne({uid: uid}, function (err, user) {
    done(err, user);
  });
});


module.exports = passport;