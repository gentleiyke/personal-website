export default function About() {
  const skills = [
  { name: "HTML5", level: 95 },
  { name: "CSS3", level: 90 },
  { name: "JavaScript", level: 85 },
  { name: "Bootstrap", level: 90 },
  { name: "PHP", level: 88 },
  { name: "MySQL", level: 85 },
  { name: "React", level: 60 }
]

  return (
    <>
      <section className="hero-simple">
        <div className="container">
          <h1>About Me</h1>
          <p>Learn more about my background, skills, and experience in web development and IT.</p>
        </div>
      </section>

      <section className="section-space">
        <div className="container">
          <div className="glass-card p-4 p-md-5">
            <h2 className="fw-bold mb-3">My Background</h2>
            <p className="text-muted-custom">
              I have worked as a web developer since 2002, building and managing
              websites with HTML, CSS, JavaScript, PHP, MySQL, Bootstrap, and
              jQuery. I also handle hosting environments, DNS configuration,
              deployment workflows, database administration, and website file
              management with FTP tools like FileZilla.
            </p>

            <h3 className="fw-bold mb-3">Skills</h3>
            {skills.map(skill => (
              <div key={skill.name} className="mb-3">

                <div className="d-flex justify-content-between">
                  <span>{skill.name}</span>
                  <span>{skill.level}%</span>
                </div>

                <div className="progress">
                  <div
                    className="progress-bar bg-info"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>

              </div>

              ))}
            </div>
          </div>
      </section>
    </>
  );
}