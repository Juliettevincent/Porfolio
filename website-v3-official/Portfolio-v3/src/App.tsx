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
  year: string;
  medium: string;
  span: Span;
  hue: string;
  blurb: string;
  image: string | null;
}

type View = "landing" | "gallery" | "detail";

const PROJECTS: Project[] = [
  {
    slug: "Site web",
    title: "Site web",
    year: "2021",
    medium: "Wix, grpahisme",
    span: "tall",
    hue: "38, 30%, 78%",
    blurb:
      "Creation d'un site web pour la compagnie Les Delices de Nonna",
    image: null,
  },
  {
    slug: "Le coloriage",
    title: "Le coloriage",
    year: "2026",
    medium: "Stop motion, photographie, touchdesigner",
    span: "wide",
    hue: "165, 45%, 55%",
    blurb:
      "Creation de visuels en temps reel pour un spectacle au quaie des brumes.",
    image: null,
  },
  {
    slug: "Finger",
    title: "Visuels : Finger",
    year: "2025",
    medium: "Touchdesigner, MIDI keyboard",
    span: "tall",
    hue: "42, 70%, 62%",
    blurb:
      "Perfomance en temps reel avec un clavier MIDI pour ",
    image: null,
  },
  {
    slug: "Visuels culte 2025",
    title: "Le culte : 2025",
    year: "2025",
    medium: "Touchdesigner, kinect",
    span: "regular",
    hue: "45, 35%, 82%",
    blurb:
      "Lancement 2025 du magazine le culte, visuels avec une kinect en temps reel",
    image: null,
  },
  {
    slug: "Visuels culte 2026",
    title: "Le culte : 2026",
    year: "2026",
    medium: "Performance, prothèses, résine",
    span: "wide",
    hue: "18, 40%, 68%",
    blurb:
      "Financement & lancement du magazine le culte, visuels programmable avec une manette de ps3",
    image: culte2026Fin,
  },
  {
    slug: "Projet avec mirco",
    title: "Projet avec mirco",
    year: "2026",
    medium: "Ableton, Touchdesigner, photos et videos",
    span: "regular",
    hue: "355, 55%, 32%",
    blurb:
      "Travail dans Ableton qui genere des visuels dans Touchdesigner, generatif",
    image: null,
  },
];

// motif de fond généré (placeholder) — purement décoratif tant qu'il n'y a pas de vraie image
function placeholderGradient(hue: string): string {
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
                    : placeholderGradient(p.hue),
                }}
                onClick={() => openProject(p)}
              >
                <span className="card-meta">{p.year}</span>
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
                : placeholderGradient(active.hue),
            }}
          >
            <button className="back-btn" onClick={backToGallery}>
              ← Portfolio
            </button>
            <h2 className="detail-title">{active.title}</h2>
          </div>
          <div className="detail-body">
            <div className="detail-meta">
              <span>{active.year}</span>
              <span>{active.medium}</span>
            </div>
            <p className="detail-text">{active.blurb}</p>
            <p className="detail-text">
              Ajoute ici le texte complet du projet — démarche, contexte
              d'exposition, matériaux, dimensions, crédits photo — pour
              remplacer ce paragraphe d'exemple.
            </p>
            <div className="detail-note">
              Remplace `image: null` par l'URL (ou l'import) de ta photo dans
              PROJECTS pour afficher tes vraies images ici et dans la
              galerie.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;