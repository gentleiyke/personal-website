import { Helmet } from "react-helmet-async";

const featuredPublication = {
  title:
    "Genomic Surveillance of Antimicrobial Resistance and Public Health Decision-Making",
  authors: "Ikemefula Oriaku et al.",
  journal: "Placeholder Journal",
  year: "2026",
  type: "Review",
  area: "Genomics · Public Health · AMR",
  doi: "#",
  summary:
    "A review examining how genomic surveillance can support antimicrobial resistance monitoring and improve public-health decision-making.",
  whyItMatters:
    "The work connects genomic data, surveillance systems, and real-world public-health action, showing how laboratory and analytical evidence can be translated into population-level decisions.",
};

const publications = [
  {
    id: 1,
    title:
      "Genomic Surveillance of Antimicrobial Resistance and Public Health Decision-Making",
    authors: "Ikemefula Oriaku et al.",
    journal: "Placeholder Journal",
    year: "2026",
    type: "Review",
    area: "Genomics · Public Health · AMR",
    doi: "#",
    summary:
      "Explores how genomic surveillance can strengthen antimicrobial resistance monitoring and inform public-health intervention.",
  },
  {
    id: 2,
    title:
      "Gene Editing Therapies for Sickle Cell Disease and β-Thalassemia",
    authors: "Ikemefula Oriaku et al.",
    journal: "Placeholder Journal",
    year: "2026",
    type: "Systematic Review",
    area: "Gene Editing · Haematology · Therapeutics",
    doi: "#",
    summary:
      "Reviews advances in gene-editing therapies for inherited haemoglobin disorders, with focus on therapeutic potential, evidence, and implementation challenges.",
  },
  {
    id: 3,
    title:
      "Artificial Intelligence in Auditing and Financial Reporting",
    authors: "Ikemefula Oriaku et al.",
    journal: "Placeholder Journal",
    year: "2026",
    type: "Scoping Review",
    area: "Artificial Intelligence · Finance · Auditing",
    doi: "#",
    summary:
      "Maps how artificial intelligence is being applied across auditing and financial reporting and identifies opportunities, limitations, and governance considerations.",
  },
  {
    id: 4,
    title:
      "Machine Learning for Predictive Modelling of Climate-Related Outcomes",
    authors: "Ikemefula Oriaku et al.",
    journal: "Placeholder Journal",
    year: "2025",
    type: "Review",
    area: "Machine Learning · Predictive Modelling · Climate",
    doi: "#",
    summary:
      "Examines machine-learning approaches used for predictive modelling in climate-related research and applied decision support.",
  },
];

const researchThemes = [
  {
    title: "Healthcare & Biomedical Science",
    description:
      "Research grounded in laboratory medicine, clinical science, genomics, and translational healthcare questions.",
  },
  {
    title: "Data, AI & Machine Learning",
    description:
      "Work exploring how analytical and computational methods can support decision-making, prediction, and automation.",
  },
  {
    title: "Evidence & Governance",
    description:
      "Research concerned with how technology is adopted responsibly, evaluated critically, and translated into practical use.",
  },
];

export default function Publications() {
  return (
    <>
      <Helmet>
        <title>
          Publications | Research & Scholarly Work | Ikemefula Oriaku
        </title>

        <meta
          name="description"
          content="Explore peer-reviewed publications and scholarly work by Ikemefula Oriaku across genomics, healthcare, artificial intelligence, machine learning, biomedical science, and data."
        />
      </Helmet>

      {/* =========================
          PAGE INTRO
      ========================== */}

      <section className="page-intro publications-intro">
        <div className="container">
          <p className="section-eyebrow">
            Publications
          </p>

          <h1>
            Research that connects evidence,
            data, and real-world decision-making.
          </h1>

          <p className="page-intro-copy">
            Selected peer-reviewed and scholarly work
            across healthcare, biomedical science,
            genomics, artificial intelligence, and
            applied analytics.
          </p>
        </div>
      </section>

      {/* =========================
          FEATURED PUBLICATION
      ========================== */}

      <section className="section-space publications-featured">
        <div className="container">
          <div className="section-heading mb-5">
            <p className="section-eyebrow">
              Featured Research
            </p>

            <h2>
              A closer look at selected work.
            </h2>
          </div>

          <article className="featured-publication-card">
            <div className="row gy-4">
              <div className="col-lg-8">
                <div className="featured-publication-main">
                  <div className="publication-tags">
                    <span>
                      {featuredPublication.type}
                    </span>

                    <span>
                      {featuredPublication.year}
                    </span>
                  </div>

                  <h3>
                    {featuredPublication.title}
                  </h3>

                  <p className="publication-authors">
                    {featuredPublication.authors}
                  </p>

                  <p className="publication-journal">
                    {featuredPublication.journal}
                  </p>

                  <p className="publication-summary">
                    {featuredPublication.summary}
                  </p>
                </div>
              </div>

              <div className="col-lg-4">
                <aside className="publication-insight">
                  <p className="service-card-label">
                    Why it matters
                  </p>

                  <p>
                    {featuredPublication.whyItMatters}
                  </p>

                  <div className="publication-area">
                    {featuredPublication.area}
                  </div>

                  <a
                    href={featuredPublication.doi}
                    target="_blank"
                    rel="noreferrer"
                    className="section-link"
                  >
                    View publication →
                  </a>
                </aside>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* =========================
          PUBLICATION LIST
      ========================== */}

      <section className="section-space publications-list-section">
        <div className="container">
          <div className="section-heading mb-5">
            <p className="section-eyebrow">
              Selected Publications
            </p>

            <h2>
              Research across science,
              healthcare, data, and AI.
            </h2>
          </div>

          <div className="publication-list">
            {publications.map((publication) => (
              <article
                key={publication.id}
                className="publication-list-item"
              >
                <div className="publication-list-number">
                  {String(publication.id).padStart(2, "0")}
                </div>

                <div className="publication-list-content">
                  <div className="publication-list-meta">
                    <span>
                      {publication.type}
                    </span>

                    <span>
                      {publication.year}
                    </span>

                    <span>
                      {publication.area}
                    </span>
                  </div>

                  <h3>
                    {publication.title}
                  </h3>

                  <p className="publication-authors">
                    {publication.authors}
                  </p>

                  <p className="publication-journal">
                    {publication.journal}
                  </p>

                  <p className="publication-summary">
                    {publication.summary}
                  </p>

                  <a
                    href={publication.doi}
                    target="_blank"
                    rel="noreferrer"
                    className="section-link"
                  >
                    View publication →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =========================
          RESEARCH THEMES
      ========================== */}

      <section className="section-space research-themes">
        <div className="container">
          <div className="section-heading mb-5">
            <p className="section-eyebrow">
              Research Themes
            </p>

            <h2>
              Areas that connect my research
              and professional work.
            </h2>
          </div>

          <div className="row g-4">
            {researchThemes.map((theme) => (
              <div
                key={theme.title}
                className="col-lg-4"
              >
                <article className="research-theme-card">
                  <h3>
                    {theme.title}
                  </h3>

                  <p>
                    {theme.description}
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
              Research & Collaboration
            </p>

            <h2>
              Interested in research,
              analysis, or collaboration?
            </h2>

            <p>
              I am interested in work at the
              intersection of healthcare, data,
              AI, genomics, and evidence-led
              decision-making.
            </p>

            <a
              href="/contact"
              className="btn btn-brand px-4 py-3"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </>
  );
}