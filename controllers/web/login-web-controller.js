const User = require("./../../models/mysql/user-model")
const bcrypt = require('bcrypt')

module.exports = {
    home: async (req, res) => {
        console.log("Auth controller");
        try {
            res.render('login/home', { title: "Logga in / registrera" });
        } catch (err) {
            next(err);
        }
    },
    registerUser: async (req, res) => {
        const username = req.body.username

        /* const existingUser = await User.findOne({ where: { username } })
        if (existingUser !== null) {
            req.session.flash = {type: "danger", message: "Username already exists"}
            return res.redirect('/login')
        } */
        
        const passwordHash = await bcrypt.hash(req.body.password, 10)
        User.create({
            username,
            hash: passwordHash
        })



        req.session.flash = { type: "success", message: "No user created" }

        req.flash('info', 'flash message added')
        res.redirect('/login')
    },
    loginUser: async (req, res, next) => {
        res.redirect('/profile')
    }
}