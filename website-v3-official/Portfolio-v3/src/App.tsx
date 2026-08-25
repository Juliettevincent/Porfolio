import { useState, useMemo } from "react";

// Polices installées localement via npm (voir instructions) — aucune requête
// réseau au runtime.
import "@fontsource/cormorant-garamond/300.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/permanent-marker";
import "@fontsource/space-mono/400.css";
import "@fontsource/space-mono/700.css";

import "./App.css";
import bgImage from "./assets/background portfolio.jpg";
import culte2026Fin from "./assets/culte_2026_financement.jpg"
import bgEnter from "./assets/background-enter.jpg";
import lesdelices from "./assets/lesdelices.jpg"
import finger from "./assets/finger 2.jpg"
import recursif from "./assets/recursif.jpg"
import colo from "./assets/le_coloriage_2.jpg"
import culte2025 from "./assets/culte2025.jpg"
import photography from "./assets/Screenshot 2026-08-24 205330.png";

// icones resaux sociaux
import igIcon from "./assets/icons8-instagram-96.png";
import soundcloud from "./assets/icons8-soundcloud-500.png";
import dropbox from "./assets/icons8-dropbox-500.png";
import linkedin from "./assets/icons8-linkedin-480.png";

// ---------------------------------------------------------------------------
// DONNÉES DES PROJETS
// Remplace `image: null` par une URL (ou un import depuis ./assets) vers ta
// vraie photo, ex: image: heroImg (avec `import heroImg from "./assets/armour-v3.jpg"`
// en haut du fichier). Tant que c'est null, un motif généré sert de placeholder.
// ---------------------------------------------------------------------------

type Span = "tall" | "wide" | "regular";

interface Project {
  slug: string;
  title: string;
  medium: string;
  span: Span;
  hue: string;
  blurb: string;
  image: string | null;
  link : string;
}

type View = "landing" | "gallery" | "detail";

const SOCIALS: { label: string; url: string; icon: string }[] = [
  { label: "Instagram", url: "https://www.instagram.com/juliettevincent_", icon: igIcon },
  { label: "SoundCloud", url: "https://soundcloud.com/user-569426431", icon: soundcloud },
  { label: "LinkedIn", url: "https://ca.linkedin.com/in/juliette-vincent-84022a22b", icon: linkedin },
  { label: "Dropbox", url: "https://www.dropbox.com/scl/fo/qzlnclp4etg0zznw50ba7/AAmiRercapl4BaJsIGF-moc?rlkey=s5vvj92r7m0oxqzwwc3ltxn6h&st=szqx4vtt&dl=0", icon: dropbox },
]; 

const PROJECTS: Project[] = [
  {
    slug: "Le coloriage",
    title: "Le coloriage",
    medium: "July 30th 2026 ; Photography, Stop motion, Touchdesigner, MIDI Keyboard",
    span: "wide",
    hue: "165, 45%, 55%",
    blurb:
      "Real time visuals made for a punk show at Quaie des brumes in collaboration with another visual artist (for the clay animations). Use of a MIDI keyboard for rendering different visuals for each song.",
    image: colo,
    link: "",
  },
  {
    slug: "Photography",
    title: "Photography",
    medium: "",
    span: "wide",
    hue: "165, 45%, 55%",
    blurb:
      "",
    image: photography,
    link: "",
  },
  {
    slug: "Finger",
    title: "Finger",
    medium: "April 3rd 2026 ; Touchdesigner & MIDI keyboard",
    span: "tall",
    hue: "42, 70%, 62%",
    blurb:
      "Live perfomance of my visuals accompanied by the song Finger by Ty Segall, a work made in class.",
    image: finger,
    link: "",
  },
  {
    slug: "Visuels culte 2025",
    title: "Le culte : 2025",
    medium: "Touchdesigner & kinect",
    span: "regular",
    hue: "45, 35%, 82%",
    blurb:
      "Launch of the 2025 edition of the magazine Le culte. Use of touchdesigner, python and a kinect for rendering real time visuals.",
    image: culte2025,
    link : "",
  },
  {
    slug: "Visuels culte 2026",
    title: "Le culte : 2026",
    medium: "Touchdesigner & PS3 controller",
    span: "wide",
    hue: "18, 40%, 68%",
    blurb:
      "Funding and launch of the 2026 edition of the magazine Le culte. Use of touchdesigner, python and a PS3 controller for rendering real time visuals.",
    image: culte2026Fin,
    link : "",
  },
  {
    slug: "Recursif",
    title: "Recursif",
    medium: "Ableton, Touchdesigner, photos & videos",
    span: "regular",
    hue: "355, 55%, 32%",
    blurb:
      "Travail dans Ableton qui genere des visuels dans Touchdesigner, generatif",
    image: recursif,
    link : "",
  },
   {
    slug: "Website",
    title: "Website",
    medium: "Wix, graphisme",
    span: "tall",
    hue: "38, 30%, 78%",
    blurb:
      "Creation d'un site web pour la compagnie Les Delices de Nonna",
    image: lesdelices,
    link : "https://lesdelicesdenonna.com",
  },
  {
    slug: "Histoire Sans Paroles",
    title: "Histoire Sans Paroles",
    medium: "Unity, C#, Wwise",
    span: "tall",
    hue: "38, 30%, 78%",
    blurb:
      "Team-based project made with the software Unity where we created an immersive 3D procedural environment.",
    image: null,
    link : "",
  },
    {
    slug: "Paintings",
    title: "Paintings",
    medium: "Acrylic",
    span: "tall",
    hue: "38, 30%, 78%",
    blurb:
      "Team-based project made with the software Unity where we created an immersive 3D procedural environment.",
    image: null,
    link : "",
  },
];

// motif de fond généré (placeholder) — purement décoratif tant qu'il n'y a pas de vraie image
function placeholderGradient(): string {
  return `
    
  `;
}

interface Spore {
  id: number;
  top: number;
  left: number;
  size: number;
  dur: number;
  delay: number;
  drift: number;
}

function Spores({ count = 22 }: { count?: number }) {
  const spores = useMemo<Spore[]>(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: 2 + Math.random() * 5,
        dur: 18 + Math.random() * 22,
        delay: -Math.random() * 30,
        drift: (Math.random() - 0.5) * 60,
      })),
    [count]
  );
  return (
    <div className="spore-field" aria-hidden="true">
      {spores.map((s) => (
        <span
          key={s.id}
          className="spore"
          style={
            {
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: s.size,
              height: s.size,
              animationDuration: `${s.dur}s`,
              animationDelay: `${s.delay}s`,
              "--drift": `${s.drift}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

function App() {
  const [view, setView] = useState<View>("landing");
  const [active, setActive] = useState<Project | null>(null);

  function goGallery() {
    setView("gallery");
  }
  function openProject(p: Project) {
    setActive(p);
    setView("detail");
  }
  function backToGallery() {
    setView("gallery");
    setActive(null);
  }

  return (
        <div className="shell">
      {view === "landing" && (
        <div
          className="landing"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(10,7,16,0.25) 0%, rgba(10,7,16,0.55) 55%, rgba(10,7,16,0.92) 100%), url(${bgImage})`,
          }}
        >
          <Spores count={22} />
          {/* <div className="landing-eyebrow">Anywhere but within</div> */}
          <h1 className="landing-name">Juliette Vincent</h1>
          {/* <div className="landing-rule" /> */}
          {/* <p className="landing-tagline">
            Real time visuals and audioreactive experiences
          </p> */}
          <button className="enter-btn" onClick={goGallery}>
            Enter
          </button>
          <div className="social-row">
            {SOCIALS.map((s) => (
            <a
              key={s.label}
              className="social-link"
              href={s.url}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
            >
            <img src={s.icon} alt="" />
            </a>
            ))}
        </div>
        </div>
      )}

      {view === "gallery" && (
        <div className="gallery"
        style={{
          backgroundImage: `url(${bgEnter})`,
        }}>
          <Spores count={14} />
          <div className="gallery-header">
            <span className="gallery-title">Juliette Vincent</span>
            <button className="nav-btn" onClick={() => setView("landing")}>
              ← Home
            </button>
          </div>
          <div className="grid">
            {PROJECTS.map((p) => (
              <button
                key={p.slug}
                className={`card ${p.span}`}
                
                style={{
                  backgroundImage: p.image
                    ? `url(${p.image})`
                    : placeholderGradient(),
                }}
                onClick={() => openProject(p)}
              >
                <span className="card-overlay" />
                <span className="card-title">{p.title}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {view === "detail" && active && (
        <div className="detail">
          <div
            className="detail-hero"
            style={{
              backgroundImage: active.image
                ? `url(${active.image})`
                : placeholderGradient(),
            }}
          >
            <button className="back-btn" onClick={backToGallery}>
              ← Portfolio
            </button>
            <h2 className="detail-title">{active.title}</h2>
          </div>
          <div className="detail-body">
            <div className="detail-meta">
              <span>{active.medium}</span>
            </div>
            <p className="detail-text">{active.blurb}</p>
                        <p className="detail-text">
            </p>
            <div className="detail-note">
              {active.link}
            </div>
          </div>
          
        </div>
      )}
    </div>
  );
}

export default App;