import { useState } from "react";
import { Link } from "react-router-dom";

const NEWSLETTER_ENDPOINT =
  "https://formspree.io/f/moeqrydr";

const socialLinks = [
  {
    label: "Facebook",
    url: "https://www.facebook.com/gentleiykeo",
    icon: "fab fa-facebook-f",
  },
  {
    label: "X",
    url: "https://x.com/gentle_iyke",
    icon: "fab fa-twitter",
  },
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/gentleiyke",
    icon: "fab fa-linkedin-in",
  },
  {
    label: "GitHub",
    url: "https://github.com/gentleiyke",
    icon: "fab fa-github",
  },
  {
    label: "YouTube",
    url: "https://www.youtube.com/@Ikemefulaoriaku",
    icon: "fab fa-youtube",
  },
  {
    label: "TikTok",
    url: "https://www.tiktok.com/@ikemefulaoriaku",
    icon: "fab fa-tiktok",
  },
];
function openCookieSettings() {
  window.dispatchEvent(
    new Event(
      "open-cookie-settings"
    )
  );
}
export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] =
    useState("idle");
  const [message, setMessage] =
    useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    setMessage("");

    if (!email.trim()) {
      setMessage(
        "Please enter your email address."
      );

      return;
    }

    setStatus("sending");

    try {
      const response = await fetch(
        NEWSLETTER_ENDPOINT,
        {
          method: "POST",

          headers: {
            Accept: "application/json",
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            email: email.trim(),
            type: "Newsletter subscription",
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Unable to subscribe."
        );
      }

      setEmail("");
      setStatus("sent");

      setMessage(
        "Thanks — you're on the list."
      );
    } catch (error) {
      console.error(
        "Newsletter subscription error:",
        error
      );

      setStatus("error");

      setMessage(
        "Subscription failed. Please try again."
      );
    }
  }

  return (
    <footer className="site-footer">

      <div className="container">

        {/* =========================
            NEWSLETTER
        ========================== */}

        <div className="footer-newsletter">

          <div className="footer-newsletter-copy">

            <p className="footer-newsletter-title">
              Stay in the loop
            </p>

            <p className="footer-newsletter-text">
              Occasional updates on data,
              technology, research, and
              practical learning.
            </p>

          </div>


          <div className="footer-newsletter-form-wrap">

            <form
              className="footer-newsletter-form"
              onSubmit={handleSubmit}
            >

              <label
                htmlFor="footer-email"
                className="visually-hidden"
              >
                Email address
              </label>

              <input
                id="footer-email"
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(
                    event.target.value
                  )
                }
                placeholder="you@example.com"
                autoComplete="email"
                required
              />

              <button
                type="submit"
                disabled={
                  status === "sending"
                }
              >
                {status === "sending"
                  ? "Subscribing..."
                  : "Subscribe"}
              </button>

            </form>

            <p className="footer-newsletter-privacy">
  By subscribing, you agree to receive
  occasional professional updates.
  You can unsubscribe at any time.{" "}
  <Link to="/privacy">
    Privacy
  </Link>
</p>


            {message && (
              <p
                className={`footer-newsletter-status ${
                  status === "error"
                    ? "error"
                    : ""
                }`}
                role={
                  status === "error"
                    ? "alert"
                    : "status"
                }
              >
                {message}
              </p>
            )}

          </div>

        </div>


        {/* =========================
            BOTTOM ROW
        ========================== */}

        <div className="footer-bottom">

          <div className="footer-bottom-left">

            <p className="footer-copyright">
              ©{" "}
              {new Date().getFullYear()}{" "}
              Ikemefula Oriaku.
              All rights reserved.
            </p>


            <div className="footer-social-links">

              {socialLinks.map(
                (social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="footer-social-link"
                    aria-label={social.label}
                    title={social.label}
                  >
                    <i
                      className={
                        social.icon
                      }
                      aria-hidden="true"
                    />
                  </a>
                )
              )}

            </div>

          </div>


          <nav
            className="footer-legal-links"
            aria-label="Legal"
            >
            <Link to="/privacy">
                Privacy
            </Link>

            <Link to="/terms">
                Terms
            </Link>

            <button
                type="button"
                className="footer-cookie-settings"
                onClick={
                openCookieSettings
                }
            >
                Cookie settings
            </button>
        </nav>

        </div>

      </div>

    </footer>
  );
}