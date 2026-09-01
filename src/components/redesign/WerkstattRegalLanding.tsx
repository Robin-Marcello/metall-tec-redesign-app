"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, useTexture } from "@react-three/drei";
import { motion, useScroll, useTransform } from "framer-motion";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import Link from "next/link";
import { projects, services } from "@/lib/data";
import { site } from "@/lib/site";

const LIME = "#cbd444";
const projectImages = projects.slice(0, 5).map((project) => project.image ?? "/images/leistungen/gelaender.png");

function CameraRig({ pointer }: { pointer: React.MutableRefObject<{ x: number; y: number }> }) {
  const { camera } = useThree();
  useFrame((state) => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.current.x * 0.55, 0.035);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, pointer.current.y * 0.28, 0.035);
    camera.lookAt(0, 0, 0);
    state.camera.position.z = 7.8;
  });
  return null;
}

function ProjectPanel({
  index,
  image,
  active,
  onSelect,
}: {
  index: number;
  image: string;
  active: boolean;
  onSelect: () => void;
}) {
  const texture = useTexture(image);
  texture.colorSpace = THREE.SRGBColorSpace;
  const x = (index - 2) * 1.24;
  const z = index % 2 === 0 ? 0.25 : -0.12;
  return (
    <group position={[x, active ? 0.28 : 0, active ? 0.85 : z]} rotation={[0, (index - 2) * -0.045, 0]}>
      <mesh
        onClick={(event) => {
          event.stopPropagation();
          onSelect();
        }}
        onPointerOver={() => (document.body.style.cursor = "pointer")}
        onPointerOut={() => (document.body.style.cursor = "default")}
        scale={active ? 1.12 : 1}
      >
        <boxGeometry args={[1.03, 1.52, 0.08]} />
        <meshStandardMaterial color="#2d3032" metalness={0.82} roughness={0.24} />
      </mesh>
      <mesh position={[0, 0.05, 0.047]}>
        <planeGeometry args={[0.88, 1.15]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
      <mesh position={[0, -0.66, 0.055]}>
        <planeGeometry args={[0.88, 0.08]} />
        <meshBasicMaterial color={active ? LIME : "#7b7f82"} />
      </mesh>
    </group>
  );
}

function WorkshopShelf({
  pointer,
  active,
  onSelect,
}: {
  pointer: React.MutableRefObject<{ x: number; y: number }>;
  active: number;
  onSelect: (index: number) => void;
}) {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    const scroll = window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, pointer.current.x * 0.13 + scroll * 0.22, 0.035);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, pointer.current.y * -0.045, 0.035);
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.35) * 0.035;
  });

  return (
    <group ref={group} position={[0, -0.15, 0]}>
      <mesh position={[0, -1.06, -0.22]}>
        <boxGeometry args={[6.9, 0.16, 0.55]} />
        <meshStandardMaterial color="#383838" metalness={0.92} roughness={0.2} />
      </mesh>
      <mesh position={[0, 1.05, -0.22]}>
        <boxGeometry args={[6.9, 0.12, 0.42]} />
        <meshStandardMaterial color="#383838" metalness={0.9} roughness={0.22} />
      </mesh>
      {[-3.3, 3.3].map((x) => (
        <mesh key={x} position={[x, 0, -0.24]}>
          <boxGeometry args={[0.13, 2.25, 0.45]} />
          <meshStandardMaterial color="#2d2f31" metalness={0.94} roughness={0.18} />
        </mesh>
      ))}
      {projectImages.map((image, index) => (
        <ProjectPanel
          key={image + index}
          index={index}
          image={image}
          active={active === index}
          onSelect={() => onSelect(index)}
        />
      ))}
    </group>
  );
}

function ShelfScene({ active, onSelect }: { active: number; onSelect: (index: number) => void }) {
  const pointer = useRef({ x: 0, y: 0 });
  return (
    <div
      className="absolute inset-0"
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        pointer.current = {
          x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
          y: -(((event.clientY - rect.top) / rect.height) * 2 - 1),
        };
      }}
    >
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 7.8], fov: 34 }} gl={{ antialias: true, powerPreference: "high-performance" }}>
        <color attach="background" args={["#111313"]} />
        <fog attach="fog" args={["#111313", 7, 13]} />
        <ambientLight intensity={1.25} />
        <directionalLight position={[3, 5, 6]} intensity={3.5} color="#ffffff" />
        <pointLight position={[-4, 1, 3]} intensity={22} color={LIME} distance={8} />
        <Suspense fallback={null}>
          <Float speed={0.7} rotationIntensity={0.03} floatIntensity={0.08}>
            <WorkshopShelf pointer={pointer} active={active} onSelect={onSelect} />
          </Float>
        </Suspense>
        <CameraRig pointer={pointer} />
      </Canvas>
    </div>
  );
}

function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="max-w-3xl">
      <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#cbd444]">{eyebrow}</p>
      <h2 className="mt-5 font-display text-4xl font-black uppercase leading-[0.95] tracking-[-0.045em] text-white sm:text-6xl">
        {title}
      </h2>
      {text && <p className="mt-6 max-w-2xl text-base leading-7 text-white/58 sm:text-lg">{text}</p>}
    </div>
  );
}

export default function WerkstattRegalLanding() {
  const [activeProject, setActiveProject] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const active = projects[activeProject];

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") setActiveProject((value) => (value + 1) % 5);
      if (event.key === "ArrowLeft") setActiveProject((value) => (value + 4) % 5);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="overflow-clip bg-[#111313] text-white">
      <section ref={heroRef} className="relative min-h-[100svh] overflow-hidden" data-thread-section>
        <span data-thread-anchor className="sr-only" />
        <div className="absolute inset-0 hidden md:block">
          <ShelfScene active={activeProject} onSelect={setActiveProject} />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,19,19,.98)_0%,rgba(17,19,19,.72)_40%,rgba(17,19,19,.08)_73%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,19,19,.2),rgba(17,19,19,.12)_65%,#111313)]" />

        <motion.div style={{ y: titleY, opacity: titleOpacity }} className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl items-center px-5 pb-20 pt-28 sm:px-8">
          <div className="max-w-[780px]">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#cbd444]">Werkstattregal · Katzelsdorf</p>
            <p className="mt-8 font-display text-lg font-black uppercase tracking-[0.26em] text-white/65">METALL <span className="text-[#cbd444]">/</span> TEC</p>
            <h1 className="mt-4 font-display text-[clamp(3.6rem,10vw,8.8rem)] font-black uppercase leading-[0.78] tracking-[-0.075em]">
              Ideen.<br />Aus Stahl.<br /><span className="text-[#cbd444]">Gebaut.</span>
            </h1>
            <p className="mt-8 max-w-xl text-base leading-7 text-white/62 sm:text-lg">Metallbau in Präzision – geplant, gefertigt und montiert von unserem Team in Katzelsdorf.</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="#projekte" className="rounded-full bg-[#cbd444] px-6 py-3 text-sm font-bold text-[#181a19] transition hover:-translate-y-0.5">Projekte entdecken</Link>
              <Link href="/kontakt" className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-[#cbd444] hover:text-[#cbd444]">Projekt anfragen</Link>
            </div>
          </div>
        </motion.div>

        <div className="relative z-10 mx-5 mb-10 grid gap-3 md:hidden">
          {projects.slice(0, 3).map((project, index) => (
            <button key={project.id} onClick={() => setActiveProject(index)} className="overflow-hidden rounded-2xl border border-white/10 bg-[#242625] text-left">
              <img src={project.image} alt={project.title} className="h-48 w-full object-cover" />
              <div className="p-4"><span className="text-xs uppercase tracking-[0.2em] text-[#cbd444]">{project.category}</span><strong className="mt-1 block text-lg">{project.title}</strong></div>
            </button>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-5 py-28 sm:px-8 sm:py-40" data-thread-section>
        <span data-thread-anchor className="sr-only" />
        <div className="thread-reactive grid gap-14 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <SectionHeading eyebrow="01 · Unsere Werkstatt" title="Familie. Handwerk. Verantwortung." />
          <div className="grid gap-6 border-l border-white/12 pl-7 text-lg leading-8 text-white/60">
            <p>Metall-Tec ist ein familiärer Metallbau-Betrieb in Katzelsdorf. Wir begleiten Projekte persönlich – vom ersten Gespräch über das millimetergenaue Aufmaß bis zur Montage.</p>
            <p>Zuschnitt, Schweißen, Schleifen und Beschichten entstehen in unserer Werkstatt. So bleiben Qualität, Termine und Verantwortung in einer Hand.</p>
          </div>
        </div>
      </section>

      <section id="leistungen" className="border-y border-white/10 bg-[#383838] px-5 py-28 sm:px-8 sm:py-36" data-thread-section>
        <span data-thread-anchor className="sr-only" />
        <div className="thread-reactive mx-auto max-w-7xl">
          <SectionHeading eyebrow="02 · Leistungen" title="Sechs Gewerke. Eine Werkstatt." text="Vom privaten Geländer bis zur geprüften Stahlkonstruktion – langlebige Einzelstücke aus Stahl, Edelstahl und Aluminium." />
          <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((service, index) => (
              <article key={service.id} className="group min-h-64 bg-[#383838] p-7 transition hover:bg-[#303230]">
                <div className="flex items-start justify-between"><span className="font-mono text-xs text-[#cbd444]">0{index + 1}</span><span className="text-[10px] uppercase tracking-[.2em] text-white/35">{service.spec}</span></div>
                <h3 className="mt-14 font-display text-2xl font-black uppercase leading-tight tracking-[-0.035em]">{service.title}</h3>
                <p className="mt-4 text-sm leading-6 text-white/52">{service.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="projekte" className="relative mx-auto max-w-7xl px-5 py-28 sm:px-8 sm:py-40" data-thread-section>
        <span data-thread-anchor className="sr-only" />
        <div className="thread-reactive">
          <SectionHeading eyebrow="03 · Projektregal" title="Arbeit, die man anfassen kann." text="Wählen Sie ein Projekt im Regal. Die Konstruktion rückt nach vorne und zeigt Material, Ort und Aufgabe." />
          <div className="mt-14 grid gap-8 lg:grid-cols-[1.25fr_.75fr]">
            <div className="relative hidden min-h-[560px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#191b1a] md:block">
              <ShelfScene active={activeProject} onSelect={setActiveProject} />
              <div className="pointer-events-none absolute bottom-5 left-5 rounded-full border border-white/10 bg-black/45 px-4 py-2 font-mono text-[10px] uppercase tracking-[.22em] text-white/55">Pointer bewegen · Platte wählen · ← →</div>
            </div>
            <motion.article key={active.id} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="flex min-h-[420px] flex-col rounded-[2rem] border border-white/10 bg-[#383838] p-7 sm:p-9">
              <span className="font-mono text-xs uppercase tracking-[.22em] text-[#cbd444]">{active.category} · {active.year}</span>
              <h3 className="mt-6 font-display text-4xl font-black uppercase leading-[.94] tracking-[-.045em]">{active.title}</h3>
              <p className="mt-6 leading-7 text-white/58">{active.description}</p>
              <dl className="mt-auto grid grid-cols-2 gap-4 border-t border-white/12 pt-7 text-sm"><div><dt className="text-white/35">Ort</dt><dd className="mt-1">{active.location}</dd></div><div><dt className="text-white/35">Material</dt><dd className="mt-1">{active.material}</dd></div></dl>
              <div className="mt-7 flex gap-2">{projects.slice(0, 5).map((project, index) => <button key={project.id} aria-label={`Projekt ${index + 1} anzeigen`} onClick={() => setActiveProject(index)} className={`h-2 flex-1 rounded-full transition ${index === activeProject ? "bg-[#cbd444]" : "bg-white/15 hover:bg-white/30"}`} />)}</div>
            </motion.article>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-5 py-28 sm:px-8 sm:py-36" data-thread-section>
        <span data-thread-anchor className="sr-only" />
        <div className="thread-reactive mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-end">
          <SectionHeading eyebrow="04 · Kontakt" title="Ihr Projekt beginnt mit einem Gespräch." text={`Besuchen Sie uns im ${site.address.street}, ${site.address.zip} ${site.address.city}, oder senden Sie uns Ihre Idee.`} />
          <div className="rounded-[2rem] bg-[#cbd444] p-8 text-[#1b1d1c] sm:p-10"><p className="font-mono text-[10px] uppercase tracking-[.25em]">Direkter Draht zur Werkstatt</p><a href={`tel:${site.phone.replace(/\s/g, "")}`} className="mt-8 block font-display text-3xl font-black tracking-[-.04em] sm:text-5xl">{site.phone}</a><a href={`mailto:${site.email}`} className="mt-3 block text-lg font-semibold">{site.email}</a><Link href="/kontakt" className="mt-10 inline-flex rounded-full bg-[#202220] px-6 py-3 text-sm font-bold text-white">Anfrage starten</Link></div>
        </div>
      </section>
    </div>
  );
}
