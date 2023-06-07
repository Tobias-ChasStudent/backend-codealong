var express = require('express');
var router = express.Router();
const controller = require('./../../controllers/web/auth-web-controller')

/* GET auth page. */
router.get('/', controller.home);
router.post('/register', controller.registerUser);

module.exports = router;
