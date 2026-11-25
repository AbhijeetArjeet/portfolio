const express = require('express');
const { fetchLinkedInProfile, fetchFacebookProfile } = require('./connectors.controller');

const router = express.Router();

router.get('/linkedin', fetchLinkedInProfile);
router.post('/linkedin', fetchLinkedInProfile);

router.get('/facebook', fetchFacebookProfile);
router.post('/facebook', fetchFacebookProfile);

module.exports = router;
