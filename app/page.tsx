"use client";

import { useEffect, useState } from "react";
import BattleScene from "./battle-scene";

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));
const chapters = ["The arrival", "The duel begins", "Blade impact", "Arcane aftershock"];

export default function Home() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? clamp01(window.scrollY / max) : 0);
        frame = 0;
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const chapterIndex = Math.min(3, Math.floor(progress * 4));
  return (
    <main className="portfolio">
      <div className="scene" aria-hidden="true">
        <BattleScene progress={progress} />
        <div className="scene-vignette" />
      </div>

      <header className="topbar">
        <a className="brand" href="#home"><span className="brand-mark">A</span><span>ARYAN<span className="brand-dot">.</span></span></a>
        <nav aria-label="Main navigation"><a href="#work">Work</a><a href="#about">About</a><a href="#contact">Contact</a></nav>
        <a className="availability" href="mailto:hello@aryan.dev"><span /> Available for work</a>
      </header>

      <div className="chapter-indicator"><span>SCENE 0{chapterIndex + 1}</span><i /><span>{chapters[chapterIndex]}</span></div>

      <section id="home" className="hero page-section">
        <div className="hero-copy">
          <p className="eyebrow"><span>✳</span> CREATIVE DEVELOPER & DIGITAL ARTIST</p>
          <h1>Building<br />worlds<span className="serif"> that</span><br /><span className="outline">move you.</span></h1>
          <p className="hero-description">I turn ambitious ideas into immersive digital experiences — one thoughtful detail at a time.</p>
          <a className="round-link" href="#work"><span>Explore my work</span><span className="arrow">↘</span></a>
        </div>
        <div className="hero-side"><span>SCROLL TO BEGIN</span><div className="scroll-line"><i style={{ transform: `scaleY(${Math.max(0.1, progress)})` }} /></div><span>01 — 04</span></div>
        <p className="hero-caption">A small study in <span>motion & myth.</span></p>
      </section>

      <section id="work" className="story-section page-section">
        <div className="section-kicker"><span>01 / SELECTED WORK</span><span>CRAFTED WITH INTENTION</span></div>
        <div className="story-content">
          <p className="eyebrow">DIGITAL WORLDS, BUILT TO FEEL</p>
          <h2>Every pixel<br />has a <span className="serif">purpose.</span></h2>
          <p className="body-copy">I bring design and technology together to make the internet a more memorable place. Here are a few things I love making.</p>
          <a className="text-link" href="mailto:hello@aryan.dev">Have a project in mind? <span>Let’s talk ↗</span></a>
        </div>
        <div className="project-list">
          <a className="project-row" href="#contact"><span className="project-num">01</span><span className="project-name">Aether / Spatial interface</span><span className="project-tag">WEBGL · 2025</span><span className="project-arrow">↗</span></a>
          <a className="project-row" href="#contact"><span className="project-num">02</span><span className="project-name">Forma / Digital identity</span><span className="project-tag">BRANDING · 2024</span><span className="project-arrow">↗</span></a>
          <a className="project-row" href="#contact"><span className="project-num">03</span><span className="project-name">Afterlight / E-commerce</span><span className="project-tag">INTERACTION · 2024</span><span className="project-arrow">↗</span></a>
        </div>
      </section>

      <section id="about" className="about-section page-section">
        <div className="section-kicker"><span>02 / A LITTLE ABOUT ME</span><span>INDEPENDENT BY NATURE</span></div>
        <div className="about-grid"><p className="about-statement">Curious by nature.<br />Intentional by design.</p><div className="about-detail"><p>I’m Aryan, an independent creative developer who cares about the feeling between the frames. I work across design and code to make things that are useful, surprising, and unmistakably human.</p><div className="skills"><span>CREATIVE DEVELOPMENT</span><span>INTERACTIVE 3D</span><span>DIGITAL DESIGN</span><span>FRONTEND ENGINEERING</span></div></div></div>
      </section>

      <section id="contact" className="contact-section page-section">
        <div className="section-kicker"><span>03 / YOUR MOVE</span><span>THE NEXT CHAPTER STARTS HERE</span></div>
        <div className="contact-center"><p className="eyebrow">HAVE A GOOD ONE IN MIND?</p><h2>Let’s make<br /><span className="serif">something</span><br />matter.</h2><a className="contact-button" href="mailto:hello@aryan.dev">Start a conversation <span>↗</span></a></div>
        <footer><a className="brand" href="#home"><span className="brand-mark">A</span><span>ARYAN<span className="brand-dot">.</span></span></a><span>DESIGNED WITH CURIOSITY · BUILT WITH CARE</span><a href="#home">BACK TO TOP ↑</a></footer>
      </section>
      <div className="progress-track"><span style={{ transform: `scaleX(${progress})` }} /></div>
    </main>
  );
}
