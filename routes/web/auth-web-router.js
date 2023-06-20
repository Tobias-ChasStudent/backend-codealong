var express = require('express');
var router = express.Router();
const controller = require('../../controllers/web/login-web-controller');
const { passport } = require('../../utils/passport');

/* GET auth page. */
router.get('/', controller.home);
router.post('/login', passport.authenticate('local', {
    failureRedirect: "/auth", 
    failureFlash: {
        type: "danger", message: "Incorrect username or password"
    }
}), controller.loginUser);
router.post('/register', controller.registerUser);

module.exports = router;
