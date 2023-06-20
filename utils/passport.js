const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const userModel = require("./../models/mysql/user-model")

passport.use(new LocalStrategy(
    async (username, password, done) => {
        const userByName = await userModel.findOne({ where: { username } })

        if (!userByName) {
            return done("Incorrect username or password", false)
        }

        const passwordMatch = await userByName.validatePassword(password)

        if (!passwordMatch) {
            return done("Incorrect username or password", false)

        }
        return done(null, userByName)
    }
))

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

    res.redirect('/login')
}

const setUser = (req, res, next) => {
    if (req.isAuthenticated) {
        res.locals.user = req.user
    }
    next()
}

module.exports = {
    passport,
    requireAuth,
    setUser,
}