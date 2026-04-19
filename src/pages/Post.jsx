import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { Helmet } from "react-helmet-async";

export default function Post() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

    fetch(`/api/posts/${slug}`)
      .then((res) => {
        if (!res.ok) {
          if (res.status === 404) throw new Error("Post not found.");
          throw new Error("Failed to load the post.");
        }
        return res.json();
      })
      .then((data) => {
        if (!data) throw new Error("Post not found.");
        setPost(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <p>Loading post...</p>;
  if (error) return <p className="text-danger">{error}</p>;
  if (!post) return <p>No post data available.</p>;

  return (
    <>
      <Helmet>
        <title>{post.title}</title>
        <meta name="description" content={post.content.slice(0, 150)} />
      </Helmet>

      <section className="hero-simple">
        <div className="container">
          <h1>{post.title}</h1>
        </div>
      </section>

      <section className="section-space">
        <div className="container">
          <div className="glass-card p-4 p-md-5">
            <ReactMarkdown
              components={{
                code({ inline, className, children }) {
                  const match = /language-(\w+)/.exec(className || "");

              return !inline && match ? (
                <SyntaxHighlighter language={match[1]}>
                  {children}
                </SyntaxHighlighter>
              ) : (
                <code>{children}</code>
              );
            },
          }}
        >
          {post.content}
        </ReactMarkdown>
          </div>
        </div>
      </section>
    </>
  );
}