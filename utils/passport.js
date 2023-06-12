const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const User = require("./../models/mysql/user-model")

passport.use(new LocalStrategy(
    async (username, password, done) => {
        const user = await User.findOne({ where: { username } })

        if (!user) {
            return done("Incorrect username or password", false)
        }

        const passwordMatch = await user.validatePassword(password)

        if (!passwordMatch) {
            return done("Incorrect username or password", false)

        }
        return done(null, user)
    }
))

passport.serializeUser((user, done) => {
    done(null, user.userId)
})

passport.deserializeUser(async (user, done) => {
    const user = await User.findOne({ where: { userId } })
    dont(null, user)
})

const requireAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}

const setUser = (req, res, next) => {
    if (req.isAuthenticated) {
        res.locals.user = req.user.dataValues
    }
    next()
}

module.exports = {
    requireAuth,
    setUser,
    passport
}