"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  MeshTransmissionMaterial,
  Sparkles,
} from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";

const projects = [
  {
    number: "01",
    category: "DIGITAL",
    title: "Digital Experiences",
    description:
      "High-performance interfaces designed to make brands feel unforgettable.",
  },
  {
    number: "02",
    category: "IMMERSIVE",
    title: "Immersive Products",
    description:
      "Interactive digital environments combining design, motion and technology.",
  },
  {
    number: "03",
    category: "FUTURE",
    title: "Future Systems",
    description:
      "Scalable digital products built for the next generation of the web.",
  },
];

/* ========================================================= */
/* SHOWCASE 3D OBJECT                                         */
/* ========================================================= */

function ShowcaseObject({ active }: { active: number }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!group.current) return;

    const time = state.clock.elapsedTime;

    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      Math.sin(time * 0.5) * 0.18,
      0.03
    );

    group.current.rotation.y += delta * 0.4;

    group.current.position.y = Math.sin(time * 0.8) * 0.15;
  });

  return (
    <group ref={group}>
      {/* =================================================== */}
      {/* PROJECT OBJECT                                        */}
      {/* =================================================== */}

      {active === 0 && (
        <mesh>
          <icosahedronGeometry args={[1.9, 3]} />

          <MeshTransmissionMaterial
            backside
            samples={6}
            thickness={0.8}
            roughness={0.08}
            transmission={1}
            ior={1.45}
            chromaticAberration={0.06}
            anisotropy={0.15}
            color="#dfffff"
          />
        </mesh>
      )}

      {active === 1 && (
        <mesh>
          <torusKnotGeometry args={[1.25, 0.28, 160, 32]} />

          <meshPhysicalMaterial
            color="#eaffff"
            metalness={0.9}
            roughness={0.08}
            emissive="#00cfe8"
            emissiveIntensity={0.35}
          />
        </mesh>
      )}

      {active === 2 && (
        <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
          <octahedronGeometry args={[2, 1]} />

          <meshPhysicalMaterial
            color="#ffffff"
            metalness={0.85}
            roughness={0.1}
            transmission={0.25}
            emissive="#00d5e8"
            emissiveIntensity={0.45}
          />
        </mesh>
      )}

      {/* =================================================== */}
      {/* WIREFRAME SHELL                                       */}
      {/* =================================================== */}

      <mesh scale={1.08}>
        {active === 1 ? (
          <torusKnotGeometry args={[1.25, 0.28, 64, 16]} />
        ) : active === 2 ? (
          <octahedronGeometry args={[2, 1]} />
        ) : (
          <icosahedronGeometry args={[1.9, 2]} />
        )}

        <meshBasicMaterial
          color="#67e8f9"
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>
    </group>
  );
}

/* ========================================================= */
/* SHOWCASE SCENE                                              */
/* ========================================================= */

function Scene({ active }: { active: number }) {
  return (
    <>
      <ambientLight intensity={0.5} />

      <pointLight
        position={[4, 4, 5]}
        intensity={18}
        color="#67e8f9"
      />

      <pointLight
        position={[-4, -2, 3]}
        intensity={8}
        color="#ffffff"
      />

      <Environment preset="city" />

      <ShowcaseObject active={active} />

      <Sparkles
        count={90}
        scale={7}
        size={1.2}
        speed={0.25}
        opacity={0.45}
      />

      <EffectComposer>
        <Bloom
          intensity={1.15}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.85}
        />
      </EffectComposer>
    </>
  );
}

/* ========================================================= */
/* SHOWCASE                                                     */
/* ========================================================= */

export default function Showcase() {
  const [active, setActive] = useState(0);

  const project = projects[active];

  const sectionRef = useRef<HTMLElement>(null);

  const headerRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  const isFirstRender = useRef(true);

  /* ======================================================= */
  /* SCROLL ENTRANCE                                          */
  /* ======================================================= */

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) return;

    const header = headerRef.current;
    const visual = visualRef.current;
    const content = contentRef.current;
    const meta = metaRef.current;
    const glow = glowRef.current;

    const selectors =
      section.querySelectorAll<HTMLElement>(".showcase-selector");

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          toggleActions: "play none none reverse",
        },
      });

      timeline
        .fromTo(
          header,
          {
            opacity: 0,
            y: 70,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power4.out",
          }
        )
        .fromTo(
          visual,
          {
            opacity: 0,
            y: 100,
            scale: 0.94,
            rotateX: 4,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            duration: 1.3,
            ease: "power4.out",
          },
          "-=0.55"
        )
        .fromTo(
          content,
          {
            opacity: 0,
            x: 70,
          },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power4.out",
          },
          "-=0.8"
        )
        .fromTo(
          selectors,
          {
            opacity: 0,
            x: 35,
          },
          {
            opacity: 1,
            x: 0,
            stagger: 0.08,
            duration: 0.55,
            ease: "power3.out",
          },
          "-=0.45"
        )
        .fromTo(
          meta,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: "power3.out",
          },
          "-=0.3"
        );

      if (glow) {
        gsap.to(glow, {
          x: 80,
          y: -40,
          scale: 1.1,
          duration: 8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  /* ======================================================= */
  /* PROJECT TRANSITION                                       */
  /* ======================================================= */

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const title = titleRef.current;
    const description = descriptionRef.current;

    if (!title || !description) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) return;

    const timeline = gsap.timeline();

    timeline
      .to([title, description], {
        opacity: 0,
        y: 12,
        duration: 0.16,
        ease: "power2.in",
      })
      .fromTo(
        title,
        {
          opacity: 0,
          y: -18,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: "power3.out",
        }
      )
      .fromTo(
        description,
        {
          opacity: 0,
          y: 12,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
        },
        "-=0.3"
      );

    return () => {
      timeline.kill();
    };
  }, [active]);

  /* ======================================================= */
  /* POINTER TILT                                             */
  /* ======================================================= */

  

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="relative overflow-hidden px-6 py-36 md:px-12 lg:px-20"
    >
      {/* =================================================== */}
      {/* AMBIENT BACKGROUND                                    */}
      {/* =================================================== */}

      <div
        ref={glowRef}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/[0.035] blur-[140px]"
      />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(0,255,255,0.025),transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl">
        {/* =================================================== */}
        {/* HEADER                                                */}
        {/* =================================================== */}

        <div
          ref={headerRef}
          className="grid gap-8 lg:grid-cols-[1fr_400px] lg:items-end"
        >
          <div>
            <p className="mb-6 text-[10px] tracking-[0.45em] text-cyan-300/70">
              003 / CAPABILITIES
            </p>

            <h2 className="text-5xl font-semibold leading-[0.95] tracking-[-0.04em] text-white md:text-7xl lg:text-8xl">
              Built for
              <br />
              <span className="text-white/20">
                what&apos;s next.
              </span>
            </h2>
          </div>

          <p className="max-w-md text-sm leading-7 text-white/40">
            We combine technology, interaction and visual
            design to create digital experiences that feel
            alive.
          </p>
        </div>

        {/* =================================================== */}
        {/* MAIN EXPERIENCE                                       */}
        {/* =================================================== */}

        <div className="mt-20 grid overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025] lg:grid-cols-[1fr_1fr]">
          {/* ================================================= */}
          {/* LEFT — 3D                                          */}
          {/* ================================================= */}

          <div
            ref={visualRef}
            className="relative min-h-[500px] border-b border-white/10 [perspective:1200px] lg:border-b-0 lg:border-r"
           style={{
  transformStyle: "preserve-3d",
}}
          >
            <div className="absolute left-7 top-7 z-10">
              <span className="font-mono text-xs text-white/20">
                0{active + 1} / 03
              </span>
            </div>

            <div className="absolute inset-0">
              <Canvas
                camera={{
                  position: [0, 0, 6],
                  fov: 42,
                }}
                dpr={[1, 1.5]}
                gl={{
                  antialias: true,
                  powerPreference: "high-performance",
                }}
              >
                <Scene active={active} />
              </Canvas>
            </div>

            {/* Corner labels */}

            <div className="absolute bottom-7 left-7 text-[9px] tracking-[0.35em] text-white/20">
              INTERACTIVE SYSTEM
            </div>

            <div className="absolute bottom-7 right-7 text-[9px] tracking-[0.35em] text-cyan-300/40">
              WEBGL
            </div>
          </div>

          {/* ================================================= */}
          {/* RIGHT — CONTENT                                    */}
          {/* ================================================= */}

          <div
            ref={contentRef}
            className="flex min-h-[500px] flex-col justify-between p-8 md:p-12"
          >
            <div>
              <p className="text-[10px] tracking-[0.35em] text-cyan-300/70">
                {project.category}
              </p>

              <div className="mt-10 overflow-hidden">
                <h3
                  ref={titleRef}
                  className="text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl"
                >
                  {project.title}
                </h3>
              </div>

              <div className="overflow-hidden">
                <p
                  ref={descriptionRef}
                  className="mt-6 max-w-md text-sm leading-7 text-white/40"
                >
                  {project.description}
                </p>
              </div>
            </div>

            <div>
              <div className="mb-8 h-px w-full bg-white/10" />

              {/* ================================================= */}
              {/* PROJECT SELECTOR                                  */}
              {/* ================================================= */}

              <div className="space-y-2">
                {projects.map((item, index) => (
                  <button
                    key={item.number}
                    data-cursor="VIEW"
                    onMouseEnter={() => setActive(index)}
                    onClick={() => setActive(index)}
                    className="showcase-selector group flex w-full items-center justify-between py-4 text-left transition-transform duration-300 hover:translate-x-2 focus-visible:translate-x-2"
                  >
                    <div className="flex items-center gap-5">
                      <span
                        className={`font-mono text-[10px] transition-colors duration-300 ${
                          active === index
                            ? "text-cyan-300"
                            : "text-white/20"
                        }`}
                      >
                        {item.number}
                      </span>

                      <span
                        className={`text-sm transition-colors duration-300 ${
                          active === index
                            ? "text-white"
                            : "text-white/35 group-hover:text-white/70"
                        }`}
                      >
                        {item.category}
                      </span>
                    </div>

                    <span
                      className={`transition-all duration-300 ${
                        active === index
                          ? "translate-x-0 text-cyan-300 opacity-100"
                          : "-translate-x-2 text-white/20 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                      }`}
                    >
                      →
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* =================================================== */}
        {/* BOTTOM META                                           */}
        {/* =================================================== */}

        <div
          ref={metaRef}
          className="mt-8 flex flex-col justify-between gap-4 text-[9px] tracking-[0.3em] text-white/20 sm:flex-row"
        >
          <span>DESIGN / MOTION / TECHNOLOGY</span>

          <span>SCROLL TO EXPLORE</span>
        </div>
      </div>
    </section>
  );
}