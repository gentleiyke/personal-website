import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { fetchRepos } from "../services/github";

import slider01 from "../assets/slider-01.jpg";
import slider02 from "../assets/slider-02.jpg";
import slider03 from "../assets/slider-03.jpg";

import dataAnalyticsImage from "../assets/home/data-analytics.jpg";
import developmentImage from "../assets/home/development.jpg";
import educationTrainingImage from "../assets/home/education-training.jpg";

import homeModesBackground from "../assets/home/home-modes-bg.jpg";
import homeCtaBackground from "../assets/home/home-cta-bg.jpg";

import featuredProject01
  from "../assets/home/featured-project-01.jpg";

import featuredProject02
  from "../assets/home/featured-project-02.jpg";

import featuredProject03
  from "../assets/home/featured-project-03.jpg";

/* ======================================================
   HERO SLIDES
====================================================== */

const slides = [
  {
    title: "Data and analytics",
    image: slider01,
  },
  {
    title: "Digital solutions",
    image: slider02,
  },
  {
    title: "Education and training",
    image: slider03,
  },
];


/* ======================================================
   SERVICE MODES
====================================================== */

const modes = [
  {
    number: "01",
    title: "Data & Analytics",
    description:
      "Turning complex data into clear, actionable insight through analytics, automation, visualisation, machine learning, and evidence-led decision support.",
    highlights: [
      "Healthcare analytics",
      "Data quality",
      "Machine learning",
      "BI & reporting",
    ],
    link: "/services",
    image: dataAnalyticsImage,
  },
  {
    number: "02",
    title: "Development",
    description:
      "Building practical digital solutions that make data, workflows, and information easier to use, understand, and act on.",
    highlights: [
      "Data applications",
      "Web applications",
      "APIs",
      "Digital tools",
    ],
    link: "/services",
    image: developmentImage,
  },
  {
    number: "03",
    title: "Education & Training",
    description:
      "Making technical and analytical concepts practical through structured training, mentoring, facilitation, and applied learning.",
    highlights: [
      "Data education",
      "Technical mentoring",
      "Healthcare analytics",
      "Professional training",
    ],
    link: "/services",
    image: educationTrainingImage,
  },
];


/* ======================================================
   CREDIBILITY
====================================================== */

const credibility = [
  {
    value: "HCPC",
    label: "Registered Biomedical Scientist",
  },
  {
    value: "Research",
    label: "Peer-reviewed publications",
  },
  {
    value: "10+",
    label: "Years across science, data & technology",
  },
  {
    value: "Applied",
    label: "Analytics, development & education",
  },
];


/* ======================================================
   FEATURED PUBLICATIONS
====================================================== */

const featuredPublications = [
  {
    title:
      "Genomic Surveillance of Antimicrobial Resistance and Public Health Decision-Making",
    type: "Review",
    year: "2026",
  },
  {
    title:
      "Gene Editing Therapies for Sickle Cell Disease and β-Thalassemia",
    type: "Systematic Review",
    year: "2026",
  },
  {
    title:
      "Artificial Intelligence in Auditing and Financial Reporting",
    type: "Scoping Review",
    year: "2026",
  },
];

const featuredProjectFallbacks = [
  featuredProject01,
  featuredProject02,
  featuredProject03,
];

/* ======================================================
   HOME PAGE
====================================================== */

export default function Home() {
  const [repos, setRepos] = useState([]);
  const [repoError, setRepoError] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);


  /* ------------------------------------------------------
     LOAD GITHUB PROJECTS
  ------------------------------------------------------ */

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


  /* ------------------------------------------------------
     HERO SLIDER
  ------------------------------------------------------ */

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(
        (current) =>
          (current + 1) % slides.length
      );
    }, 6000);

    return () => {
      clearInterval(interval);
    };
  }, []);


  /* ------------------------------------------------------
     FEATURED PROJECTS
  ------------------------------------------------------ */

  const featuredRepos = useMemo(() => {
    return repos.slice(0, 3);
  }, [repos]);


  return (
    <>
      {/* ==================================================
          SEO
      =================================================== */}

      <Helmet>
        <title>
          Ikemefula Oriaku | Data, AI, Development & Education
        </title>

        <meta
          name="description"
          content="Ikemefula Oriaku is a data and AI professional, developer, biomedical scientist, and educator working across analytics, digital solutions, healthcare, and technical training."
        />
      </Helmet>


      {/* ==================================================
          HERO
      =================================================== */}

      <section className="hero hero-full home-hero">

        <div
          className="hero-slider"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
        >
          {slides.map((slide) => (
            <div
              key={slide.title}
              className="hero-slide"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            >
              <div className="hero-slide-overlay" />
            </div>
          ))}
        </div>


        <div className="hero-overlay">

          <div className="container">

            <div className="row align-items-center gy-5">

              <div className="col-lg-8">

                <div className="hero-panel">

                  <p className="section-eyebrow mb-3">
                    Data & AI Professional · Builder · Educator
                  </p>

                  <h1 className="home-hero-title">
                    I turn data into insight,
                    insight into digital solutions,
                    and complex ideas into practical
                    learning.
                  </h1>

                  <p className="home-hero-copy">
                    I work across data analytics,
                    artificial intelligence, digital
                    development, and professional
                    education, with a particular
                    interest in healthcare, life
                    sciences, and evidence-led problem
                    solving.
                  </p>


                  <div className="d-flex flex-wrap gap-3 mt-4">

                    <Link
                      to="/contact"
                      className="btn btn-brand px-4 py-3"
                    >
                      Work With Me
                    </Link>

                    <Link
                      to="/projects"
                      className="btn btn-outline-brand px-4 py-3"
                    >
                      Explore My Work
                    </Link>

                  </div>


                  <a
                    href="https://ikemefulaoriaku.space/thumbs/IkemefulaORIAKU_GC.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="hero-cv-link d-inline-block mt-4"
                  >
                    View CV →
                  </a>

                </div>

              </div>

            </div>


            <div className="carousel-controls">

              {slides.map((slide, index) => (
                <button
                  key={slide.title}
                  type="button"
                  className={
                    currentSlide === index
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setCurrentSlide(index)
                  }
                  aria-label={`Show ${slide.title}`}
                  aria-pressed={
                    currentSlide === index
                  }
                />
              ))}

            </div>

          </div>

        </div>

      </section>


      {/* ==================================================
          SERVICES / MODES
      =================================================== */}

      <section
        className="section-space home-modes"
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(15, 23, 42, 0.80),
              rgba(15, 23, 42, 0.84)
            ),
            url(${homeModesBackground})
          `,
        }}
      >

        <div className="container">

          <div className="section-heading mb-5">

            <p className="section-eyebrow">
              What I Do
            </p>

            <h2>
              Analyse. Build. Teach.
            </h2>

            <p>
              Three connected ways I apply the same
              problem-solving mindset.
            </p>

          </div>


          <div className="row g-4">

            {modes.map((mode) => (

              <div
                key={mode.title}
                className="col-lg-4"
              >

                <article className="brand-card mode-card">

                  {/* CARD 2 IMAGE AREA */}

                  <div className="mode-card-media">

                    <img
                      src={mode.image}
                      alt=""
                      loading="lazy"
                    />

                    <span className="mode-number">
                      {mode.number}
                    </span>

                  </div>


                  {/* CARD CONTENT */}

                  <div className="mode-card-body">

                    <h3>
                      {mode.number} - {mode.title}
                    </h3>

                    <p>
                      {mode.description}
                    </p>


                    <ul className="mode-highlights">

                      {mode.highlights.map(
                        (highlight) => (
                          <li key={highlight}>
                            {highlight}
                          </li>
                        )
                      )}

                    </ul>


                    <Link
                      to={mode.link}
                      className="mode-link"
                    >
                      Explore services →
                    </Link>

                  </div>

                </article>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* ==================================================
          CREDIBILITY
      =================================================== */}

      <section className="credibility-section">

        <div className="container">

          <div className="row g-0">

            {credibility.map((item) => (

              <div
                key={item.label}
                className="col-6 col-lg-3"
              >

                <div className="credibility-item">

                  <strong>
                    {item.value}
                  </strong>

                  <span>
                    {item.label}
                  </span>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* ==================================================
          FEATURED PROJECTS
      =================================================== */}

      <section className="section-space">

        <div className="container">

          <div className="section-heading section-heading-row">

            <div>

              <p className="section-eyebrow">
                Selected Work
              </p>

              <h2>
                Problems solved through data and technology.
              </h2>

              <p>
                A selection of practical projects,
                analyses, and digital solutions.
              </p>

            </div>


            <Link
              to="/projects"
              className="section-link"
            >
              View all projects →
            </Link>

          </div>


          {repoError && (
            <p
              className="text-muted-custom"
              role="status"
            >
              Project data is temporarily unavailable.
            </p>
          )}


          <div className="row g-4 mt-2">

            {featuredRepos.map((repo, index) => (

              <div
                key={repo.id}
                className="col-lg-4"
              >

                <article className="featured-project-card">

                  {/* CARD 2 IMAGE AREA */}

                  <div className="featured-project-media">

                    <img
                      src={
                        repo.thumbnail ||
                        featuredProjectFallbacks[index]
                      }
                      alt=""
                      loading="lazy"
                    />

                    <span className="featured-project-category">
                      {repo.language || "Project"}
                    </span>

                  </div>


                  {/* CARD CONTENT */}

                  <div className="featured-project-body">

                    <p className="featured-project-type">
                      Featured Project
                    </p>

                    <h3>
                      {repo.name}
                    </h3>

                    <p className="featured-project-description">
                      {repo.description ||
                        "A practical project exploring data, technology, and digital problem solving."}
                    </p>


                    <div className="featured-project-meta">

                      {repo.language && (
                        <span>
                          {repo.language}
                        </span>
                      )}

                      <span>
                        ★ {repo.stars || 0}
                      </span>

                    </div>


                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noreferrer"
                      className="featured-project-link"
                    >
                      View project →
                    </a>

                  </div>

                </article>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* ==================================================
          PUBLICATIONS
      =================================================== */}

      <section className="section-space publications-preview">

        <div className="container">

          <div className="section-heading section-heading-row">

            <div>

              <p className="section-eyebrow">
                Research
              </p>

              <h2>
                Evidence-led thinking.
              </h2>

              <p>
                Selected research and scholarly work
                across healthcare, biomedical science,
                data, and AI.
              </p>

            </div>


            <Link
              to="/publications"
              className="section-link"
            >
              View publications →
            </Link>

          </div>


          <div className="publication-preview-list mt-4">

            {featuredPublications.map(
              (publication) => (

                <article
                  key={publication.title}
                  className="publication-preview-item"
                >

                  <div>

                    <span className="publication-meta">
                      {publication.type} ·{" "}
                      {publication.year}
                    </span>

                    <h3>
                      {publication.title}
                    </h3>

                  </div>


                  <span
                    className="publication-arrow"
                    aria-hidden="true"
                  >
                    →
                  </span>

                </article>

              )
            )}

          </div>

        </div>

      </section>


      {/* ==================================================
          FINAL CTA
      =================================================== */}

      <section
        className="home-cta"
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(15, 23, 42, 0.72),
              rgba(15, 23, 42, 0.82)
            ),
            url(${homeCtaBackground})
          `,
        }}
      >

        <div className="container">

          <div className="home-cta-inner">

            <p className="section-eyebrow">
              Work Together
            </p>

            <h2>
              Have a data problem, digital idea,
              or training need?
            </h2>

            <p>
              Let’s discuss what you are trying to
              achieve and where data, technology,
              or education can help.
            </p>

            <Link
              to="/contact"
              className="btn btn-brand px-4 py-3"
            >
              Start a Conversation
            </Link>

          </div>

        </div>

      </section>
    </>
  );
}