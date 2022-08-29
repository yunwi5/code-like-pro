const { Strategy: LocalStrategy } = require('passport-local');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const passportStrategy = (passport) => {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            console.log('email:', email, 'password:', password);
            // Match user
            User.findOne({ email })
                .then((user) => {
                    if (!user) {
                        // no Match
                        return done(null, false, { message: 'This email is not registered' });
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
                .catch((err) => console.log(err));
        }),
    );

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
};

module.exports = passportStrategy;
