import { Helmet } from "react-helmet-async";

export default function Publications() {
  return (
    <>
      <Helmet>
        <title>Publications | Ikemefula Oriaku</title>
        <meta
          name="description"
          content="Peer-reviewed publications and research work by Ikemefula Oriaku."
        />
      </Helmet>
      <section className="hero-simple">
        <div className="container">
          <h1>Publications</h1>
          <p>This page is prepared for the dedicated Publications phase of the redesign.</p>
        </div>
      </section>
    </>
  );
}
