const passport = require("passport");
const User = require('../models/user');

require('dotenv').config()
//ใช้ในการ decode jwt ออกมา
const ExtractJwt = require("passport-jwt").ExtractJwt;
//ใช้ในการประกาศ Strategy
const JwtStrategy = require("passport-jwt").Strategy;
//สร้าง Strategy
const jwtOptions = {
   jwtFromRequest: ExtractJwt.fromHeader("authorization"),
   secretOrKey: process.env.JWT_SECRET
};
const jwtAuth = new JwtStrategy(jwtOptions, (payload, done) => {
        // Define an async function to perform the database query
        const findUser = async () => {
            try {
                const user = await User.findOne({ username: payload.username });
                if (!user) {
                    done(null, false); // User not found
                } else {
                    done(null, true); // User found
                }
            } catch (error) {
                done(error, false); // Error occurred
            }
        };
    
        // Call the async function
        findUser();
});
//เสียบ Strategy เข้า Passport
passport.use(jwtAuth);
//ทำ Passport Middleware
const requireJWTAuth = passport.authenticate("jwt",{session:false});

module.exports = {
    requireJWTAuth
}