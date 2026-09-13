import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>
          Page Not Found | Ikemefula Oriaku
        </title>

        <meta
          name="robots"
          content="noindex, follow"
        />

        <meta
          name="description"
          content="The page you requested could not be found."
        />
      </Helmet>

      <section className="not-found-page">
        <div className="container">

          <div className="not-found-content">

            <p className="not-found-code">
              404
            </p>

            <p className="section-eyebrow">
              Page Not Found
            </p>

            <h1>
              This page seems to have
              moved, changed, or never existed.
            </h1>

            <p className="not-found-copy">
              The link may be outdated or the
              address may have been entered
              incorrectly. You can return home
              or continue exploring my work.
            </p>

            <div className="not-found-actions">

              <Link
                to="/"
                className="btn btn-brand px-4 py-3"
              >
                Back to Home
              </Link>

              <Link
                to="/projects"
                className="btn btn-outline-brand px-4 py-3"
              >
                Explore Projects
              </Link>

            </div>

            <div className="not-found-links">

              <Link to="/services">
                Services
              </Link>

              <Link to="/publications">
                Publications
              </Link>

              <Link to="/blog">
                Blog
              </Link>

              <Link to="/contact">
                Contact
              </Link>

            </div>

          </div>

        </div>
      </section>
    </>
  );
}