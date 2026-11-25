/**
 * AI Portfolio Engine (Powered by Google Gemini API with Intelligent Fallback)
 * 
 * Supports:
 * - Google Gemini 1.5 Flash (1 Million Context Window, High Speed)
 * - Google Gemini 1.5 Pro / 2.0 Flash
 * - Full Portfolio Generation from natural language prompts or raw resumes
 * - Offline heuristic synthesizer fallback when no API key is provided
 */

const STORAGE_KEY = 'portfolio_gemini_api_key';

export const aiService = {
  /**
   * Gets the stored Gemini API key (from localStorage or environment)
   */
  getApiKey() {
    return localStorage.getItem(STORAGE_KEY) || import.meta.env.VITE_GEMINI_API_KEY || '';
  },

  /**
   * Saves the user's Gemini API key in local browser storage
   */
  setApiKey(key) {
    if (!key) {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, key.trim());
    }
  },

  /**
   * Calls the official Google Gemini REST API
   */
  async callGemini(prompt, systemInstruction = '') {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error('NO_API_KEY');
    }

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const body = {
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        topP: 0.95,
        maxOutputTokens: 2048
      }
    };

    if (systemInstruction) {
      body.systemInstruction = {
        parts: [{ text: systemInstruction }]
      };
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      const msg = errData?.error?.message || `Gemini API returned status ${response.status}`;
      throw new Error(msg);
    }

    const result = await response.json();
    const text = result?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    return text;
  },

  /**
   * Generates a complete portfolio (Profile, Headline, Bio, Projects, Skills, Experience, Template)
   * from a single natural language prompt or resume text.
   */
  async generateFullPortfolio(userPrompt = '', stylePreference = 'auto') {
    const apiKey = this.getApiKey();

    if (apiKey) {
      try {
        const sysPrompt = `You are an elite developer career coach and portfolio designer. 
Convert the user's prompt/resume into a modern, complete JSON portfolio specification.
Respond with pure JSON only, without markdown backticks or commentary.
The JSON must follow this exact schema:
{
  "title": "First Last | Professional Title",
  "headline": "Punchy 6-10 word tagline with bullets",
  "bio": "2-3 paragraphs of compelling, professional biography",
  "location": "City, Country",
  "templateId": "one of: aura-lime, cyber-neon, warm-spotlight, vibrant-card, crimson-bold, editorial-mono, brutalist-tech, warm-playful, executive-cv, glass-slate, developer, minimal, creative",
  "skills": [
    { "name": "Skill Name", "proficiency": 85 }
  ],
  "projects": [
    {
      "title": "Project Name",
      "description": "STAR-method 2-sentence impact description with metrics and technologies",
      "technologies": "Tech1, Tech2, Tech3",
      "featured": true
    }
  ],
  "experience": [
    {
      "role": "Role Title",
      "company": "Company Name",
      "startDate": "Year or Month Year",
      "endDate": "Present",
      "isCurrent": true,
      "description": "Key contributions and delivered results"
    }
  ],
  "education": [
    {
      "degree": "Degree / Course Name",
      "institution": "University / Institute Name",
      "startDate": "2022",
      "endDate": "2026",
      "description": "Specializations, coursework, or achievements"
    }
  ]
}`;

        const rawJsonText = await this.callGemini(
          `User Profile Description:\n"${userPrompt}"\nPreferred Style: ${stylePreference}`,
          sysPrompt
        );

        const cleanJson = rawJsonText
          .replace(/```json/gi, '')
          .replace(/```/g, '')
          .trim();

        const parsed = JSON.parse(cleanJson);
        return {
          ...parsed,
          source: 'Google Gemini 1.5 Flash'
        };
      } catch (err) {
        console.warn('Gemini API call failed, falling back to intelligent synthesizer:', err.message);
      }
    }

    // Intelligent Offline Synthesizer Fallback
    await new Promise((r) => setTimeout(r, 700));

    // Extract basic clues from userPrompt
    const raw = userPrompt || 'Full-Stack Developer';
    const words = raw.split(/\s+/);
    const suggestedName = words.slice(0, 2).join(' ') || 'Alex Creator';
    
    // Choose appropriate template
    let templateId = 'cyber-neon';
    const lower = raw.toLowerCase();
    if (lower.includes('design') || lower.includes('ui') || lower.includes('ux')) templateId = 'aura-lime';
    else if (lower.includes('creative') || lower.includes('art')) templateId = 'warm-spotlight';
    else if (lower.includes('student') || lower.includes('junior')) templateId = 'vibrant-card';
    else if (lower.includes('executive') || lower.includes('lead') || lower.includes('manager')) templateId = 'executive-cv';
    else if (lower.includes('minimal')) templateId = 'minimal';

    return {
      title: `${suggestedName} | Full-Stack & Systems Developer`,
      headline: 'Architecting Scalable Web Applications • High-Performance Systems',
      bio: `I am a dedicated software engineer focused on building robust, accessible, and user-centric web platforms. Specializing in modern JavaScript frameworks, cloud infrastructure, and distributed databases, I bring ideas from conception to production with precision and architectural rigor.\n\nPassionate about open-source collaboration, continuous integration, and engineering high-impact digital products that deliver real measurable value.`,
      location: 'India',
      templateId,
      skills: [
        { name: 'React & Next.js', proficiency: 92 },
        { name: 'Node.js & Express', proficiency: 88 },
        { name: 'Python & AI Integration', proficiency: 82 },
        { name: 'TypeScript', proficiency: 85 },
        { name: 'PostgreSQL & Prisma', proficiency: 80 },
        { name: 'Docker & CI/CD', proficiency: 75 }
      ],
      projects: [
        {
          title: 'High-Throughput Distributed Platform',
          description: 'Engineered a scalable microservices architecture handling 100k+ daily events with 99.9% uptime, reducing server response latency by 40%.',
          technologies: 'React, Node.js, PostgreSQL, Docker',
          featured: true
        },
        {
          title: 'AI-Augmented Cloud Automation Tool',
          description: 'Architected an automated streaming pipeline utilizing LLM APIs and modern web sockets, streamlining data processing workflows for 500+ users.',
          technologies: 'Python, TypeScript, Vite, WebSockets',
          featured: true
        },
        {
          title: 'Accessible Design System & UI Suite',
          description: 'Created a WCAG AA-compliant component library with fluid responsive typography, zero-dependency animations, and dark/light mode persistence.',
          technologies: 'React, CSS Grid, Flexbox, TailwindCSS',
          featured: false
        }
      ],
      experience: [
        {
          role: 'Full-Stack Software Engineer',
          company: 'Technology Solutions & Lab',
          startDate: '2024',
          endDate: 'Present',
          isCurrent: true,
          description: 'Leading full-stack interface development, REST API design, database schema optimizations, and automated deployment pipelines.'
        }
      ],
      education: [
        {
          degree: 'Bachelor of Technology in Computer Science & Engineering',
          institution: 'University College of Engineering',
          startDate: '2022',
          endDate: '2026',
          description: 'Focus in Systems Programming, Distributed Web Applications, Database Management Systems, and Artificial Intelligence.'
        }
      ],
      source: 'Intelligent Offline Synthesizer'
    };
  },

  /**
   * Generates a polished biography tailored to a specified style.
   */
  async generateBio(profile = {}, style = 'technical') {
    const apiKey = this.getApiKey();
    const name = profile.title || 'Creator';
    const role = profile.headline || 'Software Engineer';
    const skills = profile.skills?.map(s => s.name).join(', ') || 'modern web technologies';

    if (apiKey) {
      try {
        const text = await this.callGemini(
          `Write a compelling, professional 2-paragraph portfolio biography in the '${style}' style for:
Name: ${name}
Current Role: ${role}
Skills: ${skills}
Return only the biography text.`
        );
        return text.trim();
      } catch (err) {
        console.warn('Gemini generateBio failed, using fallback:', err.message);
      }
    }

    // Heuristic Fallback
    await new Promise((r) => setTimeout(r, 450));
    switch (style) {
      case 'executive':
        return `I am ${name}, a results-driven ${role}. With extensive expertise spanning ${skills}, I specialize in building mission-critical platforms, leading cross-functional engineering teams, and translating complex product roadmaps into high-impact business outcomes. Dedicated to architectural rigor, scalable system design, and exceptional user value.`;
      case 'creative':
        return `Hi there! I'm ${name}, a visionary ${role} passionate about the intersection of design, motion, and digital craftsmanship. Crafting memorable interactive experiences using ${skills}. My philosophy is simple: technology should not merely solve problems—it should inspire and delight every person who touches it.`;
      case 'startup':
        return `I am ${name}, an energetic ${role} thriving at the 0-to-1 frontier. Experienced in ${skills}, I focus on rapid prototyping, high-velocity shipping, and high-retention user experiences. Passionate about turning ambitious ideas into scalable products that solve genuine everyday problems.`;
      case 'technical':
      default:
        return `I am ${name}, a ${role} focused on engineering scalable, performant, and resilient software systems. Proficient across ${skills}, I enjoy tackling distributed challenges, clean system architectures, and end-to-end full-stack development with disciplined testing and modern CI/CD pipelines.`;
    }
  },

  /**
   * Generates catchy, recruiter-optimized headlines.
   */
  async generateHeadlines(name = '', currentRole = '') {
    const apiKey = this.getApiKey();
    const role = currentRole || 'Software Engineer';

    if (apiKey) {
      try {
        const text = await this.callGemini(
          `Generate 4 short, punchy 6-10 word professional headlines with bullets or pipes for a portfolio of a ${role}. One headline per line.`
        );
        const lines = text.split('\n').map(l => l.replace(/^[\d.\-*]\s*/, '').trim()).filter(Boolean);
        if (lines.length > 0) return lines.slice(0, 4);
      } catch (err) {
        console.warn('Gemini headlines fallback:', err.message);
      }
    }

    await new Promise((r) => setTimeout(r, 300));
    return [
      `${role} • Building Scalable Digital Experiences`,
      `Senior ${role} | Cloud Systems & Modern Web Interfaces`,
      `${role} • Transforming Complex Ideas into High-Impact Code`,
      `Creative ${role} | Architecture, Performance & UX Design`
    ];
  },

  /**
   * Formats raw project notes into an impactful STAR-method description.
   */
  async enhanceProjectDescription({ title = 'Project', technologies = '', rawNotes = '' }) {
    const apiKey = this.getApiKey();

    if (apiKey) {
      try {
        const text = await this.callGemini(
          `Transform the following project notes into an impactful, professional 2-sentence STAR-method description (Situation, Task, Action, Result) suitable for a developer portfolio. Include performance metrics and technical keywords:
Project Title: ${title}
Technologies: ${technologies}
Raw Notes: "${rawNotes}"
Return only the enhanced 2-sentence description.`
        );
        return text.trim();
      } catch (err) {
        console.warn('Gemini enhance description fallback:', err.message);
      }
    }

    await new Promise((r) => setTimeout(r, 450));
    const techString = technologies ? ` using ${technologies}` : '';
    const cleanNotes = rawNotes.trim();

    if (!cleanNotes) {
      return `Architected and launched ${title}${techString}. Implemented clean component modularity, real-time data persistence, and responsive UI design, delivering a seamless experience across mobile and desktop viewports with 99.9% uptime.`;
    }

    return `Engineered ${title}${techString} to solve core workflow bottlenecks: ${cleanNotes}. Implemented responsive state management, optimized asset delivery pipelines, and comprehensive error resilience, reducing latency by 35% and enhancing user engagement.`;
  }
};
