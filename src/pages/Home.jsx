import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { fetchGithubStats } from "../services/githubStats";
import { fetchRepos } from "../services/github";

const slides = [
  {
    title: "Creative digital solutions",
    image:
      "src/assets/slider-01.jpg",
  },
  {
    title: "Built for modern businesses",
    image:
      "src/assets/slider-02.jpg",
  },
  {
    title: "Reliable hosting & engineering",
    image:
      "src/assets/slider-03.jpg",
  },
];

const skills = [
  { name: "HTML5", level: 95 },
  { name: "CSS3", level: 90 },
  { name: "JavaScript", level: 85 },
  { name: "Bootstrap", level: 90 },
  { name: "React", level: 75 },
  { name: "Node.js", level: 70 },
  { name: "MySQL", level: 85 },
];

const coreCompetencies = [
  "Web & app development",
  "API integration",
  "Hosting & infrastructure",
  "Performance optimization",
  "Mentorship & training",
];

const techStack = [
  "React",
  "Node.js",
  "Express",
  "PHP",
  "MySQL",
  "Bootstrap",
  "MongoDB",
  "Git",
];

const achievements = [
  { title: "Projects Done", value: "45+" },
  { title: "Mentees / Students", value: "120+" },
  { title: "Meetings", value: "300+" },
];

export default function Home() {
  const [stats, setStats] = useState(null);
  const [statsError, setStatsError] = useState(false);
  const [repos, setRepos] = useState([]);
  const [repoError, setRepoError] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [contactStatus, setContactStatus] = useState("idle");
  const [contactError, setContactError] = useState("");

  useEffect(() => {
    fetchGithubStats()
      .then(setStats)
      .catch((err) => {
        console.error("Failed to load GitHub stats:", err);
        setStatsError(true);
      });

    fetchRepos()
      .then(setRepos)
      .catch((err) => {
        console.error("Failed to load GitHub repos:", err);
        setRepoError(true);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((current) => (current + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const recentRepos = useMemo(() => {
    return repos.slice(0, 4);
  }, [repos]);

  function handleContactChange(e) {
    setContactForm({ ...contactForm, [e.target.name]: e.target.value });
  }

  async function handleContactSubmit(e) {
    e.preventDefault();
    setContactError("");

    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      setContactError("Please complete all fields.");
      return;
    }

    setContactStatus("sending");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactForm),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Unable to send message.");
      }

      setContactStatus("sent");
      setContactForm({ name: "", email: "", message: "" });
    } catch (err) {
      setContactStatus("error");
      setContactError(err.message);
    }
  }

  return (
    <>
      <section className="hero hero-full">
        <div
          className="hero-slider"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, idx) => (
            <div
              key={slide.title}
              className="hero-slide"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="hero-slide-overlay" />
            </div>
          ))}
        </div>

        <div className="hero-overlay container-fluid px-0">
          <div className="container">
            <div className="row align-items-center gy-4">
              <div className="col-lg-7">
                <div className="hero-panel">
                  <p className="eyebrow text-info text-uppercase fw-semibold mb-3">
                    Web Developer • Data Scientist • IT Systems & Hosting Specialist
                  </p>
                  <h1 className="display-4 fw-bold mb-4">
                    Building digital solutions that solves problems with a modern touch.
                  </h1>
                  <p className="lead text-muted-custom mb-4 hero-copy">
                    I'm Ikemefula Oriaku. I am a Soloprenuer passionate about building impactful digital solutions and sharing knowledge.
                    I build websites, web apps, data projects, IT systems, and managed hosting solutions. 
                  </p>
                  <div className="d-flex flex-wrap gap-3 mb-4">
                    <Link to="/projects" className="btn btn-brand px-4 py-3">
                      View Projects
                    </Link>
                    <Link to="/contact" className="btn btn-outline-brand px-4 py-3">
                      Get in Touch
                    </Link>
                    <a
                      href="https://ikemefulaoriaku.space/thumbs/IkemefulaORIAKU_GC.pdf"
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-outline-light px-4 py-3"
                    >
                      Download CV
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-lg-5">
                <div className="row g-3 stats-grid">
                  <div className="col-6">
                    <div className="stat-box hero-stat-box">
                      <h3 className="fw-bold mb-1">20+</h3>
                      <p className="mb-0 text-muted-custom">Years Experience</p>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="stat-box hero-stat-box">
                      <h3 className="fw-bold mb-1">{statsError ? "N/A" : stats?.repos ?? "-"}</h3>
                      <p className="mb-0 text-muted-custom">Public Repos</p>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="stat-box hero-stat-box">
                      <h3 className="fw-bold mb-1">Full Stack</h3>
                      <p className="mb-0 text-muted-custom">Total Stack</p>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="stat-box hero-stat-box">
                      <h3 className="fw-bold mb-1">{statsError ? "N/A" : stats?.stars ?? "-"}</h3>
                      <p className="mb-0 text-muted-custom">Total Stars</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="carousel-controls">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={currentSlide === idx ? "active" : ""}
                  onClick={() => setCurrentSlide(idx)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-space bg-soft">
        <div className="container">
          <div className="row gy-4">
            <div className="col-lg-6">
              <div className="glass-card p-4">
                <h2 className="fw-bold mb-3">About Me</h2>
                <p className="text-muted-custom mb-4">
                  I help businesses and individuals build elegant websites, web applications, data tools, and managed hosting systems with a strong focus on performance and reliability.
                </p>
                <h5 className="mb-3">Core Competencies</h5>
                <ul className="list-unstyled text-muted-custom mb-4 competence-list">
                  {coreCompetencies.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
                <h5 className="mb-3">Tech Stack</h5>
                <div className="d-flex flex-wrap gap-2 stack-list">
                  {techStack.map((item) => (
                    <span key={item} className="badge badge-soft">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="glass-card p-4">
                <h2 className="fw-bold mb-3">Skills</h2>
                {skills.map((skill) => (
                  <div key={skill.name} className="mb-3">
                    <div className="d-flex justify-content-between mb-1">
                      <span>{skill.name}</span>
                      <span>{skill.level}%</span>
                    </div>
                    <div className="progress skill-progress">
                      <div
                        className="progress-bar bg-info"
                        role="progressbar"
                        style={{ width: `${skill.level}%` }}
                        aria-valuenow={skill.level}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container">
          <h2 className="fw-bold mb-4">Achievements</h2>
          <div className="row g-4">
            {achievements.map((achievement) => (
              <div key={achievement.title} className="col-md-4">
                <div className="achievement-card glass-card p-4 text-center">
                  <h3 className="display-6 fw-bold mb-2">{achievement.value}</h3>
                  <p className="mb-0 text-muted-custom">{achievement.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-soft">
        <div className="container">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 mb-4">
            <div>
              <h2 className="fw-bold mb-1">Recent Projects</h2>
              <p className="text-muted-custom mb-0">A selection of the most recent repositories from GitHub.</p>
            </div>
            {repoError && <p className="text-danger mb-0">Unable to load recent projects.</p>}
          </div>
          <div className="row g-4">
            {recentRepos.map((repo) => (
              <div key={repo.id} className="col-md-6">
                <a href={repo.url} target="_blank" rel="noreferrer" className="project-card-link">
                  <div className="modern-project-card">
                    <div className="card-thumbnail">
                      <img src="https://via.placeholder.com/80x80/0F172A/06B6D4?text=Project" alt="Project thumbnail" />
                    </div>
                    <div className="card-content">
                      <h5 className="card-title">{repo.name}</h5>
                      <p className="card-description">{repo.description || "No description available."}</p>
                      <div className="card-stats">
                        <span className="stat-item">Likes: {repo.stars}</span>
                        <a href={repo.url} className="stat-link">Repo</a>
                        <span className="stat-item">Stars: {repo.stars}</span>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container">
          <div className="row align-items-center gy-4">
            <div className="col-lg-6">
              <div className="glass-card p-4">
                <h2 className="fw-bold mb-3">Get in touch</h2>
                <p className="text-muted-custom mb-4">
                  Have a project in mind or want to collaborate? Send a quick message and I’ll get back to you shortly.
                </p>
                <form onSubmit={handleContactSubmit} className="row g-3">
                  <div className="col-12">
                    <input
                      name="name"
                      value={contactForm.name}
                      onChange={handleContactChange}
                      className="form-control"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="col-12">
                    <input
                      name="email"
                      type="email"
                      value={contactForm.email}
                      onChange={handleContactChange}
                      className="form-control"
                      placeholder="Your email"
                    />
                  </div>
                  <div className="col-12">
                    <textarea
                      name="message"
                      rows="5"
                      value={contactForm.message}
                      onChange={handleContactChange}
                      className="form-control"
                      placeholder="Your message"
                    />
                  </div>
                  {contactError && <p className="text-danger mb-0">{contactError}</p>}
                  <div className="col-12">
                    <button type="submit" className="btn btn-brand px-4" disabled={contactStatus === "sending"}>
                      {contactStatus === "sending" ? "Sending..." : "Send Message"}
                    </button>
                    {contactStatus === "sent" && <p className="text-success mt-3 mb-0">Message sent successfully!</p>}
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="glass-card p-4 h-100 d-flex flex-column justify-content-center">
                <h2 className="fw-bold mb-3">Quick contact</h2>
                <p className="text-muted-custom mb-4">
                  Email me at <a href="mailto:hello@ikemefulaoriaku.space">hello@ikemefulaoriaku.space</a> or connect on any of the social platforms below.
                </p>
                <div className="d-flex flex-wrap gap-2">
                  <span className="badge badge-soft">Modern web design</span>
                  <span className="badge badge-soft">Data-driven apps</span>
                  <span className="badge badge-soft">Hosting & operations</span>
                  <span className="badge badge-soft">Training & mentorship</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}