export default function ProjectCard({ repo }) {

  const thumbnail =
    repo.homepage ||
    "https://via.placeholder.com/400x200?text=Project";

  return (
    <div className="project-card">

      <img
        src={thumbnail}
        alt={repo.name}
        className="project-image"
      />

      <div className="project-body">

        <h3>{repo.name}</h3>

        <p>{repo.description}</p>

        <div className="project-meta">
          ⭐ {repo.stars}
          • {repo.language}
        </div>

        <div className="project-links">

          <a href={repo.url} target="_blank">
            GitHub
          </a>

          {repo.homepage && (
            <a href={repo.homepage} target="_blank">
              Live Demo
            </a>
          )}

        </div>
      </div>

    </div>
  );
}