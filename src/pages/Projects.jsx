import { useEffect, useMemo, useState } from "react";
import { fetchRepos } from "../services/github";
import ProjectModal from "../components/ProjectModal";

function formatDate(iso) {
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

export default function Projects() {
  const [repos, setRepos] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("updated");
  const [language, setLanguage] = useState("all");
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [page, setPage] = useState(1);
  const perPage = 6;

  useEffect(() => {
    async function loadRepos() {
      try {
        setStatus("loading");
        const data = await fetchRepos();
        setRepos(data);
        setStatus("success");
      } catch (err) {
        setError(err.message || "Failed to load repositories");
        setStatus("error");
      }
    }

    loadRepos();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [search, language]);

  const filteredRepos = useMemo(() => {
    return repos.filter((repo) => {
      const text = `${repo.name} ${repo.description || ""}`.toLowerCase();
      const searchMatch = text.includes(search.toLowerCase());
      const languageMatch = language === "all" || repo.language === language;
      return searchMatch && languageMatch;
    });
  }, [repos, search, language]);

  const sortedRepos = useMemo(() => {
    const r = [...filteredRepos];

    if (sort === "stars") {
      r.sort((a, b) => b.stars - a.stars);
    }

    if (sort === "updated") {
      r.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    }

    return r;
  }, [filteredRepos, sort]);

  const languages = useMemo(() => {
    const langs = repos.map((repo) => repo.language).filter(Boolean);
    return ["all", ...new Set(langs)];
  }, [repos]);

  const paginatedRepos = useMemo(() => {
    const start = (page - 1) * perPage;
    return sortedRepos.slice(start, start + perPage);
  }, [sortedRepos, page]);

  return (
    <>
      <section className="hero-simple">
        <div className="container">
          <h1>My Projects</h1>
          <p>Explore my GitHub repositories and featured projects.</p>
        </div>
      </section>

      <section className="section-space">
        <div className="container">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
            <div>
              <h2 className="fw-bold mb-1">Projects</h2>
              <p className="text-muted-custom mb-0">
                GitHub-powered portfolio projects with featured cards and cleaner filtering.
              </p>
            </div>

            <div className="d-flex gap-2 align-items-end">
              <div className="flex-grow-1" style={{ minWidth: '200px' }}>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Filter by name, description or language"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div style={{ width: '140px' }}>
                <select
                  className="form-select form-select-sm"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option value="updated">Recently Updated</option>
                  <option value="stars">Most Stars</option>
                </select>
              </div>
              <div style={{ width: '120px' }}>
                <select
                  className="form-select form-select-sm"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  {languages.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

        {status === "loading" && (
          <div className="glass-card p-4">Loading repositories...</div>
        )}

        {status === "error" && (
          <div className="glass-card p-4">
            <h5>Could not load repositories</h5>
            <p className="mb-0 text-muted-custom">{error}</p>
          </div>
        )}

        {status === "success" && (
          <>
            {paginatedRepos.length === 0 ? (
              <div className="glass-card p-4">
                <h5>No projects match your filters</h5>
                <p className="mb-0 text-muted-custom">
                  Try adjusting the search term or language selection.
                </p>
              </div>
            ) : (
              <div className="row g-4">
                {paginatedRepos.map((repo) => (
                  <div className="col-md-6 col-lg-4" key={repo.id}>
                    <div
                      className="modern-project-card"
                      onClick={() => setSelectedRepo(repo)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="card-thumbnail">
                        <img
                          src={repo.thumbnail || "https://via.placeholder.com/80x80/0F172A/06B6D4?text=Project"}
                          alt="Project thumbnail"
                          onError={(e) => {
                            e.currentTarget.src = "https://via.placeholder.com/80x80/0F172A/06B6D4?text=Project";
                          }}
                        />
                      </div>
                      <div className="card-content">
                        <h5 className="card-title">{repo.name}</h5>
                        <p className="card-description">
                          {repo.description || "No description available."}
                        </p>
                        <div className="card-stats">
                          <span className="stat-item">Likes: {repo.stars}</span>
                          <a
                            href={repo.url}
                            target="_blank"
                            rel="noreferrer"
                            className="stat-link"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Repo
                          </a>
                          <span className="stat-item">Stars: {repo.stars}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <div className="d-flex justify-content-center mt-4">
        <button
          className="btn btn-outline-brand me-2"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>

        <button
          className="btn btn-outline-brand"
          disabled={page * perPage >= sortedRepos.length}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>

      <ProjectModal repo={selectedRepo} onClose={() => setSelectedRepo(null)} />
    </section>
    </>
  );
}