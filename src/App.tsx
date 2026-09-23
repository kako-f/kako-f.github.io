import { useState } from "react";
import { portfolio } from "./data/portfolio";

const navItems = [
  ["About", "about"],
  ["Expertise", "expertise"],
  ["Projects", "projects"],
  ["Research", "research"],
  ["Contact", "contact"],
] as const;

const externalLabel = (label: string) => `${label} (opens in a new tab)`;

export default function App() {
  const [dark, setDark] = useState(false);

  return (
    <div className={dark ? "site dark" : "site"}>
      <header className="site-header">
        <a className="monogram" href="#hero" aria-label="Camilo Fuentes Beals, back to top">
          CFB
        </a>
        <nav aria-label="Primary navigation">
          {navItems.map(([label, id]) => (
            <a key={id} href={`#${id}`}>
              {label}
            </a>
          ))}
        </nav>
        <button className="theme-toggle" type="button" aria-pressed={dark} onClick={() => setDark((value) => !value)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </header>

      <main>
        <section className="hero section" id="hero" aria-labelledby="hero-title">
          <p className="eyebrow">Scientist · Engineer</p>
          <h1 id="hero-title">{portfolio.name}</h1>
          <p className="roles">{portfolio.roles.join(" · ")}</p>
          <p className="hero-copy">{portfolio.intro}</p>
          <div className="link-row" aria-label="Professional links">
            <a href={portfolio.links.github} target="_blank" rel="noreferrer" aria-label={externalLabel("GitHub")}>
              GitHub <span aria-hidden="true">↗</span>
            </a>
            <a href={portfolio.links.scholar} target="_blank" rel="noreferrer" aria-label={externalLabel("Google Scholar")}>
              Google Scholar <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>

        <section className="section split" id="about" aria-labelledby="about-title">
          <p className="section-label">01</p>
          <div>
            <h2 id="about-title">About</h2>
            <p className="lead">{portfolio.about}</p>
          </div>
        </section>

        <section className="section split" id="expertise" aria-labelledby="expertise-title">
          <p className="section-label">02</p>
          <div>
            <h2 id="expertise-title">Areas of expertise</h2>
            <div className="expertise-grid">
              {portfolio.expertise.map(([title, description], index) => (
                <article key={title} className="expertise-card">
                  <p className="index">0{index + 1}</p>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section split" id="projects" aria-labelledby="projects-title">
          <p className="section-label">03</p>
          <div>
            <h2 id="projects-title">Selected projects</h2>
            <div className="projects-list">
              {portfolio.projects.map((project) => (
                <article key={project.name} className="project-card">
                  <div>
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                  </div>
                  <p className="details">{project.details}</p>
                  {project.href ? (
                    <a href={project.href} target="_blank" rel="noreferrer" aria-label={externalLabel(`View ${project.name}`)}>
                      View work <span aria-hidden="true">↗</span>
                    </a>
                  ) : (
                    <span className="project-status">Selected work</span>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section split" id="research" aria-labelledby="research-title">
          <p className="section-label">04</p>
          <div>
            <h2 id="research-title">Research and teaching</h2>
            <p className="lead">{portfolio.research}</p>
            <a
              className="text-link"
              href={portfolio.links.scholar}
              target="_blank"
              rel="noreferrer"
              aria-label={externalLabel("Explore publications on Google Scholar")}
            >
              Explore publications on Google Scholar <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>

        <section className="section split" id="toolkit" aria-labelledby="toolkit-title">
          <p className="section-label">05</p>
          <div>
            <h2 id="toolkit-title">Technical toolkit</h2>
            <div className="toolkit-grid">
              {Object.entries(portfolio.toolkit).map(([group, tools]) => (
                <article key={group}>
                  <h3>{group}</h3>
                  <ul>
                    {tools.map((tool) => (
                      <li key={tool}>{tool}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section split contact" id="contact" aria-labelledby="contact-title">
          <p className="section-label">06</p>
          <div>
            <h2 id="contact-title">Let&apos;s connect</h2>
            <p className="lead">For research collaborations, technical projects, and conversations at the intersection of science and software.</p>
            <div className="contact-links">
              <a href={portfolio.links.website} target="_blank" rel="noreferrer" aria-label={externalLabel("Website")}>
                Website <span aria-hidden="true">↗</span>
              </a>
              <a href={portfolio.links.github} target="_blank" rel="noreferrer" aria-label={externalLabel("GitHub")}>
                GitHub <span aria-hidden="true">↗</span>
              </a>
              <a href={portfolio.links.scholar} target="_blank" rel="noreferrer" aria-label={externalLabel("Google Scholar")}>
                Google Scholar <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <span>Camilo Fuentes Beals</span>
        <span>Computational biology · data · software</span>
      </footer>
    </div>
  );
}
