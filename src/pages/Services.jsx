import { Helmet } from "react-helmet-async";

export default function Services() {
  return (
    <>
      <Helmet>
        <title>Services | Ikemefula Oriaku</title>
        <meta
          name="description"
          content="Data and analytics, development, and education services from Ikemefula Oriaku."
        />
      </Helmet>
      <section className="hero-simple">
        <div className="container">
          <h1>Services</h1>
          <p>This page is prepared for the dedicated Services phase of the redesign.</p>
        </div>
      </section>
    </>
  );
}
