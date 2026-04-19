const USER = "gentleiyke"

export async function fetchGithubStats() {

  const reposRes = await fetch(
    `https://api.github.com/users/${USER}/repos?per_page=100`
  )

  const repos = await reposRes.json()

  const nonForks = repos.filter(repo => !repo.fork)

  const stars = nonForks.reduce(
    (sum, repo) => sum + repo.stargazers_count,
    0
  )

  return {
    repos: nonForks.length,
    stars,
    languages: [...new Set(nonForks.map(r => r.language).filter(Boolean))]
  }
}