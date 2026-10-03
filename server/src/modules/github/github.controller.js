/**
 * Controller to fetch GitHub public profiles and repositories for portfolio population
 */

exports.fetchGitHubProfile = async (req, res, next) => {
  try {
    const { username } = req.params;
    if (!username) {
      return res.status(400).json({ error: 'GitHub username is required.' });
    }

    const cleanUsername = username.trim().replace(/^https?:\/\/github\.com\//, '').replace(/\/$/, '');

    const response = await fetch(`https://api.github.com/users/${encodeURIComponent(cleanUsername)}`, {
      headers: {
        'User-Agent': 'Portfolio-Builder-App',
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    if (!response.ok) {
      if (response.status === 404) {
        return res.status(404).json({ error: `GitHub user "${cleanUsername}" was not found.` });
      }
      return res.status(response.status).json({ error: 'GitHub API returned an error.' });
    }

    const data = await response.json();

    res.json({
      profile: {
        username: data.login,
        name: data.name || data.login,
        bio: data.bio || '',
        avatarUrl: data.avatar_url,
        location: data.location || '',
        blog: data.blog || '',
        publicRepos: data.public_repos,
        followers: data.followers,
        htmlUrl: data.html_url
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.fetchGitHubRepos = async (req, res, next) => {
  try {
    const { username } = req.params;
    if (!username) {
      return res.status(400).json({ error: 'GitHub username is required.' });
    }

    const cleanUsername = username.trim().replace(/^https?:\/\/github\.com\//, '').replace(/\/$/, '');

    const response = await fetch(
      `https://api.github.com/users/${encodeURIComponent(cleanUsername)}/repos?sort=updated&per_page=30`,
      {
        headers: {
          'User-Agent': 'Portfolio-Builder-App',
          'Accept': 'application/vnd.github.v3+json'
        }
      }
    );

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Could not fetch GitHub repositories.' });
    }

    const repos = await response.json();

    // Map repos to standard project structure
    const formattedProjects = repos
      .filter(repo => !repo.fork) // prioritize original projects
      .map(repo => ({
        title: repo.name,
        description: repo.description || 'Public open-source repository.',
        technologies: repo.language || 'Code',
        repositoryUrl: repo.html_url,
        demoUrl: repo.homepage || repo.html_url,
        stars: repo.stargazers_count,
        updatedAt: repo.updated_at
      }));

    res.json({ repositories: formattedProjects });
  } catch (err) {
    next(err);
  }
};
