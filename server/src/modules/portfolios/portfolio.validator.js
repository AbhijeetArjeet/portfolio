const { z } = require('zod');

const portfolioUpdateSchema = z.object({
  title: z.string().min(2).max(150).optional(),
  headline: z.string().max(255).optional().nullable(),
  bio: z.string().max(5000).optional().nullable(),
  location: z.string().max(100).optional().nullable(),
  contactEmail: z.string().email().optional().nullable().or(z.literal('')),
  avatarUrl: z.string().max(1000).optional().nullable(),
  resumeUrl: z.string().max(1000).optional().nullable().or(z.literal('')),
  githubUrl: z.string().max(1000).optional().nullable().or(z.literal('')),
  linkedinUrl: z.string().max(1000).optional().nullable().or(z.literal('')),
  websiteUrl: z.string().max(1000).optional().nullable().or(z.literal('')),
  slug: z.string().min(3).max(60).regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens').optional(),
  templateId: z.enum(['minimal', 'developer', 'creative']).optional(),
  layoutType: z.enum(['grid', 'flexbox']).optional(),
  themeConfig: z.string().optional()
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

module.exports = {
  portfolioUpdateSchema,
  projectSchema,
  skillSchema,
  experienceSchema,
  educationSchema,
  socialLinkSchema,
  reportSchema
};
