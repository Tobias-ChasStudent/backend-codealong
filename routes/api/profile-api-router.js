const express = require("express")
const router = express.Router()
const controller = require("../../controllers/api/profile-api-controller")

router.post('/update-step', controller.updateStep)

module.exports = router