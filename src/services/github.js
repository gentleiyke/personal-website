const GITHUB_USER = "gentleiyke";

function getRepoThumbnail(repo) {
  // Custom local thumbnails by repo name
  const thumbnails = {
    // example:
    // "my-repo-name": "/thumbnails/my-repo-name.png",
  };

  return (
    thumbnails[repo.name] ||
    `https://opengraph.githubassets.com/1/${GITHUB_USER}/${repo.name}`
  );
}

export async function fetchRepos() {
  const url = `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`;
  
  const cached = localStorage.getItem("repos")
  if (cached) {
    return JSON.parse(cached)
  }

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`GitHub request failed: ${res.status}`);
  }

  const data = await res.json();

  localStorage.setItem(
    "repos",
    JSON.stringify(data)
  )

  return data
    .filter((repo) => !repo.fork)
    .map((repo) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      url: repo.html_url,
      homepage: repo.homepage,
      updatedAt: repo.updated_at,
      language: repo.language,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      featured: true,
      thumbnail: getRepoThumbnail(repo),
      topics: repo.topics || [],
    }));
}