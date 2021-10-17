const passport = require("passport");
const NaverStrategy = require("passport-naver").Strategy;
const dotenv = require("dotenv");

const { User } = require("../models");
dotenv.config();

module.exports = () => {
  passport.use(
    new NaverStrategy(
      {
        clientID: process.env.NAVER_ID,
        clientSecret: process.env.NAVER_ID,
        callbackURL: process.env.NAVER_CALLBACK,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const exUser = await User.findOne({
            where: { snsId: profile.id, provider: "naver" },
          });
          if (exUser) {
            done(null, exUser);
          } else {
            const newUser = await User.create({
              email: profile.emails[0].value,
              name: profile.displayName,
              snsId: profile.id,
              provider: "naver",
            });
            done(null, newUser);
          }
        } catch (err) {
          console.error(err);
          done(err);
        }
      }
    )
  );
};
