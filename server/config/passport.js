const { Strategy: LocalStrategy } = require('passport-local');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');

const bcrypt = require('bcryptjs');
const User = require('../models/User');

// These two should not be empty for Google authentication!
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const passportStrategy = (passport) => {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            // console.log('email:', email, 'password:', password);
            // Match user
            User.findOne({ email })
                .then((user) => {
                    if (!user) {
                        // no Match
                        return done(null, false, {
                            message: 'This email is not registered',
                        });
                    } else {
                        // Match password
                        bcrypt.compare(password, user.password || '', (err, isMatch) => {
                            if (err) throw err;

                            if (isMatch) {
                                return done(null, user);
                            } else {
                                return done(null, false, {
                                    message: 'Password did not match',
                                });
                            }
                        });
                    }
                })
                .catch((err) => done(err));
        }),
    );

    // Google authentication
    passport.use(
        new GoogleStrategy(
            {
                clientID: GOOGLE_CLIENT_ID,
                clientSecret: GOOGLE_CLIENT_SECRET,
                callbackURL: '/api/auth/google/callback',
            },
            (accessToken, refreshToken, profile, done) => {
                const { email, name, picture, sub } = profile._json;

                User.findOne({ email })
                    .then((user) => {
                        if (!user) {
                            User.create(
                                {
                                    email,
                                    name,
                                    password: sub,
                                    // googleId: id,
                                    pictureUrl: picture,
                                },
                                (err, user) => {
                                    return done(err, user);
                                },
                            );
                            return;
                        } else {
                            return done(null, user);
                        }
                    })
                    .catch((err) => done(err));
            },
        ),
    );

    passport.serializeUser((user, done) => {
        console.log({ serializeUser: user });
        return done(null, user);
    });

    passport.deserializeUser((userId, done) => {
        console.log({ deserializeUser: userId });
        if (typeof userId !== 'string') {
            return done(null, userId);
        }
        User.findById(userId, function (err, user) {
            done(err, user);
        });
    });
};

module.exports = passportStrategy;
