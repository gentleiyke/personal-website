import { useState } from "react";

const API = import.meta.env.VITE_API_URL;

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.name || !form.email || !form.message) {
      setError("All fields are required");
      return;
    }

    if (!emailRegex.test(form.email)) {
      setError("Invalid email address");
      return;
    }

    setStatus("sending");

    try {
      const res = await fetch(`${API}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("sent");
        setForm({
          name: "",
          email: "",
          message: "",
        });
      } else {
        setStatus("error");
        setError("Failed to send message");
      }
    } catch (err) {
      setStatus("error");
      setError("Network error");
    }
  }

  return (
    <>
      <section className="hero-simple">
        <div className="container">
          <h1>Contact Me</h1>
          <p>Get in touch for projects, collaborations, or questions.</p>
        </div>
      </section>

      <section className="section-space">
        <div className="container">
          <div className="glass-card p-4 p-md-5">
            <h2 className="fw-bold mb-3">Send a Message</h2>
            <p className="text-muted-custom">
              In Week 2, this form will connect to your Express API and store
              messages in MongoDB.            </p>
          <form className="row g-3 mt-2" onSubmit={handleSubmit}>
            <div className="col-md-6">
              <label className="form-label">Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="col-12">
              <label className="form-label">Message</label>
              <textarea
                name="message"
                className="form-control"
                rows="6"
                placeholder="Write your message here"
                value={form.message}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12">
              <button
                type="submit"
                className="btn btn-brand"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>
            </div>

            <div className="col-12">
              {error && <p className="text-danger mb-0">{error}</p>}
              {status === "sent" && (
                <p className="text-success mb-0">Message sent!</p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
    </>
  );
}