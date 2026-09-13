import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const serviceGroups = [
  {
    id: "data-analytics",
    number: "01",
    eyebrow: "Primary Service",
    title: "Data & Analytics",
    summary:
      "I help organisations and individuals turn complex, messy, or underused data into reliable insight, better decisions, and practical analytical solutions.",
    problems: [
      "Data is fragmented, inconsistent, or difficult to trust.",
      "Reporting takes too long or relies heavily on manual processes.",
      "Decision-makers need clearer dashboards, KPIs, or analytical insight.",
      "Healthcare, scientific, or operational data needs specialist interpretation.",
      "Teams want to explore machine learning or predictive approaches responsibly.",
    ],
    deliverables: [
      "Data cleaning and quality assessment",
      "SQL analysis and reporting workflows",
      "Power BI and Tableau dashboards",
      "Python and R analysis",
      "KPI and performance reporting",
      "Exploratory and statistical analysis",
      "Machine learning prototypes",
      "Healthcare and life-sciences analytics",
      "Data storytelling and stakeholder-ready outputs",
    ],
    audience: [
      "Healthcare and life-sciences teams",
      "Small and growing businesses",
      "Researchers and academic teams",
      "Operational and performance teams",
      "Organisations building stronger data capabilities",
    ],
    tools:
      "SQL · Python · R · Power BI · Tableau · Excel · Microsoft Fabric",
  },
  {
    id: "development",
    number: "02",
    eyebrow: "Solution Building",
    title: "Development",
    summary:
      "I build practical digital solutions around data, information, workflows, and user needs rather than treating development as an isolated technical exercise.",
    problems: [
      "A manual process needs to become a usable digital workflow.",
      "Data or information needs a clearer interface.",
      "A business, project, or professional brand needs a modern web presence.",
      "A prototype or internal tool is needed to test an idea quickly.",
      "Existing systems need APIs, integrations, or better user interaction.",
    ],
    deliverables: [
      "Responsive websites",
      "Web applications",
      "Data-driven interfaces",
      "Dashboards and internal tools",
      "API integration",
      "Database-backed applications",
      "Prototype development",
      "Performance and usability improvements",
    ],
    audience: [
      "Professionals and personal brands",
      "Small businesses",
      "Data-led teams",
      "Researchers",
      "Early-stage digital projects",
    ],
    tools:
      "React · Vite · JavaScript · Bootstrap · Node.js · Express · MongoDB · APIs",
  },
  {
    id: "education-training",
    number: "03",
    eyebrow: "Knowledge Transfer",
    title: "Education & Training",
    summary:
      "I make technical, analytical, and scientific concepts easier to understand through practical training, mentoring, and applied learning.",
    problems: [
      "Teams need stronger data literacy.",
      "Learners understand theory but struggle to apply it in practice.",
      "Professionals want to build confidence with analytical tools.",
      "Complex technical topics need to be communicated to mixed audiences.",
      "Organisations need structured training around data, healthcare analytics, or digital tools.",
    ],
    deliverables: [
      "Data analytics training",
      "SQL, Python, Excel, Power BI, and R training",
      "Healthcare analytics education",
      "Technical mentoring",
      "Portfolio and project guidance",
      "Workshops and facilitated learning",
      "Learning materials and practical exercises",
      "Data storytelling and presentation skills",
    ],
    audience: [
      "Individuals entering data careers",
      "Working professionals",
      "Healthcare teams",
      "Students and researchers",
      "Organisations developing internal capability",
    ],
    tools:
      "Workshops · Mentoring · Practical Exercises · Project-Based Learning · Technical Content",
  },
];

const engagementSteps = [
  {
    number: "01",
    title: "Understand the problem",
    description:
      "We begin with the outcome you need, the current challenge, your audience, and any technical or operational constraints.",
  },
  {
    number: "02",
    title: "Define the right approach",
    description:
      "I identify the most appropriate analytical, development, or learning approach rather than forcing every problem into the same solution.",
  },
  {
    number: "03",
    title: "Build and communicate",
    description:
      "The work is delivered with clear reasoning, usable outputs, and communication that helps stakeholders understand what has been done and why.",
  },
];

export default function Services() {
  return (
    <>
      <Helmet>
        <title>
          Services | Data, Development & Training | Ikemefula Oriaku
        </title>

        <meta
          name="description"
          content="Data and analytics, digital development, and education and training services from Ikemefula Oriaku, with particular strengths in healthcare, life sciences, analytics, and practical technical solutions."
        />
      </Helmet>

      {/* =========================
          PAGE INTRO
      ========================== */}

      <section className="page-intro services-intro">
        <div className="container">
          <p className="section-eyebrow">
            Services
          </p>

          <h1>
            Data expertise, digital solutions,
            and practical knowledge transfer.
          </h1>

          <p className="page-intro-copy">
            I work across three connected areas:
            understanding data, building useful
            solutions, and helping others apply
            technical knowledge with confidence.
          </p>
        </div>
      </section>

      {/* =========================
          SERVICE NAVIGATION
      ========================== */}

      <section className="services-jump">
        <div className="container">
          <div className="services-jump-inner">
            <span>
              Explore services
            </span>

            <nav
              className="services-jump-links"
              aria-label="Service sections"
            >
              <a href="#data-analytics">
                Data & Analytics
              </a>

              <a href="#development">
                Development
              </a>

              <a href="#education-training">
                Education & Training
              </a>
            </nav>
          </div>
        </div>
      </section>

      {/* =========================
          SERVICE GROUPS
      ========================== */}

      {serviceGroups.map((service, index) => (
        <section
          key={service.id}
          id={service.id}
          className={`section-space service-section ${
            index % 2 === 1
              ? "service-section-alt"
              : ""
          }`}
        >
          <div className="container">
            <div className="row gy-5">
              <div className="col-lg-4">
                <div className="service-heading-block">
                  <div className="service-number">
                    {service.number}
                  </div>

                  <p className="section-eyebrow">
                    {service.eyebrow}
                  </p>

                  <h2>
                    {service.title}
                  </h2>

                  <p className="service-summary">
                    {service.summary}
                  </p>

                  <div className="service-tools">
                    {service.tools}
                  </div>
                </div>
              </div>

              <div className="col-lg-8">
                <div className="row g-4">
                  <div className="col-md-6">
                    <article className="service-detail-card">
                      <p className="service-card-label">
                        Problems I help solve
                      </p>

                      <ul>
                        {service.problems.map(
                          (problem) => (
                            <li key={problem}>
                              {problem}
                            </li>
                          )
                        )}
                      </ul>
                    </article>
                  </div>

                  <div className="col-md-6">
                    <article className="service-detail-card">
                      <p className="service-card-label">
                        Typical deliverables
                      </p>

                      <ul>
                        {service.deliverables.map(
                          (deliverable) => (
                            <li key={deliverable}>
                              {deliverable}
                            </li>
                          )
                        )}
                      </ul>
                    </article>
                  </div>

                  <div className="col-12">
                    <article className="service-audience-card">
                      <div>
                        <p className="service-card-label">
                          Who this is for
                        </p>

                        <div className="service-audience-list">
                          {service.audience.map(
                            (audience) => (
                              <span key={audience}>
                                {audience}
                              </span>
                            )
                          )}
                        </div>
                      </div>

                      <Link
                        to="/contact"
                        className="service-enquiry-link"
                      >
                        Discuss a project →
                      </Link>
                    </article>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* =========================
          ENGAGEMENT APPROACH
      ========================== */}

      <section className="section-space service-process">
        <div className="container">
          <div className="section-heading mb-5">
            <p className="section-eyebrow">
              How I Work
            </p>

            <h2>
              Start with the problem,
              not the tool.
            </h2>

            <p>
              The technology or analytical method
              comes after understanding what needs
              to change and who needs to use the
              result.
            </p>
          </div>

          <div className="row g-4">
            {engagementSteps.map((step) => (
              <div
                key={step.number}
                className="col-lg-4"
              >
                <article className="service-process-card">
                  <span>
                    {step.number}
                  </span>

                  <h3>
                    {step.title}
                  </h3>

                  <p>
                    {step.description}
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
              Start a Project
            </p>

            <h2>
              Not sure which service
              your problem fits into?
            </h2>

            <p>
              That is fine. Describe the challenge,
              outcome, or idea you are working on,
              and we can identify the right approach
              from there.
            </p>

            <div className="d-flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="btn btn-brand px-4 py-3"
              >
                Discuss Your Project
              </Link>

              <Link
                to="/projects"
                className="btn btn-outline-brand px-4 py-3"
              >
                See Examples of My Work
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}