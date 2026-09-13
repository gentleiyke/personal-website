import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";
import { Helmet } from "react-helmet-async";


fetch(
  apiUrl("/api/auth/login")
)

const API = import.meta.env.VITE_API_URL;

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");
  const [error, setError] =
    useState("");
  const [loading, setLoading] =
    useState(false);

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    if (
      !email.trim() ||
      !password
    ) {
      setError(
        "Please enter your email address and password."
      );

      return;
    }

    if (!API) {
      setError(
        "The API URL is not configured."
      );

      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${API}/api/auth/login`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Unable to sign in."
        );
      }

      if (!data.token) {
        throw new Error(
          "Authentication succeeded but no access token was returned."
        );
      }

      localStorage.setItem(
        "token",
        data.token
      );

      navigate(
        "/admin",
        {
          replace: true,
        }
      );
    } catch (err) {
      console.error(
        "Admin login error:",
        err
      );

      setError(
        err.message ||
          "Unable to sign in."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Helmet>
        <title>
          Admin Login | Ikemefula Oriaku
        </title>

        <meta
          name="robots"
          content="noindex, nofollow"
        />
      </Helmet>

      <section className="admin-login-page">

        <div className="container">

          <div className="admin-login-wrapper">

            <div className="admin-login-brand">

              <p className="section-eyebrow">
                Administration
              </p>

              <h1>
                Content management
              </h1>

              <p>
                Sign in to manage articles
                and website content.
              </p>

              <Link
                to="/"
                className="admin-back-link"
              >
                ← Return to website
              </Link>

            </div>


            <div className="admin-login-card">

              <div className="admin-login-heading">

                <span className="admin-lock-icon">
                  <i
                    className="fas fa-lock"
                    aria-hidden="true"
                  />
                </span>

                <h2>
                  Admin sign in
                </h2>

                <p>
                  Enter your administrator
                  credentials to continue.
                </p>

              </div>


              <form
                onSubmit={handleSubmit}
                className="admin-login-form"
              >

                {/* EMAIL */}

                <div className="mb-4">

                  <label
                    htmlFor="admin-email"
                    className="form-label"
                  >
                    Email address
                  </label>

                  <input
                    id="admin-email"
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(event) =>
                      setEmail(
                        event.target.value
                      )
                    }
                    autoComplete="email"
                    required
                  />

                </div>


                {/* PASSWORD */}

                <div className="mb-4">

                  <label
                    htmlFor="admin-password"
                    className="form-label"
                  >
                    Password
                  </label>

                  <input
                    id="admin-password"
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(event) =>
                      setPassword(
                        event.target.value
                      )
                    }
                    autoComplete="current-password"
                    required
                  />

                </div>


                {/* ERROR */}

                {error && (
                  <div
                    className="admin-alert admin-alert-error mb-4"
                    role="alert"
                  >
                    {error}
                  </div>
                )}


                {/* SUBMIT */}

                <button
                  type="submit"
                  className="btn btn-brand admin-login-button"
                  disabled={loading}
                >
                  {loading
                    ? "Signing in..."
                    : "Sign In"}
                </button>

              </form>

            </div>

          </div>

        </div>

      </section>
    </>
  );
}