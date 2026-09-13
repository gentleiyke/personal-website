import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const professionalAreas = [
  {
    number: "01",
    title: "Scientist",
    description:
      "My foundation is in biomedical and laboratory science, where evidence, quality, accuracy, and structured investigation are essential.",
  },
  {
    number: "02",
    title: "Data Professional",
    description:
      "I use analytics, statistics, data visualisation, machine learning, and data quality methods to turn complex information into useful insight.",
  },
  {
    number: "03",
    title: "Builder",
    description:
      "I develop digital tools, web applications, workflows, and data-driven solutions that make information easier to use and act on.",
  },
  {
    number: "04",
    title: "Educator",
    description:
      "I teach and mentor others in data, analytics, technology, and applied problem solving, translating technical concepts into practical learning.",
  },
];

const credentials = [
  "HCPC Registered Biomedical Scientist",
  "Biomedical and laboratory science background",
  "Advanced training in data analytics and data science",
  "Experience across healthcare, analytics, technology, and education",
  "Peer-reviewed research and scholarly publications",
  "Practical experience with Python, R, SQL, Power BI, Tableau, and web technologies",
];

const principles = [
  {
    title: "Evidence before assumption",
    description:
      "I prefer decisions supported by reliable data, clear reasoning, and transparent methodology.",
  },
  {
    title: "Build for usefulness",
    description:
      "A solution should not only be technically correct; it should help someone make a better decision or complete a task more effectively.",
  },
  {
    title: "Make complexity understandable",
    description:
      "Whether I am presenting an analysis, building an application, or teaching a concept, clarity matters.",
  },
];

export default function About() {
  return (
    <>
      <Helmet>
        <title>
          About | Ikemefula Oriaku
        </title>

        <meta
          name="description"
          content="Learn about Ikemefula Oriaku, a biomedical scientist, data and AI professional, developer, researcher, and educator working across analytics, healthcare, technology, and training."
        />
      </Helmet>

      {/* =========================
          PAGE INTRO
      ========================== */}

      <section className="page-intro about-intro">
        <div className="container">
          <p className="section-eyebrow">
            About
          </p>

          <h1>
            Science taught me to investigate.
            Data taught me to explain.
            Technology gave me a way to build.
          </h1>

          <p className="page-intro-copy">
            I am Ikemefula Oriaku, a multidisciplinary
            professional working across data and
            analytics, digital development, biomedical
            science, research, and education.
          </p>
        </div>
      </section>

      {/* =========================
          STORY
      ========================== */}

      <section className="section-space about-story">
        <div className="container">
          <div className="row gy-5 align-items-start">
            <div className="col-lg-5">
              <p className="section-eyebrow">
                My Story
              </p>

              <h2 className="about-section-title">
                One career, several connected disciplines.
              </h2>
            </div>

            <div className="col-lg-7">
              <div className="about-story-copy">
                <p>
                  My professional journey began in
                  biomedical science, where I learned
                  the importance of accuracy, quality
                  control, evidence, and disciplined
                  problem solving.
                </p>

                <p>
                  That scientific foundation naturally
                  led me toward data. I became
                  increasingly interested in how data
                  could be used not only to describe
                  what had happened, but also to
                  identify patterns, improve decisions,
                  automate processes, and solve
                  operational problems.
                </p>

                <p>
                  From there, development became another
                  practical extension of the same
                  mindset. Instead of stopping at
                  analysis, I began building tools,
                  applications, workflows, and digital
                  experiences that help people interact
                  with information more effectively.
                </p>

                <p>
                  Education connects everything together.
                  I enjoy translating technical ideas
                  into practical knowledge, whether
                  through training, mentoring, content,
                  or collaborative work.
                </p>

                <p className="about-story-emphasis">
                  Today, these are not separate careers.
                  They are different ways of solving the
                  same kind of problem: understanding
                  complexity and turning it into
                  something useful.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          PROFESSIONAL IDENTITY
      ========================== */}

      <section className="section-space about-identity">
        <div className="container">
          <div className="section-heading mb-5">
            <p className="section-eyebrow">
              How I Work
            </p>

            <h2>
              Four perspectives. One problem-solving mindset.
            </h2>
          </div>

          <div className="row g-4">
            {professionalAreas.map((area) => (
              <div
                key={area.title}
                className="col-md-6"
              >
                <article className="brand-card about-identity-card">
                  <span className="about-identity-number">
                    {area.number}
                  </span>

                  <h3>
                    {area.title}
                  </h3>

                  <p>
                    {area.description}
                  </p>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================
          CREDENTIALS
      ========================== */}

      <section className="section-space about-credentials">
        <div className="container">
          <div className="row gy-5">
            <div className="col-lg-5">
              <p className="section-eyebrow">
                Background
              </p>

              <h2 className="about-section-title">
                A foundation built on science,
                technology, and continuous learning.
              </h2>
            </div>

            <div className="col-lg-7">
              <ul className="credential-list">
                {credentials.map((credential) => (
                  <li key={credential}>
                    {credential}
                  </li>
                ))}
              </ul>

              <div className="mt-4">
                <Link
                  to="/publications"
                  className="section-link"
                >
                  Explore my research and publications →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          PRINCIPLES
      ========================== */}

      <section className="section-space about-principles">
        <div className="container">
          <div className="section-heading mb-5">
            <p className="section-eyebrow">
              Principles
            </p>

            <h2>
              How I approach the work.
            </h2>
          </div>

          <div className="row g-4">
            {principles.map((principle) => (
              <div
                key={principle.title}
                className="col-lg-4"
              >
                <article className="about-principle-card">
                  <h3>
                    {principle.title}
                  </h3>

                  <p>
                    {principle.description}
                  </p>
                </article>
              </div>
            ))}
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
              Work With Me
            </p>

            <h2>
              Looking for someone who can analyse,
              build, and communicate?
            </h2>

            <p>
              Whether the challenge involves data,
              digital solutions, healthcare, research,
              or education, I am always interested in
              meaningful problems worth solving.
            </p>

            <div className="d-flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="btn btn-brand px-4 py-3"
              >
                Start a Conversation
              </Link>

              <Link
                to="/projects"
                className="btn btn-outline-brand px-4 py-3"
              >
                View My Work
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}