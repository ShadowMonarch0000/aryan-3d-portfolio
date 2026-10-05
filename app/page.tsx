"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

function Fighter({ side, progress }: { side: "ember" | "frost"; progress: number }) {
  const root = useRef<THREE.Group>(null);
  const sword = useRef<THREE.Group>(null);
  const ember = side === "ember";
  const color = ember ? "#ff754f" : "#65d9ff";
  const dark = ember ? "#27151d" : "#111e31";
  const x = ember ? -1.45 : 1.45;
  const phase = clamp01(progress);

  useFrame(({ clock }) => {
    if (!root.current || !sword.current) return;
    const t = clock.elapsedTime;
    const clash = Math.exp(-Math.pow((phase - 0.55) * 7, 2));
    const recoil = Math.exp(-Math.pow((phase - 0.73) * 7, 2));
    root.current.position.x = x + (ember ? 1 : -1) * (clash * 0.2 - recoil * 0.34);
    root.current.position.y = Math.sin(t * 1.6 + (ember ? 0 : 2)) * 0.035 + clash * 0.13;
    root.current.rotation.y = (ember ? 0.16 : Math.PI - 0.16) + (ember ? -1 : 1) * recoil * 0.2;
    sword.current.rotation.z = (ember ? -0.2 : 0.2) + Math.sin(t * 1.2 + (ember ? 0 : 2)) * 0.12 + clash * (ember ? -0.9 : 0.9) + recoil * (ember ? 0.7 : -0.7);
  });

  return (
    <group ref={root} position={[x, 0, 0]}>
      {/* Low-poly armored duelist, built from simple Three.js shapes. */}
      <mesh position={[0, 1.42, 0]} castShadow><sphereGeometry args={[0.23, 12, 10]} /><meshStandardMaterial color={dark} metalness={0.65} roughness={0.34} /></mesh>
      <mesh position={[0, 1.48, 0.19]}><boxGeometry args={[0.25, 0.075, 0.08]} /><meshBasicMaterial color={color} /></mesh>
      <mesh position={[0, 1.02, 0]} castShadow><capsuleGeometry args={[0.28, 0.56, 5, 8]} /><meshStandardMaterial color={dark} metalness={0.58} roughness={0.38} /></mesh>
      <mesh position={[0, 0.92, 0.2]}><torusGeometry args={[0.21, 0.025, 6, 14]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.6} /></mesh>
      <mesh position={[-0.31, 1.16, 0]} rotation={[0, 0, -0.18]} castShadow><sphereGeometry args={[0.16, 10, 8]} /><meshStandardMaterial color={color} metalness={0.55} roughness={0.3} /></mesh>
      <mesh position={[0.3, 0.75, 0]} rotation={[0, 0, 0.2]} castShadow><capsuleGeometry args={[0.09, 0.55, 4, 7]} /><meshStandardMaterial color={dark} metalness={0.7} roughness={0.34} /></mesh>
      <mesh position={[-0.17, 0.36, 0]} rotation={[0, 0, 0.1]} castShadow><capsuleGeometry args={[0.115, 0.56, 4, 7]} /><meshStandardMaterial color={dark} metalness={0.64} roughness={0.37} /></mesh>
      <mesh position={[0.18, 0.35, 0.01]} rotation={[0, 0, -0.12]} castShadow><capsuleGeometry args={[0.115, 0.56, 4, 7]} /><meshStandardMaterial color={dark} metalness={0.64} roughness={0.37} /></mesh>
      <mesh position={[-0.17, 0.045, 0.09]}><boxGeometry args={[0.24, 0.13, 0.4]} /><meshStandardMaterial color={color} metalness={0.48} roughness={0.4} /></mesh>
      <mesh position={[0.18, 0.045, 0.09]}><boxGeometry args={[0.24, 0.13, 0.4]} /><meshStandardMaterial color={color} metalness={0.48} roughness={0.4} /></mesh>
      <group ref={sword} position={[0.49, 0.78, 0.06]}>
        <mesh position={[0, -0.2, 0]}><cylinderGeometry args={[0.045, 0.035, 0.34, 8]} /><meshStandardMaterial color="#c8bca6" metalness={0.8} /></mesh>
        <mesh position={[0, 0, 0]}><boxGeometry args={[0.31, 0.065, 0.08]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.2} /></mesh>
        <mesh position={[0, 0.56, 0]}><coneGeometry args={[0.085, 1.1, 6]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5} metalness={0.35} roughness={0.22} /></mesh>
        <mesh position={[0, 0.24, 0]}><cylinderGeometry args={[0.018, 0.035, 0.38, 6]} /><meshStandardMaterial color="#fff4dc" emissive={color} emissiveIntensity={0.8} /></mesh>
      </group>
      <pointLight position={[0, 1, 0.35]} color={color} intensity={2.2} distance={3} />
    </group>
  );
}

function DuelScene({ progress }: { progress: number }) {
  const impact = Math.exp(-Math.pow((progress - 0.55) * 8, 2));
  const ring = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ring.current) {
      ring.current.rotation.z += 0.002;
      ring.current.scale.setScalar(1 + impact * 0.08 + Math.sin(clock.elapsedTime * 0.6) * 0.018);
    }
  });
  return (
    <>
      <color attach="background" args={["#090a0d"]} />
      <fog attach="fog" args={["#090a0d", 8, 18]} />
      <ambientLight intensity={0.75} />
      <hemisphereLight args={["#90a6c8", "#141014", 1.1]} />
      <directionalLight position={[2, 6, 4]} intensity={3.1} castShadow shadow-mapSize={[1024, 1024]} />
      <pointLight position={[0, 2, 1]} color="#9c63ff" intensity={1 + impact * 5} distance={8} />
      <Fighter side="ember" progress={progress} />
      <Fighter side="frost" progress={progress} />
      <mesh ref={ring} position={[0, 0.015, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.25, 0.018, 8, 100]} />
        <meshBasicMaterial color="#d6aa72" transparent opacity={0.65} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.08, 0]} receiveShadow>
        <circleGeometry args={[3.2, 64]} /><meshStandardMaterial color="#121216" metalness={0.55} roughness={0.72} />
      </mesh>
      <Sparkles count={85} scale={[7, 4, 4]} size={2} speed={0.22 + impact * 1.4} color="#ffc078" opacity={0.68} />
      <Sparkles count={30} scale={[3.5, 2.8, 2.6]} size={3 + impact * 4} speed={0.7 + impact * 2} color="#d19aff" opacity={0.82} />
      <Float speed={0.5} rotationIntensity={0.025} floatIntensity={0.08}>
        <mesh position={[0, 2.55, -0.7]}><icosahedronGeometry args={[0.2, 1]} /><meshBasicMaterial color="#b58bff" wireframe transparent opacity={0.42} /></mesh>
      </Float>
    </>
  );
}

const chapters = ["The arrival", "First contact", "Arcane clash", "Afterglow"];

export default function Home() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? clamp01(window.scrollY / max) : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);

  const chapterIndex = Math.min(3, Math.floor(progress * 4));
  return (
    <main className="portfolio">
      <div className="scene" aria-hidden="true">
        <Canvas shadows camera={{ position: [0, 2.2, 8], fov: 39 }} dpr={[1, 1.6]}>
          <DuelScene progress={progress} />
        </Canvas>
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
