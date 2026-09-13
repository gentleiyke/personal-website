import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import {
  lazy,
  Suspense,
  useEffect,
  useState,
} from "react";

import { HelmetProvider } from "react-helmet-async";

import CookieConsent
  from "./components/CookieConsent";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
// import ReactGA from "./analytics";

import {
  enableAnalytics,
  disableAnalytics,
  sendPageView,
} from "./analytics";

import {
  getStoredConsent,
} from "./utils/consent";


const Home =
  lazy(() => import("./pages/Home"));

const About =
  lazy(() => import("./pages/About"));

const Services =
  lazy(() => import("./pages/Services"));

const Projects =
  lazy(() => import("./pages/Projects"));

const Publications =
  lazy(() => import("./pages/Publications"));

const Contact =
  lazy(() => import("./pages/Contact"));

const Blog =
  lazy(() => import("./pages/Blog"));

const Post =
  lazy(() => import("./pages/Post"));

const AdminLogin =
  lazy(() => import("./pages/AdminLogin"));

const AdminDashboard =
  lazy(() => import("./pages/AdminDashboard"));

const NotFound =
  lazy(() => import("./pages/NotFound"));

const Privacy =
  lazy(() =>
    import("./pages/Privacy")
  );

const Terms =
  lazy(() =>
    import("./pages/Terms")
  );


function AnalyticsTracker() {
  const location =
    useLocation();

  const [
    analyticsAllowed,
    setAnalyticsAllowed,
  ] = useState(false);


  useEffect(() => {
    function applyConsent(
      consent
    ) {
      const allowed =
        Boolean(
          consent?.analytics
        );


      setAnalyticsAllowed(
        allowed
      );


      if (allowed) {
        enableAnalytics();
      } else {
        disableAnalytics();
      }
    }


    applyConsent(
      getStoredConsent()
    );


    function handleConsentChange(
      event
    ) {
      applyConsent(
        event.detail
      );
    }


    window.addEventListener(
      "site-consent-change",
      handleConsentChange
    );


    return () => {
      window.removeEventListener(
        "site-consent-change",
        handleConsentChange
      );
    };
  }, []);


  useEffect(() => {
    if (
      !analyticsAllowed
    ) {
      return;
    }


    if (
      location.pathname.startsWith(
        "/admin"
      )
    ) {
      return;
    }


    sendPageView(
      location.pathname +
        location.search
    );

  }, [
    location,
    analyticsAllowed,
  ]);


  return null;
}


function PageLoader() {
  return (
    <div
      className="page-loader"
      role="status"
      aria-live="polite"
    >
      <span>
        Loading...
      </span>
    </div>
  );
}


export default function App() {
  return (
    <HelmetProvider>

      <AnalyticsTracker />

      <Suspense
        fallback={<PageLoader />}
      >

        <Routes>

          {/* PUBLIC WEBSITE */}

          <Route element={<Layout />}>

            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="/about"
              element={<About />}
            />

            <Route
              path="/services"
              element={<Services />}
            />

            <Route
              path="/projects"
              element={<Projects />}
            />

            <Route
              path="/publications"
              element={<Publications />}
            />

            <Route
              path="/contact"
              element={<Contact />}
            />

            <Route
              path="/privacy"
              element={<Privacy />}
            />

            <Route
              path="/terms"
              element={<Terms />}
            />

            <Route
              path="/blog"
              element={<Blog />}
            />

            <Route
              path="/blog/:slug"
              element={<Post />}
            />

            {/* Temporary 404 behaviour */}

            <Route
              path="*"
              element={<NotFound />}
            />

          </Route>


          {/* ADMIN — NO PUBLIC LAYOUT */}

          <Route
            path="/admin-login"
            element={<AdminLogin />}
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

        </Routes>

      </Suspense>
      
      <CookieConsent />

    </HelmetProvider>
  );
}