const API =
  import.meta.env.VITE_API_URL;




import { useEffect, useMemo, useState } from "react";
import {
  Link,
  useParams,
} from "react-router-dom";

import ReactMarkdown from "react-markdown";

import {
  Prism as SyntaxHighlighter,
} from "react-syntax-highlighter";

import { Helmet } from "react-helmet-async";


fetch(
  apiUrl(`/api/posts/${slug}`)
)


function stripMarkdown(value = "") {
  return value
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[#>*_~-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}


function createDescription(content, maxLength = 160) {
  const cleanContent = stripMarkdown(content);

  if (cleanContent.length <= maxLength) {
    return cleanContent;
  }

  return `${cleanContent
    .slice(0, maxLength)
    .trim()}...`;
}


function formatDate(date) {
  if (!date) {
    return "";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat(
    "en-GB",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  ).format(parsedDate);
}


function calculateReadingTime(content = "") {
  const words = stripMarkdown(content)
    .split(/\s+/)
    .filter(Boolean)
    .length;

  const minutes = Math.max(
    1,
    Math.ceil(words / 220)
  );

  return `${minutes} min read`;
}


export default function Post() {
  const { slug } = useParams();

  const [post, setPost] = useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  useEffect(() => {
    setLoading(true);
    setError("");
    setPost(null);

    fetch(`${API}/api/posts/${slug}`)
      .then((res) => {
        if (!res.ok) {
          if (res.status === 404) {
            throw new Error(
              "Article not found."
            );
          }

          throw new Error(
            "Failed to load the article."
          );
        }

        return res.json();
      })
      .then((data) => {
        if (!data) {
          throw new Error(
            "Article not found."
          );
        }

        setPost(data);
      })
      .catch((err) => {
        console.error(
          "Failed to load article:",
          err
        );

        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug]);


  const description = useMemo(
    () =>
      post
        ? createDescription(
            post.content
          )
        : "",
    [post]
  );


  const readingTime = useMemo(
    () =>
      post
        ? calculateReadingTime(
            post.content
          )
        : "",
    [post]
  );


  if (loading) {
    return (
      <section className="article-status-page">
        <div className="container">
          <div className="article-status-message">
            Loading article...
          </div>
        </div>
      </section>
    );
  }


  if (error) {
    return (
      <section className="article-status-page">
        <div className="container">
          <div className="article-status-message">
            <p>{error}</p>

            <Link
              to="/blog"
              className="section-link"
            >
              ← Return to Blog
            </Link>
          </div>
        </div>
      </section>
    );
  }


  if (!post) {
    return null;
  }


  return (
    <>
      <Helmet>
        <title>
          {post.title} | Ikemefula Oriaku
        </title>

        <meta
          name="description"
          content={description}
        />

        <meta
          property="og:title"
          content={post.title}
        />

        <meta
          property="og:description"
          content={description}
        />

        <meta
          property="og:type"
          content="article"
        />

        {post.createdAt && (
          <meta
            property="article:published_time"
            content={post.createdAt}
          />
        )}
      </Helmet>


      {/* =========================
          ARTICLE HERO
      ========================== */}

      <header className="article-hero">
        <div className="container">
          <div className="article-hero-inner">

            <Link
              to="/blog"
              className="article-back-link"
            >
              ← Back to Blog
            </Link>


            {post.tags?.length > 0 && (
              <div className="article-primary-tag">
                {post.tags[0]}
              </div>
            )}


            <h1>
              {post.title}
            </h1>


            <div className="article-meta">
              {post.createdAt && (
                <time
                  dateTime={
                    post.createdAt
                  }
                >
                  {formatDate(
                    post.createdAt
                  )}
                </time>
              )}

              <span
                aria-hidden="true"
                className="article-meta-divider"
              >
                ·
              </span>

              <span>
                {readingTime}
              </span>

              <span
                aria-hidden="true"
                className="article-meta-divider"
              >
                ·
              </span>

              <span>
                Ikemefula Oriaku
              </span>
            </div>


            {post.tags?.length > 0 && (
              <div className="article-tags">
                {post.tags.map(
                  (tag) => (
                    <span key={tag}>
                      {tag}
                    </span>
                  )
                )}
              </div>
            )}

          </div>
        </div>
      </header>


      {/* =========================
          ARTICLE CONTENT
      ========================== */}

      <section className="article-section">
        <div className="container">

          <article className="article-layout">

            <div className="article-content">

              <ReactMarkdown
                components={{
                  h1({
                    children,
                  }) {
                    return (
                      <h2>
                        {children}
                      </h2>
                    );
                  },

                  h2({
                    children,
                  }) {
                    return (
                      <h2>
                        {children}
                      </h2>
                    );
                  },

                  h3({
                    children,
                  }) {
                    return (
                      <h3>
                        {children}
                      </h3>
                    );
                  },

                  a({
                    href,
                    children,
                  }) {
                    const external =
                      href?.startsWith(
                        "http"
                      );

                    return (
                      <a
                        href={href}
                        target={
                          external
                            ? "_blank"
                            : undefined
                        }
                        rel={
                          external
                            ? "noreferrer"
                            : undefined
                        }
                      >
                        {children}
                      </a>
                    );
                  },

                  blockquote({
                    children,
                  }) {
                    return (
                      <blockquote>
                        {children}
                      </blockquote>
                    );
                  },

                  img({
                    src,
                    alt,
                  }) {
                    return (
                      <figure className="article-image">
                        <img
                          src={src}
                          alt={
                            alt || ""
                          }
                          loading="lazy"
                        />

                        {alt && (
                          <figcaption>
                            {alt}
                          </figcaption>
                        )}
                      </figure>
                    );
                  },

                  code({
                    inline,
                    className,
                    children,
                    ...props
                  }) {
                    const match =
                      /language-(\w+)/.exec(
                        className || ""
                      );

                    if (
                      !inline &&
                      match
                    ) {
                      return (
                        <div className="article-code-block">
                          <div className="article-code-language">
                            {match[1]}
                          </div>

                          <SyntaxHighlighter
                            language={
                              match[1]
                            }
                            PreTag="div"
                            {...props}
                          >
                            {String(
                              children
                            ).replace(
                              /\n$/,
                              ""
                            )}
                          </SyntaxHighlighter>
                        </div>
                      );
                    }

                    return (
                      <code
                        className={
                          className
                        }
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  },

                  table({
                    children,
                  }) {
                    return (
                      <div className="article-table-wrapper">
                        <table>
                          {children}
                        </table>
                      </div>
                    );
                  },
                }}
              >
                {post.content}
              </ReactMarkdown>

            </div>
          </article>

        </div>
      </section>


      {/* =========================
          ARTICLE FOOTER
      ========================== */}

      <section className="article-footer">
        <div className="container">
          <div className="article-footer-inner">

            <div>
              <p className="section-eyebrow">
                Written by
              </p>

              <h2>
                Ikemefula Oriaku
              </h2>

              <p>
                Data and AI professional,
                developer, biomedical
                scientist, researcher, and
                educator exploring how data,
                science, and technology can
                solve practical problems.
              </p>
            </div>

            <div className="article-footer-actions">

              <Link
                to="/blog"
                className="btn btn-brand px-4 py-3"
              >
                More Articles
              </Link>

              <Link
                to="/projects"
                className="btn btn-outline-brand px-4 py-3"
              >
                Explore Projects
              </Link>

            </div>

          </div>
        </div>
      </section>
    </>
  );
}