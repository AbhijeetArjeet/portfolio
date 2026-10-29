const express = require('express');
const portfolioController = require('./portfolio.controller');
const { authenticate, optionalAuthenticate, requirePortfolioOwnership } = require('../../middleware/auth');
const { validate } = require('../../middleware/validate');
const {
  portfolioUpdateSchema,
  createPortfolioSchema,
  projectSchema,
  skillSchema,
  experienceSchema,
  educationSchema,
  socialLinkSchema,
  reportSchema,
  accessRequestSchema,
  createVersionSchema
} = require('./portfolio.validator');

const router = express.Router();

// --- Public Routes ---
router.get('/public/gallery', portfolioController.getPublicGallery);
router.get('/public/:slug', optionalAuthenticate, portfolioController.getPublicPortfolio);
router.post('/:id/access-request', validate(accessRequestSchema), portfolioController.submitAccessRequest);

// --- Authenticated User Portfolio Collection ---
router.get('/me', authenticate, portfolioController.getMyPortfolio);
router.get('/my/all', authenticate, portfolioController.listMyPortfolios);
router.post('/', authenticate, validate(createPortfolioSchema), portfolioController.createPortfolio);

// --- Single Portfolio Management ---
router.get('/:id', authenticate, requirePortfolioOwnership, portfolioController.getPortfolioById);
router.patch('/:id', authenticate, requirePortfolioOwnership, validate(portfolioUpdateSchema), portfolioController.updatePortfolio);
router.delete('/:id', authenticate, requirePortfolioOwnership, portfolioController.deletePortfolio);
router.post('/:id/duplicate', authenticate, requirePortfolioOwnership, portfolioController.duplicatePortfolio);

// Publishing controls
router.post('/:id/publish', authenticate, requirePortfolioOwnership, portfolioController.publishPortfolio);
router.post('/:id/unpublish', authenticate, requirePortfolioOwnership, portfolioController.unpublishPortfolio);

// Backup, Export & Import
router.get('/:id/export', authenticate, requirePortfolioOwnership, portfolioController.exportPortfolio);
router.post('/:id/import', authenticate, requirePortfolioOwnership, portfolioController.importPortfolio);

// Version History & Snapshots
router.post('/:id/versions', authenticate, requirePortfolioOwnership, validate(createVersionSchema), portfolioController.createVersion);
router.get('/:id/versions', authenticate, requirePortfolioOwnership, portfolioController.listVersions);
router.post('/:id/versions/:versionId/restore', authenticate, requirePortfolioOwnership, portfolioController.restoreVersion);

// Access & Collaboration Requests (Owner view & moderation)
router.get('/:id/access-requests', authenticate, requirePortfolioOwnership, portfolioController.getPortfolioAccessRequests);
router.patch('/:id/access-requests/:requestId', authenticate, requirePortfolioOwnership, portfolioController.updateAccessRequestStatus);

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
