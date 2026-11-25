import { apiRequest } from './api';

export const githubService = {
  cleanUsername(raw = '') {
    return raw
      .trim()
      .replace(/^https?:\/\/github\.com\//i, '')
      .replace(/\/$/, '')
      .split('/')[0];
  },

  async getUserProfile(username) {
    const clean = this.cleanUsername(username);
    if (!clean) throw new Error('GitHub username is required.');

    try {
      const data = await apiRequest(`/api/v1/github/user/${encodeURIComponent(clean)}`);
      if (data && data.profile) return data.profile;
      if (data && data.user) return data.user;
      return data;
    } catch (serverErr) {
      // Browser direct fallback if backend hits rate-limit or proxy block
      try {
        const res = await fetch(`https://api.github.com/users/${encodeURIComponent(clean)}`, {
          headers: { Accept: 'application/vnd.github.v3+json' }
        });
        if (res.ok) {
          const d = await res.json();
          return {
            username: d.login,
            name: d.name || d.login,
            bio: d.bio || '',
            avatarUrl: d.avatar_url,
            location: d.location || '',
            company: d.company || '',
            blog: d.blog || '',
            publicRepos: d.public_repos,
            followers: d.followers,
            htmlUrl: d.html_url
          };
        }
      } catch (browserErr) {
        console.warn('Browser direct fetch also failed:', browserErr);
      }
      throw serverErr;
    }
  },

  async getUserRepos(username) {
    const clean = this.cleanUsername(username);
    if (!clean) throw new Error('GitHub username is required.');

    try {
      const data = await apiRequest(`/api/v1/github/repos/${encodeURIComponent(clean)}`);
      const list = data.repositories || data.repos || (Array.isArray(data) ? data : []);
      if (list.length > 0 || !data.isRateLimited) {
        return list;
      }
    } catch (serverErr) {
      console.warn('Server repos fetch error, attempting direct browser fetch:', serverErr.message);
    }

    // Direct browser fetch
    try {
      const res = await fetch(
        `https://api.github.com/users/${encodeURIComponent(clean)}/repos?sort=updated&per_page=30`,
        { headers: { Accept: 'application/vnd.github.v3+json' } }
      );
      if (res.ok) {
        const list = await res.json();
        if (Array.isArray(list)) {
          return list
            .filter((repo) => !repo.fork)
            .map((repo) => ({
              title: repo.name,
              description: repo.description || 'Public open-source repository on GitHub.',
              technologies: repo.language || 'Code',
              repositoryUrl: repo.html_url,
              demoUrl: repo.homepage || repo.html_url,
              stars: repo.stargazers_count || 0,
              updatedAt: repo.updated_at
            }));
        }
      }
    } catch (err) {
      console.warn('Browser direct repos fetch failed:', err);
    }

    return [];
  }
};
