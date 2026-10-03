const express = require('express');
const githubController = require('./github.controller');

const router = express.Router();

router.get('/user/:username', githubController.fetchGitHubProfile);
router.get('/repos/:username', githubController.fetchGitHubRepos);

module.exports = router;
