const User = require("../../models/mysql/user-model")

module.exports = {
    home: async (req, res) => {
        console.log("Profile controller");
        try {
            res.render('profile/home', { title: "Din profil" });
        } catch (err) {
            next(err);
        }
    },
    
}