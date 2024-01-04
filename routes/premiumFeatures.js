const express = require('express');
const premiumController = require('../controllers/premiumFeatures');
const authController= require('../middleware/authentication');
const router = express.Router();

router.get('/leaderboard',authController.authorization,premiumController.getLeaderboard);
router.get('/download',authController.authorization,premiumController.getDownloadURL);

module.exports = router;