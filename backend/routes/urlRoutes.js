const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');

router.post('/shorten', urlController.createShortUrl);
router.get('/admin/urls', urlController.getAllUrls);
router.get('/stats/:shortcode', urlController.getUrlStats);
router.get('/stats', urlController.getOverallStats);
router.get('/:shortcode', urlController.redirectToOriginal);

module.exports = router;
