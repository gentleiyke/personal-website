import { useState } from "react";
import { Helmet } from "react-helmet-async";

import {
  Link,
} from "react-router-dom";

const FORMSPREE_ENDPOINT =
  import.meta.env.VITE_FORMSPREE_ENDPOINT;

const contactLinks = [
  {
    label: "LinkedIn",
    description:
      "Professional profile, experience, and updates.",
    url: "https://www.linkedin.com/in/gentleiyke",
    icon: "fab fa-linkedin-in",
  },
  {
    label: "GitHub",
    description:
      "Projects, repositories, and technical work.",
    url: "https://github.com/gentleiyke",
    icon: "fab fa-github",
  },

  /*
   * Replace these placeholders with your
   * actual ResearchGate and ORCID URLs.
   */

  {
    label: "ResearchGate",
    description:
      "Research publications and academic work.",
    url: "#",
    icon: "fas fa-graduation-cap",
  },
  {
    label: "ORCID",
    description:
      "Researcher identity and publication record.",
    url: "#",
    icon: "fab fa-orcid",
  },
];

const enquiryTypes = [
  "Data & Analytics",
  "Development",
  "Education & Training",
  "Research Collaboration",
  "Speaking / Workshop",
  "General Enquiry",
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    organisation: "",
    enquiryType: "",
    message: "",
  });

  const [status, setStatus] =
    useState("idle");

  const [error, setError] =
    useState("");

  function handleChange(event) {
    const {
      name,
      value,
    } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.message.trim()
    ) {
      setError(
        "Please complete your name, email address, and message."
      );

      return;
    }

    if (!FORMSPREE_ENDPOINT) {
      setError(
        "The contact form is not configured yet."
      );

      return;
    }

    setStatus("sending");

    try {
      const response = await fetch(
        FORMSPREE_ENDPOINT,
        {
          method: "POST",

          headers: {
            Accept: "application/json",
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            name: form.name,
            email: form.email,
            organisation:
              form.organisation,
            enquiryType:
              form.enquiryType,
            message: form.message,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Unable to send your message."
        );
      }

      setStatus("sent");

      setForm({
        name: "",
        email: "",
        organisation: "",
        enquiryType: "",
        message: "",
      });
    } catch (err) {
      console.error(
        "Contact form error:",
        err
      );

      setStatus("error");

      setError(
        "Your message could not be sent. Please try again."
      );
    }
  }

  return (
    <>
      <Helmet>
        <title>
          Contact | Work With Ikemefula Oriaku
        </title>

        <meta
          name="description"
          content="Contact Ikemefula Oriaku about data analytics, AI, development, education and training, research collaboration, or professional projects."
        />
      </Helmet>

      {/* =========================
          PAGE INTRO
      ========================== */}

      <section className="page-intro contact-intro">
        <div className="container">
          <p className="section-eyebrow">
            Contact
          </p>

          <h1>
            Have a problem worth solving?
            Let’s talk.
          </h1>

          <p className="page-intro-copy">
            Whether you need analytical
            insight, a digital solution,
            practical training, or a
            research collaborator, tell me
            what you are trying to achieve.
          </p>
        </div>
      </section>

      {/* =========================
          CONTACT MAIN
      ========================== */}

      <section className="section-space contact-main">
        <div className="container">

          <div className="row g-5">

            {/* =====================
                CONTACT INFORMATION
            ====================== */}

            <div className="col-lg-4">

              <div className="contact-introduction">

                <p className="section-eyebrow">
                  Start a Conversation
                </p>

                <h2>
                  Tell me about the challenge,
                  not just the tool.
                </h2>

                <p>
                  You do not need to know
                  whether your project needs
                  Python, Power BI, React,
                  machine learning, or
                  something else.
                </p>

                <p>
                  Start with the problem,
                  outcome, or idea. We can
                  determine the right approach
                  from there.
                </p>

                <div className="contact-fit">
                  <p className="contact-fit-title">
                    Good reasons to get in touch
                  </p>

                  <ul>
                    <li>
                      Data analysis or reporting
                    </li>

                    <li>
                      Healthcare or
                      life-sciences analytics
                    </li>

                    <li>
                      Data quality or automation
                    </li>

                    <li>
                      Digital tools and
                      web applications
                    </li>

                    <li>
                      Training and mentoring
                    </li>

                    <li>
                      Research collaboration
                    </li>
                  </ul>
                </div>

              </div>

            </div>


            {/* =====================
                FORM
            ====================== */}

            <div className="col-lg-8">

              <div className="contact-form-card">

                <div className="contact-form-heading">
                  <p className="section-eyebrow">
                    Enquiry
                  </p>

                  <h2>
                    Send a message
                  </h2>

                  <p>
                    Fields marked with * are
                    required.
                  </p>
                </div>


                {status === "sent" ? (
                  <div
                    className="contact-success"
                    role="status"
                  >
                    <div className="contact-success-icon">
                      ✓
                    </div>

                    <h3>
                      Message sent.
                    </h3>

                    <p>
                      Thank you for getting
                      in touch. Your enquiry
                      has been received.
                    </p>

                    <button
                      type="button"
                      className="btn btn-outline-brand"
                      onClick={() =>
                        setStatus("idle")
                      }
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="contact-form"
                  >

                    <div className="row g-4">

                      {/* NAME */}

                      <div className="col-md-6">

                        <label
                          htmlFor="contact-name"
                          className="form-label"
                        >
                          Name *
                        </label>

                        <input
                          id="contact-name"
                          type="text"
                          name="name"
                          className="form-control"
                          value={form.name}
                          onChange={
                            handleChange
                          }
                          autoComplete="name"
                          required
                        />

                      </div>


                      {/* EMAIL */}

                      <div className="col-md-6">

                        <label
                          htmlFor="contact-email"
                          className="form-label"
                        >
                          Email address *
                        </label>

                        <input
                          id="contact-email"
                          type="email"
                          name="email"
                          className="form-control"
                          value={form.email}
                          onChange={
                            handleChange
                          }
                          autoComplete="email"
                          required
                        />

                      </div>


                      {/* ORGANISATION */}

                      <div className="col-md-6">

                        <label
                          htmlFor="contact-organisation"
                          className="form-label"
                        >
                          Organisation
                        </label>

                        <input
                          id="contact-organisation"
                          type="text"
                          name="organisation"
                          className="form-control"
                          value={
                            form.organisation
                          }
                          onChange={
                            handleChange
                          }
                          autoComplete="organization"
                        />

                      </div>


                      {/* ENQUIRY TYPE */}

                      <div className="col-md-6">

                        <label
                          htmlFor="contact-enquiry-type"
                          className="form-label"
                        >
                          What can I help with?
                        </label>

                        <select
                          id="contact-enquiry-type"
                          name="enquiryType"
                          className="form-select"
                          value={
                            form.enquiryType
                          }
                          onChange={
                            handleChange
                          }
                        >
                          <option value="">
                            Select an option
                          </option>

                          {enquiryTypes.map(
                            (type) => (
                              <option
                                key={type}
                                value={type}
                              >
                                {type}
                              </option>
                            )
                          )}
                        </select>

                      </div>


                      {/* MESSAGE */}

                      <div className="col-12">

                        <label
                          htmlFor="contact-message"
                          className="form-label"
                        >
                          Tell me about your
                          project or enquiry *
                        </label>

                        <textarea
                          id="contact-message"
                          name="message"
                          className="form-control"
                          rows="7"
                          value={form.message}
                          onChange={
                            handleChange
                          }
                          placeholder="What are you trying to achieve, and where do you need help?"
                          required
                        />

                      </div>


                      {/* ERROR */}

                      {error && (
                        <div className="col-12">

                          <div
                            className="contact-error"
                            role="alert"
                          >
                            {error}
                          </div>

                        </div>
                      )}


                      {/* SUBMIT */}

                      <div className="col-12">

                        <div className="contact-submit-row">

                          <button
                            type="submit"
                            className="btn btn-brand px-4 py-3"
                            disabled={
                              status ===
                              "sending"
                            }
                          >
                            {status ===
                            "sending"
                              ? "Sending..."
                              : "Send"}
                          </button>
                          

                          <p>
                            Your details are used only to respond to your enquiry. See the{" "}
                          <Link to="/privacy">
                            Privacy Policy
                          </Link>
                          </p>

                        </div>

                      </div>

                    </div>

                  </form>
                )}

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* =========================
          PROFESSIONAL LINKS
      ========================== */}

      <section className="section-space contact-links-section">

        <div className="container">

          <div className="section-heading mb-5">

            <p className="section-eyebrow">
              Elsewhere
            </p>

            <h2>
              Find my work and
              professional profiles.
            </h2>

          </div>


          <div className="row g-4">

            {contactLinks.map((link) => (
              <div
                key={link.label}
                className="col-lg-3 col-md-6"
              >

                <a
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="contact-profile-card"
                >

                  <div className="contact-profile-icon">
                    <i
                      className={link.icon}
                      aria-hidden="true"
                    />
                  </div>

                  <h3>
                    {link.label}
                  </h3>

                  <p>
                    {link.description}
                  </p>

                  <span>
                    Visit profile →
                  </span>

                </a>

              </div>
            ))}

          </div>

        </div>

      </section>


      {/* =========================
          FINAL MESSAGE
      ========================== */}

      <section className="contact-closing">

        <div className="container">

          <div className="contact-closing-inner">

            <p className="section-eyebrow">
              Collaboration
            </p>

            <h2>
              Good work often starts
              with a useful conversation.
            </h2>

            <p>
              I am open to freelance
              projects, professional
              collaborations, research,
              education, and opportunities
              where data and technology
              can create meaningful value.
            </p>

          </div>

        </div>

      </section>

    </>
  );
}