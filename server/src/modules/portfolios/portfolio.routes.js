const express = require('express');
const portfolioController = require('./portfolio.controller');
const { authenticate, optionalAuthenticate, requirePortfolioOwnership } = require('../../middleware/auth');
const { validate } = require('../../middleware/validate');
const {
  portfolioUpdateSchema,
  projectSchema,
  skillSchema,
  experienceSchema,
  educationSchema,
  socialLinkSchema,
  reportSchema
} = require('./portfolio.validator');

const router = express.Router();

// --- Public Routes ---
router.get('/public/gallery', portfolioController.getPublicGallery);
router.get('/public/:slug', optionalAuthenticate, portfolioController.getPublicPortfolio);

// --- Authenticated User Routes ---
router.get('/me', authenticate, portfolioController.getMyPortfolio);

// Specific portfolio routes (requires ownership or admin)
router.get('/:id', authenticate, requirePortfolioOwnership, portfolioController.getPortfolioById);
router.patch('/:id', authenticate, requirePortfolioOwnership, validate(portfolioUpdateSchema), portfolioController.updatePortfolio);
router.delete('/:id', authenticate, requirePortfolioOwnership, portfolioController.deletePortfolio);

router.post('/:id/publish', authenticate, requirePortfolioOwnership, portfolioController.publishPortfolio);
router.post('/:id/unpublish', authenticate, requirePortfolioOwnership, portfolioController.unpublishPortfolio);

// Sub-resource: Projects
router.post('/:id/projects', authenticate, requirePortfolioOwnership, validate(projectSchema), portfolioController.addProject);
router.patch('/:id/projects/:projectId', authenticate, requirePortfolioOwnership, validate(projectSchema.partial()), portfolioController.updateProject);
router.delete('/:id/projects/:projectId', authenticate, requirePortfolioOwnership, portfolioController.deleteProject);

// Sub-resource: Skills
router.post('/:id/skills', authenticate, requirePortfolioOwnership, validate(skillSchema), portfolioController.addSkill);
router.delete('/:id/skills/:skillId', authenticate, requirePortfolioOwnership, portfolioController.deleteSkill);

// Sub-resource: Experience
router.post('/:id/experience', authenticate, requirePortfolioOwnership, validate(experienceSchema), portfolioController.addExperience);
router.delete('/:id/experience/:experienceId', authenticate, requirePortfolioOwnership, portfolioController.deleteExperience);

// Sub-resource: Education
router.post('/:id/education', authenticate, requirePortfolioOwnership, validate(educationSchema), portfolioController.addEducation);
router.delete('/:id/education/:educationId', authenticate, requirePortfolioOwnership, portfolioController.deleteEducation);

// Sub-resource: Social Links
router.post('/:id/social-links', authenticate, requirePortfolioOwnership, validate(socialLinkSchema), portfolioController.addSocialLink);
router.delete('/:id/social-links/:linkId', authenticate, requirePortfolioOwnership, portfolioController.deleteSocialLink);

// Public abuse report
router.post('/:id/report', validate(reportSchema), portfolioController.reportPortfolio);

module.exports = router;
