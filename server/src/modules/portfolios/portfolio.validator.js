const { z } = require('zod');

// HTTPS LinkedIn profile validation
const linkedinRegex = /^https:\/\/(www\.)?linkedin\.com\/(in|company)\/[a-zA-Z0-9_\-./]+\/?$/i;

const portfolioUpdateSchema = z.object({
  title: z.string().min(2).max(150).optional(),
  headline: z.string().max(255).optional().nullable(),
  bio: z.string().max(5000).optional().nullable(),
  location: z.string().max(100).optional().nullable(),
  contactEmail: z.string().email().optional().nullable().or(z.literal('')),
  avatarUrl: z.string().max(1000).optional().nullable(),
  resumeUrl: z.string().max(1000).optional().nullable().or(z.literal('')),
  githubUrl: z.string().max(1000).optional().nullable().or(z.literal('')),
  linkedinUrl: z.string().regex(linkedinRegex, 'Must be a valid HTTPS LinkedIn profile URL (e.g. https://linkedin.com/in/username)').optional().nullable().or(z.literal('')),
  showLinkedin: z.boolean().optional(),
  websiteUrl: z.string().max(1000).optional().nullable().or(z.literal('')),
  slug: z.string().min(3).max(60).regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens').optional(),
  templateId: z.enum(['minimal', 'developer', 'creative', 'editorial', 'academic', 'executive']).optional(),
  layoutType: z.enum(['grid', 'flexbox']).optional(),
  themeConfig: z.string().optional(),
  sectionOrder: z.string().optional()
});

const createPortfolioSchema = z.object({
  title: z.string().min(2, 'Portfolio title must be at least 2 characters').max(150),
  slug: z.string().min(3).max(60).regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens').optional(),
  headline: z.string().max(255).optional().nullable(),
  bio: z.string().max(5000).optional().nullable(),
  templateId: z.enum(['minimal', 'developer', 'creative', 'editorial', 'academic', 'executive']).optional().default('developer'),
  layoutType: z.enum(['grid', 'flexbox']).optional().default('grid'),
  themeConfig: z.string().optional(),
  linkedinUrl: z.string().regex(linkedinRegex, 'Must be a valid HTTPS LinkedIn profile URL').optional().nullable().or(z.literal('')),
  showLinkedin: z.boolean().optional().default(true)
});

const projectSchema = z.object({
  title: z.string().min(2, 'Project title is required').max(150),
  description: z.string().min(5, 'Description is required').max(3000),
  technologies: z.string().min(1, 'Technologies are required'),
  repositoryUrl: z.string().url('Must be a valid URL').optional().nullable().or(z.literal('')),
  demoUrl: z.string().url('Must be a valid URL').optional().nullable().or(z.literal('')),
  imageUrl: z.string().optional().nullable(),
  featured: z.boolean().optional(),
  displayOrder: z.number().int().optional()
});

const skillSchema = z.object({
  name: z.string().min(1, 'Skill name is required').max(50),
  category: z.string().max(50).default('Technical'),
  proficiency: z.number().min(1).max(100).optional().nullable()
});

const experienceSchema = z.object({
  company: z.string().min(1, 'Company/Organization is required').max(100),
  role: z.string().min(1, 'Role is required').max(100),
  startDate: z.string().optional().nullable(),
  endDate: z.string().optional().nullable(),
  isCurrent: z.boolean().optional(),
  description: z.string().max(2000).optional().nullable()
});

const educationSchema = z.object({
  institution: z.string().min(1, 'Institution is required').max(150),
  degree: z.string().min(1, 'Degree is required').max(100),
  field: z.string().max(100).optional().nullable(),
  startDate: z.string().optional().nullable(),
  endDate: z.string().optional().nullable(),
  description: z.string().max(1000).optional().nullable()
});

const socialLinkSchema = z.object({
  platform: z.string().min(1).max(50),
  url: z.string().url('Must be a valid URL')
});

const reportSchema = z.object({
  reporterEmail: z.string().email('Please provide a valid email'),
  reason: z.string().min(10, 'Please provide details of the report').max(1000)
});

const accessRequestSchema = z.object({
  requesterName: z.string().min(2, 'Name is required').max(100),
  organization: z.string().min(2, 'Organization is required').max(100),
  email: z.string().email('Valid work email is required'),
  requestedRole: z.string().max(100).optional().default('Recruiter / Evaluator'),
  reason: z.string().min(5, 'Please provide a reason').max(2000)
});

const createVersionSchema = z.object({
  name: z.string().max(100).optional()
});

module.exports = {
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
};
