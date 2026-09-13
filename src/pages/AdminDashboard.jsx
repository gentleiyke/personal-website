import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import ReactMarkdown from "react-markdown";

import {
  Prism as SyntaxHighlighter,
} from "react-syntax-highlighter";

import { Helmet } from "react-helmet-async";


fetch(
  apiUrl("/api/posts/admin/all")
)


const API =
  import.meta.env.VITE_API_URL;


const emptyForm = {
  title: "",
  slug: "",
  tags: "",
  content: "",
  status: "draft",
};


function createSlug(value = "") {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}


function formatDate(date) {
  if (!date) {
    return "—";
  }

  const parsedDate =
    new Date(date);

  if (
    Number.isNaN(
      parsedDate.getTime()
    )
  ) {
    return "—";
  }

  return new Intl.DateTimeFormat(
    "en-GB",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  ).format(parsedDate);
}


export default function AdminDashboard() {
  const navigate =
    useNavigate();

  const [posts, setPosts] =
    useState([]);

  const [form, setForm] =
    useState(emptyForm);

  const [
    editingId,
    setEditingId,
  ] = useState(null);

  const [
    showPreview,
    setShowPreview,
  ] = useState(false);

  const [
    loadingPosts,
    setLoadingPosts,
  ] = useState(true);

  const [
    saving,
    setSaving,
  ] = useState(false);

  const [
    deletingId,
    setDeletingId,
  ] = useState(null);

  const [error, setError] =
    useState("");

  const [
    successMessage,
    setSuccessMessage,
  ] = useState("");


  const token =
    localStorage.getItem(
      "token"
    );


  function logout() {
    localStorage.removeItem(
      "token"
    );

    navigate(
      "/admin-login",
      {
        replace: true,
      }
    );
  }


  function handleUnauthorised() {
    localStorage.removeItem(
      "token"
    );

    navigate(
      "/admin-login",
      {
        replace: true,
      }
    );
  }


  function clearMessages() {
    setError("");
    setSuccessMessage("");
  }


  async function fetchPosts() {
    setLoadingPosts(true);

    try {
      const response =
        await fetch(
          `${API}/api/posts/admin/all`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );


      if (
        response.status === 401
      ) {
        handleUnauthorised();

        return;
      }


      const data =
        await response.json();


      if (!response.ok) {
        throw new Error(
          data.error ||
            "Unable to load articles."
        );
      }


      setPosts(
        Array.isArray(data)
          ? data
          : []
      );

    } catch (err) {
      console.error(
        "Admin article load error:",
        err
      );

      setError(
        err.message
      );

    } finally {
      setLoadingPosts(false);
    }
  }


  useEffect(() => {
    if (!API) {
      setError(
        "VITE_API_URL is not configured."
      );

      setLoadingPosts(false);

      return;
    }

    fetchPosts();
  }, []);


  function handleTitleChange(
    event
  ) {
    const title =
      event.target.value;


    setForm((current) => {
      const oldAutoSlug =
        createSlug(
          current.title
        );

      const shouldUpdateSlug =
        !current.slug ||
        current.slug ===
          oldAutoSlug;


      return {
        ...current,

        title,

        slug:
          shouldUpdateSlug
            ? createSlug(
                title
              )
            : current.slug,
      };
    });
  }


  function handleChange(
    event
  ) {
    const {
      name,
      value,
    } = event.target;


    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }


  function resetEditor() {
    setForm(emptyForm);

    setEditingId(null);

    setShowPreview(false);

    clearMessages();
  }


  function startEditing(post) {
    clearMessages();

    setEditingId(
      post._id
    );


    setForm({
      title:
        post.title || "",

      slug:
        post.slug || "",

      tags:
        Array.isArray(
          post.tags
        )
          ? post.tags.join(
              ", "
            )
          : "",

      content:
        post.content || "",

      status:
        post.status ||
        "draft",
    });


    setShowPreview(false);


    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }


  function preparePayload(
    statusOverride
  ) {
    return {
      title:
        form.title.trim(),

      slug:
        form.slug.trim(),

      tags:
        form.tags
          .split(",")
          .map((tag) =>
            tag.trim()
          )
          .filter(Boolean),

      content:
        form.content,

      status:
        statusOverride ||
        form.status,
    };
  }


  async function saveArticle(
    statusOverride
  ) {
    clearMessages();


    if (
      !form.title.trim() ||
      !form.slug.trim() ||
      !form.content.trim()
    ) {
      setError(
        "Title, slug, and content are required."
      );

      return;
    }


    setSaving(true);


    const isEditing =
      Boolean(editingId);


    const endpoint =
      isEditing
        ? `${API}/api/posts/${editingId}`
        : `${API}/api/posts`;


    try {
      const response =
        await fetch(
          endpoint,
          {
            method:
              isEditing
                ? "PUT"
                : "POST",

            headers: {
              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`,
            },

            body:
              JSON.stringify(
                preparePayload(
                  statusOverride
                )
              ),
          }
        );


      if (
        response.status === 401
      ) {
        handleUnauthorised();

        return;
      }


      const data =
        await response.json();


      if (!response.ok) {
        throw new Error(
          data.error ||
            "Unable to save article."
        );
      }


      if (isEditing) {
        setPosts(
          (current) =>
            current.map(
              (post) =>
                post._id ===
                data._id
                  ? data
                  : post
            )
        );
      } else {
        setPosts(
          (current) => [
            data,
            ...current,
          ]
        );

        setEditingId(
          data._id
        );
      }


      setForm({
        title:
          data.title,

        slug:
          data.slug,

        tags:
          data.tags?.join(
            ", "
          ) || "",

        content:
          data.content,

        status:
          data.status,
      });


      setSuccessMessage(
        data.status ===
          "published"
          ? "Article published successfully."
          : "Draft saved successfully."
      );

    } catch (err) {
      console.error(
        "Article save error:",
        err
      );

      setError(
        err.message
      );

    } finally {
      setSaving(false);
    }
  }


  async function deleteArticle(
    post
  ) {
    const confirmed =
      window.confirm(
        `Delete "${post.title}"?\n\nThis action cannot be undone.`
      );


    if (!confirmed) {
      return;
    }


    clearMessages();

    setDeletingId(
      post._id
    );


    try {
      const response =
        await fetch(
          `${API}/api/posts/${post._id}`,
          {
            method:
              "DELETE",

            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );


      if (
        response.status === 401
      ) {
        handleUnauthorised();

        return;
      }


      const data =
        await response.json();


      if (!response.ok) {
        throw new Error(
          data.error ||
            "Unable to delete article."
        );
      }


      setPosts(
        (current) =>
          current.filter(
            (item) =>
              item._id !==
              post._id
          )
      );


      if (
        editingId ===
        post._id
      ) {
        resetEditor();
      }


      setSuccessMessage(
        "Article deleted."
      );

    } catch (err) {
      console.error(
        "Delete article error:",
        err
      );

      setError(
        err.message
      );

    } finally {
      setDeletingId(
        null
      );
    }
  }


  async function togglePublication(
    post
  ) {
    clearMessages();


    const nextStatus =
      post.status ===
      "published"
        ? "draft"
        : "published";


    try {
      const response =
        await fetch(
          `${API}/api/posts/${post._id}`,
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`,
            },

            body:
              JSON.stringify({
                title:
                  post.title,

                slug:
                  post.slug,

                content:
                  post.content,

                tags:
                  post.tags || [],

                status:
                  nextStatus,
              }),
          }
        );


      if (
        response.status === 401
      ) {
        handleUnauthorised();

        return;
      }


      const data =
        await response.json();


      if (!response.ok) {
        throw new Error(
          data.error ||
            "Unable to update publication status."
        );
      }


      setPosts(
        (current) =>
          current.map(
            (item) =>
              item._id ===
              data._id
                ? data
                : item
          )
      );


      if (
        editingId ===
        data._id
      ) {
        setForm(
          (current) => ({
            ...current,
            status:
              data.status,
          })
        );
      }


      setSuccessMessage(
        data.status ===
          "published"
          ? "Article published."
          : "Article moved to draft."
      );

    } catch (err) {
      console.error(
        "Publication status error:",
        err
      );

      setError(
        err.message
      );
    }
  }


  const publishedCount =
    useMemo(
      () =>
        posts.filter(
          (post) =>
            post.status ===
            "published"
        ).length,
      [posts]
    );


  const draftCount =
    useMemo(
      () =>
        posts.filter(
          (post) =>
            post.status !==
            "published"
        ).length,
      [posts]
    );


  return (
    <>
      <Helmet>

        <title>
          Content Dashboard |
          Ikemefula Oriaku
        </title>

        <meta
          name="robots"
          content="noindex, nofollow"
        />

      </Helmet>


      <section className="admin-dashboard">


        {/* =========================
            HEADER
        ========================== */}

        <header className="admin-dashboard-header">

          <div className="container">

            <div className="admin-header-inner">

              <div>

                <p className="section-eyebrow">
                  Administration
                </p>

                <h1>
                  Content Dashboard
                </h1>

                <p>
                  Draft, preview,
                  publish and manage
                  website articles.
                </p>

              </div>


              <div className="admin-header-actions">

                <Link
                  to="/blog"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline-brand"
                >
                  View Blog
                </Link>


                <button
                  type="button"
                  className="admin-logout-button"
                  onClick={logout}
                >
                  Sign Out
                </button>

              </div>

            </div>

          </div>

        </header>


        <div className="container admin-dashboard-body">


          {/* =========================
              OVERVIEW
          ========================== */}

          <section className="admin-overview">

            <div className="row g-3">

              <div className="col-md-4">

                <article className="admin-stat-card">

                  <span>
                    Total articles
                  </span>

                  <strong>
                    {posts.length}
                  </strong>

                </article>

              </div>


              <div className="col-md-4">

                <article className="admin-stat-card">

                  <span>
                    Published
                  </span>

                  <strong>
                    {publishedCount}
                  </strong>

                </article>

              </div>


              <div className="col-md-4">

                <article className="admin-stat-card">

                  <span>
                    Drafts
                  </span>

                  <strong>
                    {draftCount}
                  </strong>

                </article>

              </div>

            </div>

          </section>


          {/* =========================
              EDITOR
          ========================== */}

          <section className="admin-editor-section">

            <div className="admin-section-heading">

              <p className="section-eyebrow">
                {editingId
                  ? "Edit Article"
                  : "New Article"}
              </p>

              <h2>
                {editingId
                  ? "Update your article"
                  : "Create an article"}
              </h2>

              <p>
                Write in Markdown,
                preview the result,
                then save as a draft
                or publish.
              </p>

            </div>


            <div className="admin-editor-toolbar">

              {editingId && (

                <button
                  type="button"
                  className="admin-secondary-button"
                  onClick={
                    resetEditor
                  }
                >
                  + New article
                </button>

              )}


              <button
                type="button"
                className={`admin-secondary-button ${
                  showPreview
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setShowPreview(
                    (current) =>
                      !current
                  )
                }
              >
                {showPreview
                  ? "Hide preview"
                  : "Preview"}
              </button>

            </div>


            <div className="admin-editor-card">

              <div className="row g-4">


                {/* TITLE */}

                <div className="col-12">

                  <label
                    htmlFor="post-title"
                    className="form-label"
                  >
                    Article title *
                  </label>

                  <input
                    id="post-title"
                    type="text"
                    className="form-control"
                    value={
                      form.title
                    }
                    onChange={
                      handleTitleChange
                    }
                  />

                </div>


                {/* SLUG */}

                <div className="col-md-7">

                  <label
                    htmlFor="post-slug"
                    className="form-label"
                  >
                    URL slug *
                  </label>

                  <input
                    id="post-slug"
                    name="slug"
                    type="text"
                    className="form-control"
                    value={
                      form.slug
                    }
                    onChange={
                      handleChange
                    }
                  />

                  <div className="admin-field-help">
                    /blog/
                    {form.slug ||
                      "article-slug"}
                  </div>

                </div>


                {/* STATUS */}

                <div className="col-md-5">

                  <label
                    htmlFor="post-status"
                    className="form-label"
                  >
                    Status
                  </label>

                  <select
                    id="post-status"
                    name="status"
                    className="form-select"
                    value={
                      form.status
                    }
                    onChange={
                      handleChange
                    }
                  >

                    <option value="draft">
                      Draft
                    </option>

                    <option value="published">
                      Published
                    </option>

                  </select>

                </div>


                {/* TAGS */}

                <div className="col-12">

                  <label
                    htmlFor="post-tags"
                    className="form-label"
                  >
                    Tags
                  </label>

                  <input
                    id="post-tags"
                    name="tags"
                    type="text"
                    className="form-control"
                    value={
                      form.tags
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Healthcare, Data, AI"
                  />

                  <div className="admin-field-help">
                    Separate tags
                    with commas.
                  </div>

                </div>


                {/* CONTENT */}

                <div className="col-12">

                  <div className="admin-content-label-row">

                    <label
                      htmlFor="post-content"
                      className="form-label"
                    >
                      Article content *
                    </label>

                    <span>
                      Markdown supported
                    </span>

                  </div>


                  <textarea
                    id="post-content"
                    name="content"
                    className="form-control admin-content-editor"
                    value={
                      form.content
                    }
                    onChange={
                      handleChange
                    }
                    placeholder={`## Introduction

Start writing here...`}
                  />

                </div>


                {/* PREVIEW */}

                {showPreview && (

                  <div className="col-12">

                    <div className="admin-preview">

                      <div className="admin-preview-header">
                        Article preview
                      </div>


                      <article className="admin-preview-content">

                        <h1>
                          {form.title ||
                            "Article title"}
                        </h1>


                        <ReactMarkdown
                          components={{
                            code({
                              inline,
                              className,
                              children,
                              ...props
                            }) {

                              const match =
                                /language-(\w+)/.exec(
                                  className ||
                                    ""
                                );


                              if (
                                !inline &&
                                match
                              ) {

                                return (
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
                          }}
                        >
                          {form.content ||
                            "_Start writing to preview your article._"}
                        </ReactMarkdown>

                      </article>

                    </div>

                  </div>

                )}


                {/* MESSAGES */}

                {error && (

                  <div className="col-12">

                    <div
                      className="admin-alert admin-alert-error"
                      role="alert"
                    >
                      {error}
                    </div>

                  </div>

                )}


                {successMessage && (

                  <div className="col-12">

                    <div
                      className="admin-alert admin-alert-success"
                      role="status"
                    >
                      {successMessage}
                    </div>

                  </div>

                )}


                {/* ACTIONS */}

                <div className="col-12">

                  <div className="admin-publish-actions">

                    <button
                      type="button"
                      className="admin-secondary-button"
                      disabled={saving}
                      onClick={() =>
                        saveArticle(
                          "draft"
                        )
                      }
                    >
                      {saving
                        ? "Saving..."
                        : "Save Draft"}
                    </button>


                    <button
                      type="button"
                      className="btn btn-brand px-4 py-3"
                      disabled={saving}
                      onClick={() =>
                        saveArticle(
                          "published"
                        )
                      }
                    >
                      {saving
                        ? "Saving..."
                        : "Publish"}
                    </button>

                  </div>

                </div>

              </div>

            </div>

          </section>


          {/* =========================
              ARTICLES
          ========================== */}

          <section className="admin-posts-section">

            <div className="admin-section-heading">

              <p className="section-eyebrow">
                Content Library
              </p>

              <h2>
                Articles
              </h2>

              <p>
                Edit, publish,
                unpublish or remove
                existing content.
              </p>

            </div>


            {loadingPosts ? (

              <div className="admin-empty-state">
                Loading articles...
              </div>

            ) : posts.length === 0 ? (

              <div className="admin-empty-state">

                <h3>
                  No articles yet
                </h3>

                <p>
                  Create your first
                  article using the
                  editor above.
                </p>

              </div>

            ) : (

              <div className="admin-post-list">

                {posts.map((post) => (

                  <article
                    key={post._id}
                    className="admin-post-row"
                  >

                    <div className="admin-post-main">

                      <div className="admin-post-meta">

                        <span
                          className={`admin-status-badge ${
                            post.status ===
                            "published"
                              ? "published"
                              : "draft"
                          }`}
                        >
                          {post.status ||
                            "draft"}
                        </span>


                        <time>
                          Updated{" "}
                          {formatDate(
                            post.updatedAt ||
                              post.createdAt
                          )}
                        </time>


                        {post.tags
                          ?.slice(
                            0,
                            2
                          )
                          .map(
                            (tag) => (
                              <span
                                key={
                                  tag
                                }
                              >
                                {tag}
                              </span>
                            )
                          )}

                      </div>


                      <h3>
                        {post.title}
                      </h3>


                      <p>
                        /blog/{post.slug}
                      </p>

                    </div>


                    <div className="admin-post-actions">

                      {post.status ===
                        "published" && (

                        <Link
                          to={`/blog/${post.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="admin-action-link"
                        >
                          View
                        </Link>

                      )}


                      <button
                        type="button"
                        className="admin-action-link"
                        onClick={() =>
                          startEditing(
                            post
                          )
                        }
                      >
                        Edit
                      </button>


                      <button
                        type="button"
                        className="admin-action-link"
                        onClick={() =>
                          togglePublication(
                            post
                          )
                        }
                      >
                        {post.status ===
                        "published"
                          ? "Unpublish"
                          : "Publish"}
                      </button>


                      <button
                        type="button"
                        className="admin-action-link admin-action-danger"
                        disabled={
                          deletingId ===
                          post._id
                        }
                        onClick={() =>
                          deleteArticle(
                            post
                          )
                        }
                      >
                        {deletingId ===
                        post._id
                          ? "Deleting..."
                          : "Delete"}
                      </button>

                    </div>

                  </article>

                ))}

              </div>

            )}

          </section>

        </div>

      </section>
    </>
  );
}