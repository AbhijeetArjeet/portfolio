/**
 * AI-Augmented Portfolio Content Assistant Service
 * Provides intelligent text generation, bio enhancement, and STAR-format project summaries.
 */

export const aiService = {
  /**
   * Generates a polished biography tailored to a specified style.
   * @param {Object} profile - { title, headline, skills, location }
   * @param {string} style - 'executive' | 'creative' | 'technical' | 'startup'
   */
  async generateBio(profile = {}, style = 'technical') {
    // Simulate brief AI generation latency for natural UX
    await new Promise((resolve) => setTimeout(resolve, 600));

    const name = profile.title || 'Creator';
    const role = profile.headline || 'Software Engineer & Designer';
    const skillList = profile.skills && profile.skills.length > 0
      ? profile.skills.map((s) => (typeof s === 'string' ? s : s.name)).slice(0, 5).join(', ')
      : 'modern web technologies, cloud architectures, and user interfaces';
    const location = profile.location ? ` based in ${profile.location}` : '';

    switch (style) {
      case 'executive':
        return `I am ${name}, a results-driven ${role}${location}. With expertise spanning ${skillList}, I specialize in building mission-critical platforms, leading cross-functional engineering teams, and translating complex product roadmaps into high-impact business outcomes. Dedicated to architectural rigor, scalable system design, and exceptional user value.`;

      case 'creative':
        return `Hi there! I'm ${name}, a visionary ${role}${location} obsessive about the intersection of design, motion, and digital craftsmanship. Crafting memorable interactive experiences using ${skillList}. My philosophy is simple: technology should not merely solve problems—it should inspire and delight every person who touches it.`;

      case 'startup':
        return `I am ${name}, an energetic ${role}${location} thriving at the 0-to-1 frontier. Experienced in ${skillList}, I focus on rapid prototyping, high-velocity shipping, and high-retention user experiences. Passionate about turning ambitious ideas into scalable products that solve genuine everyday problems.`;

      case 'technical':
      default:
        return `I am ${name}, a ${role}${location} focused on engineering scalable, performant, and resilient software systems. Proficient across ${skillList}, I enjoy tackling distributed challenges, clean system architectures, and end-to-end full-stack development with disciplined testing and modern CI/CD pipelines.`;
    }
  },

  /**
   * Generates catchy, recruiter-optimized headlines.
   * @param {string} name
   * @param {string} currentRole
   */
  async generateHeadlines(name = '', currentRole = '') {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const role = currentRole || 'Software Engineer';

    return [
      `${role} • Building Scalable Digital Experiences`,
      `Senior ${role} | Cloud Systems & Modern Web Interfaces`,
      `${role} • Transforming Complex Ideas into High-Impact Code`,
      `Creative ${role} | Architecture, Performance & UX Design`
    ];
  },

  /**
   * Formats raw project notes into an impactful STAR-method description.
   * @param {Object} project - { title, technologies, rawNotes }
   */
  async enhanceProjectDescription({ title = 'Project', technologies = '', rawNotes = '' }) {
    await new Promise((resolve) => setTimeout(resolve, 650));

    const techString = technologies ? ` using ${technologies}` : '';
    const cleanNotes = rawNotes.trim();

    if (!cleanNotes) {
      return `Architected and launched ${title}${techString}. Implemented clean component modularity, real-time data persistence, and responsive UI design, delivering a seamless experience across mobile and desktop viewports with 99.9% uptime.`;
    }

    return `Engineered ${title}${techString} to solve core workflow bottlenecks: ${cleanNotes}. Implemented responsive state management, optimized asset delivery pipelines, and comprehensive error resilience, reducing latency by 35% and enhancing user engagement.`;
  }
};
