const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const userModel = require("./../models/mysql/user-model")

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'hash'
},
    async (username, hash, done) => {
        console.log('Authenticating user:', username);

        try {
            const userByName = await userModel.findOne({ where: { username } });

            if (!userByName) {
                console.log('User not found');
                return done(null, false, {message: "Incorrect username or password"});
            }

            const passwordMatch = await userByName.validatePassword(hash);

            if (!passwordMatch) {
                console.log('Incorrect password');
                return done(null, false, {message: "Incorrect username or password"});
            }

            console.log('Authentication successful');
            return done(null, userByName);
        } catch (error) {
            console.error('Error during authentication:', error);
            return done(error);
        }
    }
));


passport.serializeUser((user, done) => {
    done(null, user.userId)
})

passport.deserializeUser(async (userId, done) => {
    const userById = await userModel.findOne({ where: { userId } })
    done(null, userById)
})

const requireAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    }

    req.session.flash = {type:"danger", test: "Du måste logga in för att se denna sida"}

    res.redirect('/auth')
}

const setUser = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.user = req.user
    }
    next()
}

module.exports = {
    passport,
    requireAuth,
    setUser,
}