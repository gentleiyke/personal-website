import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load posts: ${res.status} ${res.statusText}`);
        return res.json();
      })
      .then(setPosts)
      .catch((err) => {
        console.error("Fetch error:", err);
        setError(err.message.includes("JSON") ? "Server returned invalid response. Is the backend running?" : err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Helmet>
        <title>Blog | Ikemefula Oriaku</title>
        <meta name="description" content="Web development and data science tutorials" />
      </Helmet>

      <section className="hero-simple">
        <div className="container">
          <h1>Blog</h1>
          <p>Web development and data science tutorials and insights.</p>
        </div>
      </section>

      <section className="section-space">
        <div className="container">
          <div className="row">
            {posts.map((post) => (
              <div className="col-md-6 mb-4" key={post._id}>
                <div className="glass-card p-4">
                  <h5 className="fw-bold mb-3">{post.title}</h5>
                  <Link to={`/blog/${post.slug}`} className="btn btn-brand">
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}