const API =
  import.meta.env.VITE_API_URL;

import { apiUrl } from "../config/api";

import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

fetch(apiUrl("/api/posts"))

const writingThemes = [
  {
    title: "Healthcare & Life Sciences",
    description:
      "Healthcare analytics, biomedical science, genomics, bioinformatics, and evidence-led decision-making.",
  },
  {
    title: "Data & AI",
    description:
      "Practical analytics, machine learning, data quality, visualisation, automation, and responsible AI.",
  },
  {
    title: "Learning & Practice",
    description:
      "Tutorials, technical walkthroughs, professional development, and lessons from applied projects.",
  },
];

function stripHtml(value = "") {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function createExcerpt(content, maxLength = 180) {
  const cleanContent = stripHtml(content);

  if (cleanContent.length <= maxLength) {
    return cleanContent;
  }

  return `${cleanContent.slice(0, maxLength).trim()}...`;
}

function formatDate(date) {
  if (!date) return "";

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTag, setActiveTag] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch(`${API}/api/posts`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(
            `Failed to load posts: ${res.status} ${res.statusText}`
          );
        }

        return res.json();
      })
      .then((data) => {
        const sortedPosts = [...data].sort(
          (a, b) =>
            new Date(b.createdAt || 0) -
            new Date(a.createdAt || 0)
        );

        setPosts(sortedPosts);
      })
      .catch((err) => {
        console.error("Fetch error:", err);

        setError(
          err.message.includes("JSON")
            ? "Server returned an invalid response. Check that the backend is running."
            : err.message
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const featuredPost = posts[0];

  const allTags = useMemo(() => {
    const tags = posts.flatMap((post) =>
      Array.isArray(post.tags) ? post.tags : []
    );

    return [
      "All",
      ...Array.from(new Set(tags)).sort((a, b) =>
        a.localeCompare(b)
      ),
    ];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts
      .slice(featuredPost ? 1 : 0)
      .filter((post) => {
        const matchesTag =
          activeTag === "All" ||
          post.tags?.includes(activeTag);

        const query = searchTerm.trim().toLowerCase();

        const searchableText = [
          post.title,
          stripHtml(post.content),
          ...(post.tags || []),
        ]
          .join(" ")
          .toLowerCase();

        const matchesSearch =
          !query || searchableText.includes(query);

        return matchesTag && matchesSearch;
      });
  }, [
    posts,
    featuredPost,
    activeTag,
    searchTerm,
  ]);

  return (
    <>
      <Helmet>
        <title>
          Blog | Data, AI, Healthcare & Technology |
          Ikemefula Oriaku
        </title>

        <meta
          name="description"
          content="Articles, tutorials, and practical insights from Ikemefula Oriaku covering data analytics, AI, healthcare, life sciences, technology, and professional learning."
        />
      </Helmet>

      {/* =========================
          PAGE INTRO
      ========================== */}

      <section className="page-intro blog-intro">
        <div className="container">
          <p className="section-eyebrow">
            Blog
          </p>

          <h1>
            Ideas, practical lessons, and
            evidence-led thinking.
          </h1>

          <p className="page-intro-copy">
            Writing about data, artificial
            intelligence, healthcare, technology,
            research, and the process of learning
            through practical work.
          </p>
        </div>
      </section>

      {/* =========================
          LOADING / ERROR
      ========================== */}

      {loading && (
        <section className="section-space blog-status-section">
          <div className="container">
            <div className="blog-status-message">
              Loading articles...
            </div>
          </div>
        </section>
      )}

      {!loading && error && (
        <section className="section-space blog-status-section">
          <div className="container">
            <div className="blog-status-message blog-status-error">
              {error}
            </div>
          </div>
        </section>
      )}

      {!loading && !error && (
        <>
          {/* =========================
              FEATURED ARTICLE
          ========================== */}

          {featuredPost && (
            <section className="section-space blog-featured">
              <div className="container">
                <div className="section-heading mb-5">
                  <p className="section-eyebrow">
                    Featured Article
                  </p>

                  <h2>
                    Latest thinking and practical insight.
                  </h2>
                </div>

                <article className="featured-blog-card">
                  <div className="row g-0">
                    <div className="col-lg-4">
                      <div className="featured-blog-visual">
                        <span>
                          Insight
                        </span>

                        <strong>
                          {featuredPost.tags?.[0] ||
                            "Data & Technology"}
                        </strong>
                      </div>
                    </div>

                    <div className="col-lg-8">
                      <div className="featured-blog-content">
                        <div className="blog-card-meta">
                          {featuredPost.tags?.[0] && (
                            <span>
                              {featuredPost.tags[0]}
                            </span>
                          )}

                          <time
                            dateTime={
                              featuredPost.createdAt
                            }
                          >
                            {formatDate(
                              featuredPost.createdAt
                            )}
                          </time>
                        </div>

                        <h2>
                          {featuredPost.title}
                        </h2>

                        <p>
                          {createExcerpt(
                            featuredPost.content,
                            260
                          )}
                        </p>

                        <Link
                          to={`/blog/${featuredPost.slug}`}
                          className="section-link"
                        >
                          Read article →
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </section>
          )}

          {/* =========================
              ARTICLE LIBRARY
          ========================== */}

          <section className="section-space blog-library">
            <div className="container">
              <div className="section-heading section-heading-row mb-4">
                <div>
                  <p className="section-eyebrow">
                    Article Library
                  </p>

                  <h2>
                    Explore the writing.
                  </h2>

                  <p>
                    Browse practical tutorials,
                    analysis, research perspectives,
                    and professional insights.
                  </p>
                </div>
              </div>

              {/* SEARCH */}

              <div className="blog-toolbar">
                <label
                  htmlFor="blog-search"
                  className="visually-hidden"
                >
                  Search articles
                </label>

                <input
                  id="blog-search"
                  type="search"
                  className="form-control"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(event) =>
                    setSearchTerm(
                      event.target.value
                    )
                  }
                />
              </div>

              {/* TAG FILTERS */}

              <div
                className="blog-tag-filters"
                aria-label="Filter articles by tag"
              >
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    className={`blog-tag-button ${
                      activeTag === tag
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      setActiveTag(tag)
                    }
                  >
                    {tag}
                  </button>
                ))}
              </div>

              {filteredPosts.length === 0 ? (
                <div className="blog-status-message">
                  No articles match your current
                  search or filter.
                </div>
              ) : (
                <div className="row g-4">
                  {filteredPosts.map((post) => (
                    <div
                      key={post._id}
                      className="col-lg-4 col-md-6"
                    >
                      <article className="blog-card">
                        <div className="blog-card-top">
                          <div className="blog-card-meta">
                            {post.tags?.[0] && (
                              <span>
                                {post.tags[0]}
                              </span>
                            )}

                            <time
                              dateTime={
                                post.createdAt
                              }
                            >
                              {formatDate(
                                post.createdAt
                              )}
                            </time>
                          </div>

                          <h3>
                            {post.title}
                          </h3>

                          <p>
                            {createExcerpt(
                              post.content
                            )}
                          </p>
                        </div>

                        {post.tags?.length > 0 && (
                          <div className="blog-card-tags">
                            {post.tags
                              .slice(0, 3)
                              .map((tag) => (
                                <span key={tag}>
                                  {tag}
                                </span>
                              ))}
                          </div>
                        )}

                        <div className="blog-card-footer">
                          <Link
                            to={`/blog/${post.slug}`}
                            className="mode-link"
                          >
                            Read article →
                          </Link>
                        </div>
                      </article>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* =========================
              WRITING THEMES
          ========================== */}

          <section className="section-space writing-themes">
            <div className="container">
              <div className="section-heading mb-5">
                <p className="section-eyebrow">
                  What I Write About
                </p>

                <h2>
                  Knowledge grounded in practice.
                </h2>

                <p>
                  My writing reflects the same
                  intersection as my professional
                  work: science, data, technology,
                  and education.
                </p>
              </div>

              <div className="row g-4">
                {writingThemes.map(
                  (theme) => (
                    <div
                      key={theme.title}
                      className="col-lg-4"
                    >
                      <article className="writing-theme-card">
                        <h3>
                          {theme.title}
                        </h3>

                        <p>
                          {theme.description}
                        </p>
                      </article>
                    </div>
                  )
                )}
              </div>
            </div>
          </section>

          {/* =========================
              CTA
          ========================== */}

          <section className="home-cta">
            <div className="container">
              <div className="home-cta-inner">
                <p className="section-eyebrow">
                  Continue Exploring
                </p>

                <h2>
                  Prefer practical work to articles?
                </h2>

                <p>
                  Explore the projects and case
                  studies behind many of the ideas
                  I write and teach about.
                </p>

                <div className="d-flex flex-wrap gap-3">
                  <Link
                    to="/projects"
                    className="btn btn-brand px-4 py-3"
                  >
                    Explore Projects
                  </Link>

                  <Link
                    to="/contact"
                    className="btn btn-outline-brand px-4 py-3"
                  >
                    Get in Touch
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}