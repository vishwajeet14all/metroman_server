import passport from "passport";
import { Strategy as OAuth2Strategy } from "passport-google-oauth20";
import Usermodel from "../controller/user/user.schema.js";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

// export const GoogleStrategy = new OAuth2Strategy(
passport.use(
  "google",
  new OAuth2Strategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      // console.log("profile____", profile);
      try {
        let user = await Usermodel.findOne({
          googleId: profile.id,
        });
        if (!user) {
          user = new Usermodel({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            image: profile.photos[0].value,
          });
          await user.save();
          // console.log("User saved successfully:", user);
        }
        return done(null, user);
      } catch (error) {
        return done(null, error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET, // Change this to a secure secret key for JWT signing
};
passport.use(
  "jwt",
  new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      // console.log("jwt payload ",payload);
      const user = await Usermodel.findOne({ email: payload.email });
      if (user) {
        // console.log("user ",user);
        done(null, user);
      } else {
        done(null, false);
      }
    } catch (error) {
      done(error, false);
    }
  })
);

export default passport;
