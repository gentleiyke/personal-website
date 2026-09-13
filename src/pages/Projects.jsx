import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { fetchRepos } from "../services/github";

import defaultProjectThumbnail from "../assets/portfolio-image.png";

const featuredProjects = [
  {
    id: 1,
    category: "Bioinformatics",
    title: "Mouse Influenza RNA-seq Analysis",
    problem:
      "Understand gene-expression changes in mouse cerebellum following influenza infection using publicly available RNA-seq data.",
    approach:
      "Built a reproducible workflow covering SRA retrieval, quality control, reference preparation, HISAT2 alignment, featureCounts quantification, and DESeq2 differential-expression analysis.",
    outcome:
      "Produced a complete RNA-seq analysis pipeline with QC outputs, count matrices, visualisations, and interpretable differential-expression results.",
    tools: [
      "Bash",
      "FastQC",
      "MultiQC",
      "HISAT2",
      "featureCounts",
      "R",
      "DESeq2",
    ],
    github:
      "https://github.com/gentleiyke/mouse-influenza-rnaseq-analysis",
    featured: true,
  },
  {
    id: 2,
    category: "Healthcare Analytics",
    title: "Clinical Risk Signal Explorer",
    problem:
      "Help users identify and explore clinically meaningful patterns in structured healthcare data.",
    approach:
      "Designed an analytical workflow that brings together data preparation, clinical indicators, interactive exploration, and clear visual presentation.",
    outcome:
      "Created a reusable healthcare analytics project demonstrating how raw clinical information can be converted into decision-support insight.",
    tools: [
      "Python",
      "Data Analysis",
      "Healthcare Analytics",
      "Visualisation",
    ],
    github:
      "https://github.com/gentleiyke/clinical-risk-signal-explorer",
    featured: true,
  },
  {
    id: 3,
    category: "Genomics / Data Product",
    title: "Cancer Annotation MVP",
    problem:
      "Create a practical way to organise cancer-related gene and mutation information with population-aware context.",
    approach:
      "Built a lightweight genomics annotation workflow around cancer-associated genes, curated mutations, African population frequencies, and variant interpretation.",
    outcome:
      "Produced an MVP that combines scientific curation, structured data, and genomic annotation into a usable analytical resource.",
    tools: [
      "Genomics",
      "Variant Annotation",
      "VEP",
      "JSON",
      "R",
    ],
    github:
      "https://github.com/gentleiyke/cancer-annotation-mvp",
    featured: true,
  },
];

const projectCategories = [
  "All",
  "Data & Analytics",
  "Healthcare",
  "Bioinformatics",
  "Development",
];

function normaliseCategory(repo) {
  const text = `${repo.name || ""} ${repo.description || ""}`.toLowerCase();

  if (
    text.includes("bioinformatics") ||
    text.includes("genomic") ||
    text.includes("rna") ||
    text.includes("gene")
  ) {
    return "Bioinformatics";
  }

  if (
    text.includes("health") ||
    text.includes("clinical") ||
    text.includes("ehr")
  ) {
    return "Healthcare";
  }

  if (
    text.includes("analysis") ||
    text.includes("data") ||
    text.includes("analytics") ||
    text.includes("dashboard")
  ) {
    return "Data & Analytics";
  }

  return "Development";
}

export default function Projects() {
  const [repos, setRepos] = useState([]);
  const [repoError, setRepoError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("updated");

  useEffect(() => {
    fetchRepos()
      .then(setRepos)
      .catch((error) => {
        console.error(
          "Failed to load GitHub repositories:",
          error
        );
        setRepoError(true);
      });
  }, []);

  const filteredRepos = useMemo(() => {
    let result = repos.map((repo) => ({
      ...repo,
      portfolioCategory: normaliseCategory(repo),
    }));

    if (activeCategory !== "All") {
      result = result.filter(
        (repo) =>
          repo.portfolioCategory === activeCategory
      );
    }

    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase();

      result = result.filter((repo) => {
        const searchable =
          `${repo.name || ""} ${repo.description || ""}`.toLowerCase();

        return searchable.includes(query);
      });
    }

    result = [...result].sort((a, b) => {
      if (sortBy === "stars") {
        return (b.stars || 0) - (a.stars || 0);
      }

      if (sortBy === "name") {
        return (a.name || "").localeCompare(
          b.name || ""
        );
      }

      return (
        new Date(b.updatedAt || 0) -
        new Date(a.updatedAt || 0)
      );
    });

    return result;
  }, [
    repos,
    activeCategory,
    searchTerm,
    sortBy,
  ]);

  return (
    <>
      <Helmet>
        <title>
          Projects | Data, AI, Bioinformatics & Development | Ikemefula Oriaku
        </title>

        <meta
          name="description"
          content="Explore selected projects and GitHub repositories by Ikemefula Oriaku across data analytics, healthcare, bioinformatics, artificial intelligence, and digital development."
        />
      </Helmet>

      {/* =========================
          PAGE INTRO
      ========================== */}

      <section className="page-intro projects-intro">
        <div className="container">
          <p className="section-eyebrow">
            Projects
          </p>

          <h1>
            Practical work across data,
            science, and digital solutions.
          </h1>

          <p className="page-intro-copy">
            Selected case studies and technical
            projects showing how I investigate
            problems, build solutions, and turn
            ideas into practical outputs.
          </p>
        </div>
      </section>

      {/* =========================
          FEATURED CASE STUDIES
      ========================== */}

      <section className="section-space projects-featured">
        <div className="container">
          <div className="section-heading mb-5">
            <p className="section-eyebrow">
              Featured Case Studies
            </p>

            <h2>
              The work behind the repository.
            </h2>

            <p>
              These selected projects are presented
              as case studies so the problem,
              approach, and outcome are clear before
              you inspect the code.
            </p>
          </div>

          <div className="row g-4">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                className="col-12"
              >
                <article className="case-study-card">
                  <div className="case-study-top">
                    <div>
                      <p className="case-study-category">
                        {project.category}
                      </p>

                      <h3>
                        {project.title}
                      </h3>
                    </div>

                    <span className="case-study-badge">
                      Featured
                    </span>
                  </div>

                  <div className="row g-4 mt-1">
                    <div className="col-lg-4">
                      <div className="case-study-block">
                        <span>
                          Problem
                        </span>

                        <p>
                          {project.problem}
                        </p>
                      </div>
                    </div>

                    <div className="col-lg-4">
                      <div className="case-study-block">
                        <span>
                          Approach
                        </span>

                        <p>
                          {project.approach}
                        </p>
                      </div>
                    </div>

                    <div className="col-lg-4">
                      <div className="case-study-block">
                        <span>
                          Outcome
                        </span>

                        <p>
                          {project.outcome}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="case-study-footer">
                    <div className="case-study-tools">
                      {project.tools.map((tool) => (
                        <span key={tool}>
                          {tool}
                        </span>
                      ))}
                    </div>

                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="section-link"
                    >
                      View repository →
                    </a>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================
          GITHUB PORTFOLIO
      ========================== */}

      <section className="section-space github-portfolio">
        <div className="container">
          <div className="section-heading mb-4">
            <p className="section-eyebrow">
              GitHub Portfolio
            </p>

            <h2>
              Explore the code.
            </h2>

            <p>
              Browse public repositories across
              analytics, healthcare, genomics,
              software development, and technical
              experiments.
            </p>
          </div>

          {/* FILTERS */}

          <div className="project-toolbar">
            <div className="project-search">
              <label
                htmlFor="project-search"
                className="visually-hidden"
              >
                Search repositories
              </label>

              <input
                id="project-search"
                type="search"
                className="form-control"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(
                    event.target.value
                  )
                }
              />
            </div>

            <div className="project-sort">
              <label
                htmlFor="project-sort"
                className="visually-hidden"
              >
                Sort repositories
              </label>

              <select
                id="project-sort"
                className="form-select"
                value={sortBy}
                onChange={(event) =>
                  setSortBy(
                    event.target.value
                  )
                }
              >
                <option value="updated">
                  Recently updated
                </option>

                <option value="stars">
                  Most stars
                </option>

                <option value="name">
                  Name
                </option>
              </select>
            </div>
          </div>

          {/* CATEGORIES */}

          <div
            className="project-category-filters"
            aria-label="Filter projects by category"
          >
            {projectCategories.map(
              (category) => (
                <button
                  key={category}
                  type="button"
                  className={`project-filter-button ${
                    activeCategory === category
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setActiveCategory(
                      category
                    )
                  }
                >
                  {category}
                </button>
              )
            )}
          </div>

          {repoError && (
            <div className="project-status-message">
              GitHub repositories are temporarily
              unavailable.
            </div>
          )}

          {!repoError &&
            filteredRepos.length === 0 && (
              <div className="project-status-message">
                No repositories match your current
                filters.
              </div>
            )}

          {/* REPOSITORY CARDS */}

          <div className="row g-4">
            {filteredRepos.map((repo) => (
              <div
                key={repo.id}
                className="col-xl-4 col-md-6"
              >
                <article className="github-project-card">
                  <div className="github-project-header">
                    <div className="github-project-thumbnail">
                      <img
                        src={
                          repo.thumbnail ||
                          defaultProjectThumbnail
                        }
                        alt=""
                      />
                    </div>

                    <div>
                      <p className="github-project-category">
                        {
                          repo.portfolioCategory
                        }
                      </p>

                      <h3>
                        {repo.name}
                      </h3>
                    </div>
                  </div>

                  <p className="github-project-description">
                    {repo.description ||
                      "A technical project exploring practical approaches to data, development, or digital problem solving."}
                  </p>

                  <div className="github-project-stats">
                    <span>
                      ★ {repo.stars || 0}
                    </span>

                    {repo.language && (
                      <span>
                        {repo.language}
                      </span>
                    )}

                    <span>
                      Repository
                    </span>
                  </div>

                  <div className="github-project-footer">
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mode-link"
                    >
                      View on GitHub →
                    </a>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}