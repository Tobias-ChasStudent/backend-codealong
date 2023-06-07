const User = require("./../../models/mysql/user-model")
const flash = require('express-flash')

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

        const existingUser = await User.findOne({where: {username}})
        User.create({
            username: "Tob",
            hash: "Invalid_hash"
        })
        if (existingUser !== null) {
            
        }
        req.flash('info', 'flash message added')
        res.redirect('/login')
    }
}