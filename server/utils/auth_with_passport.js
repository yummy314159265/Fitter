const User = require('../models');
const passport = require('passport');
const { GraphQLLocalStrategy } = require('graphql-passport');

passport.serializeUser(function(user, done) {
  console.log(user)
  done(null, user._id);
});

passport.deserializeUser(
  async function(id, done) {
  await User.findById(id, function(err, user) {
    done(err, user);
  }).clone();
});

passport.use(
  new GraphQLLocalStrategy(async (email, password, done) => {
    const user = await User.findOne({email});
    const correctPw = await user?.isCorrectPassword(password);
    let userError, pwError;

    if (!user) {
      userError = new Error('no matching user');
    }

    if (!correctPw) {
      pwError = new Error('incorrect password');
    }

    done(userError || pwError, user);
  }),
);