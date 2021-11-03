const passport = require("passport");
const kakao = require("./kakao");
const google = require("./google");

const { User } = require("../models");

module.exports = () => {
  passport.serializeUser((user, done) => {
    console.log(user, "🍑");
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({ where: { id } });
      console.log(user, "🍑🍑");
      done(null, user);
    } catch (err) {
      console.error(err);
      done(err);
    }
  });
  kakao();
  google();
};
