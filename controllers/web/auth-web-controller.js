

module.exports = {
    home: async (req, res) => {
        console.log("Auth controller");
        try {
            res.render('auth/home', { title: "Logga in / registrera" });
          } catch (err) {
            next(err);
          }
    },
    registerUser: async (req, res) => {
        
    }
}