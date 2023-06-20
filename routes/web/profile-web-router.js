var express = require('express');
var router = express.Router();
const controller = require('../../controllers/web/profile-web-controller');

/* GET auth page. */
router.get('/', controller.home);


module.exports = router;
