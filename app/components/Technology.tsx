"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  MeshTransmissionMaterial,
  Sparkles,
} from "@react-three/drei";
import {
  Bloom,
  EffectComposer,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";

const technologies = [
  {
    number: "01",
    name: "REACT",
    label: "INTERFACE ENGINE",
    description:
      "Component-driven interfaces engineered for speed, flexibility and scale.",
  },
  {
    number: "02",
    name: "THREE.JS",
    label: "3D ENGINE",
    description:
      "Real-time 3D experiences that turn ordinary interfaces into immersive worlds.",
  },
  {
    number: "03",
    name: "GSAP",
    label: "MOTION SYSTEM",
    description:
      "Precise animation systems designed to make every interaction feel intentional.",
  },
  {
    number: "04",
    name: "WEBGL",
    label: "VISUAL ENGINE",
    description:
      "GPU-powered visuals bringing cinematic depth directly into the browser.",
  },
  {
    number: "05",
    name: "AI",
    label: "INTELLIGENCE",
    description:
      "Intelligent systems integrated into products to create experiences that adapt.",
  },
];

/* ========================================================= */
/* TECHNOLOGY 3D OBJECT                                        */
/* ========================================================= */

function TechObject({ active }: { active: number }) {
  const group = useRef<THREE.Group>(null);

  const targetRotation = useRef({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = (event.clientY / window.innerHeight) * 2 - 1;

      targetRotation.current.x = y * 0.12;
      targetRotation.current.y = x * 0.18;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useFrame((state, delta) => {
    if (!group.current) return;

    const time = state.clock.elapsedTime;

    group.current.rotation.x +=
      (targetRotation.current.x - group.current.rotation.x) * 0.025;

    group.current.rotation.y +=
      (targetRotation.current.y - group.current.rotation.y) * 0.025;

    group.current.rotation.y += delta * 0.15;

    /*
      Active technology subtly changes the object's rotation rhythm.
      This keeps the system feeling alive without changing the
      actual geometry for every technology.
    */
    const activeOffset = active * 0.035;

    group.current.rotation.z +=
      (Math.sin(time * 0.45) * 0.08 + activeOffset -
        group.current.rotation.z) *
      0.015;
  });

  return (
    <group ref={group}>
      {/* Main transmission object */}

      <mesh>
        <icosahedronGeometry args={[1.35, 2]} />

        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={0.8}
          chromaticAberration={0.08}
          anisotropy={0.3}
          distortion={0.15}
          distortionScale={0.25}
          temporalDistortion={0.08}
          roughness={0.12}
          transmission={1}
          ior={1.4}
        />
      </mesh>

      {/* Inner wireframe */}

      <mesh scale={1.5}>
        <icosahedronGeometry args={[1.35, 1]} />

        <meshBasicMaterial
          wireframe
          transparent
          opacity={0.22}
        />
      </mesh>

      {/* Outer wireframe */}

      <mesh scale={1.75}>
        <icosahedronGeometry args={[1.35, 1]} />

        <meshBasicMaterial
          wireframe
          transparent
          opacity={0.07}
        />
      </mesh>
    </group>
  );
}

/* ========================================================= */
/* TECHNOLOGY SCENE                                             */
/* ========================================================= */

function TechScene({ active }: { active: number }) {
  return (
    <>
      <ambientLight intensity={0.5} />

      <pointLight
        position={[4, 3, 4]}
        intensity={5}
      />

      <pointLight
        position={[-4, -2, 2]}
        intensity={3}
      />

      <Environment preset="city" />

      <TechObject active={active} />

      <Sparkles
        count={80}
        scale={7}
        size={1.2}
        speed={0.25}
        opacity={0.45}
      />

      <EffectComposer>
        <Bloom
          intensity={1.1}
          luminanceThreshold={0.15}
          luminanceSmoothing={0.8}
        />

        <Noise opacity={0.035} />

        <Vignette darkness={0.65} />
      </EffectComposer>
    </>
  );
}

/* ========================================================= */
/* TECHNOLOGY                                                   */
/* ========================================================= */

export default function Technology() {
  const [active, setActive] = useState(0);

  const current = technologies[active];

  const sectionRef = useRef<HTMLElement>(null);

  const headerRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const labelRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  const isFirstSelection = useRef(true);

  /* ======================================================= */
  /* KEYBOARD NAVIGATION                                       */
  /* ======================================================= */

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown") {
        setActive((currentIndex) =>
          Math.min(
            currentIndex + 1,
            technologies.length - 1
          )
        );
      }

      if (event.key === "ArrowUp") {
        setActive((currentIndex) =>
          Math.max(currentIndex - 1, 0)
        );
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, []);

  /* ======================================================= */
  /* SCROLL ENTRANCE                                            */
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
    const info = infoRef.current;
    const bottom = bottomRef.current;

    const selectors =
      section.querySelectorAll<HTMLElement>(
        ".technology-selector"
      );

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
            x: -80,
            scale: 0.94,
            filter: "blur(10px)",
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.2,
            ease: "power4.out",
          },
          "-=0.55"
        )
        .fromTo(
          info,
          {
            opacity: 0,
            x: 80,
          },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power4.out",
          },
          "-=0.85"
        )
        .fromTo(
          selectors,
          {
            opacity: 0,
            x: 28,
          },
          {
            opacity: 1,
            x: 0,
            stagger: 0.07,
            duration: 0.5,
            ease: "power3.out",
          },
          "-=0.45"
        )
        .fromTo(
          bottom,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.25"
        );
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  /* ======================================================= */
  /* ACTIVE TECHNOLOGY TRANSITION                              */
  /* ======================================================= */

  useEffect(() => {
    if (isFirstSelection.current) {
      isFirstSelection.current = false;
      return;
    }

    const label = labelRef.current;
    const title = titleRef.current;
    const description = descriptionRef.current;

    if (!label || !title || !description) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) return;

    const timeline = gsap.timeline();

    timeline
      .to(
        [label, title, description],
        {
          opacity: 0,
          y: 10,
          duration: 0.14,
          ease: "power2.in",
        }
      )
      .fromTo(
        label,
        {
          opacity: 0,
          y: -12,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          ease: "power3.out",
        }
      )
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
        },
        "-=0.2"
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
        "-=0.25"
      );

    return () => {
      timeline.kill();
    };
  }, [active]);

  return (
    <section
      ref={sectionRef}
      id="technology"
      className="relative min-h-screen overflow-hidden bg-black px-6 py-32 text-white md:px-10"
    >
      {/* =================================================== */}
      {/* AMBIENT DEPTH                                         */}
      {/* =================================================== */}

      <div className="pointer-events-none absolute left-1/3 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-white/[0.018] blur-[140px]" />

      <div className="pointer-events-none absolute right-0 top-1/3 h-[450px] w-[450px] rounded-full bg-cyan-400/[0.025] blur-[150px]" />

      <div className="mx-auto max-w-7xl">
        {/* ================================================= */}
        {/* HEADER                                              */}
        {/* ================================================= */}

        <div
          ref={headerRef}
          className="mb-16 flex flex-col justify-between gap-6 border-b border-white/10 pb-8 md:flex-row md:items-end"
        >
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-white/40">
              004 / Technology
            </p>

            <h2 className="max-w-3xl text-5xl font-medium tracking-[-0.05em] md:text-7xl">
              The tools behind
              <br />
              <span className="text-white/30">
                the experience.
              </span>
            </h2>
          </div>

          <p className="max-w-xs text-sm leading-6 text-white/40">
            A modern stack built for immersive digital products,
            intelligent interfaces and high-performance
            experiences.
          </p>
        </div>

        {/* ================================================= */}
        {/* MAIN SYSTEM                                         */}
        {/* ================================================= */}

        <div className="grid min-h-[650px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025] lg:grid-cols-[1.1fr_0.9fr]">
          {/* ================================================= */}
          {/* 3D SYSTEM                                          */}
          {/* ================================================= */}

          <div
            ref={visualRef}
            className="relative min-h-[450px] border-b border-white/10 lg:border-b-0 lg:border-r"
          >
            <div className="absolute left-6 top-6 z-10 text-[10px] uppercase tracking-[0.3em] text-white/30">
              Interactive System
            </div>

            <div className="absolute bottom-6 left-6 z-10 flex items-center gap-3">
              <span className="h-2 w-2 animate-pulse rounded-full bg-white" />

              <span className="text-[10px] uppercase tracking-[0.25em] text-white/40">
                Live Rendering
              </span>
            </div>

            <Canvas
              camera={{
                position: [0, 0, 5],
                fov: 45,
              }}
              dpr={[1, 2]}
              gl={{
                antialias: true,
                powerPreference: "high-performance",
              }}
              aria-hidden="true"
            >
              <TechScene active={active} />
            </Canvas>
          </div>

          {/* ================================================= */}
          {/* INFORMATION                                         */}
          {/* ================================================= */}

          <div
            ref={infoRef}
            className="flex flex-col justify-between p-7 md:p-10"
          >
            <div>
              <div className="mb-12 flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.3em] text-white/30">
                  Selected Technology
                </span>

                <span className="font-mono text-xs text-white/30">
                  {current.number} / 05
                </span>
              </div>

              <div className="mb-4 overflow-hidden">
                <p
                  ref={labelRef}
                  className="text-xs uppercase tracking-[0.3em] text-white/40"
                >
                  {current.label}
                </p>
              </div>

              <div className="overflow-hidden">
                <h3
                  ref={titleRef}
                  className="text-5xl font-medium tracking-[-0.05em] md:text-6xl"
                >
                  {current.name}
                </h3>
              </div>

              <div className="overflow-hidden">
                <p
                  ref={descriptionRef}
                  className="mt-8 max-w-md text-base leading-7 text-white/45"
                >
                  {current.description}
                </p>
              </div>
            </div>

            {/* ================================================= */}
            {/* SELECTOR                                            */}
            {/* ================================================= */}

            <div className="mt-16">
              <div className="mb-4 text-[10px] uppercase tracking-[0.3em] text-white/25">
                Explore Stack
              </div>

              <div className="space-y-1">
                {technologies.map((technology, index) => (
                  <button
                    key={technology.name}
                    data-cursor="SELECT"
                    onClick={() => setActive(index)}
                    className={`technology-selector group flex w-full items-center justify-between border-b border-white/10 py-4 text-left transition-all duration-300 ${
                      active === index
                        ? "text-white"
                        : "text-white/30 hover:text-white/70"
                    }`}
                  >
                    <div className="flex items-center gap-5">
                      <span
                        className={`font-mono text-[10px] transition-colors duration-300 ${
                          active === index
                            ? "text-cyan-300"
                            : "text-white/20"
                        }`}
                      >
                        {technology.number}
                      </span>

                      <span className="text-sm tracking-[0.12em]">
                        {technology.name}
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

        {/* ================================================= */}
        {/* BOTTOM STATEMENT                                    */}
        {/* ================================================= */}

        <div
          ref={bottomRef}
          className="mt-10 grid gap-8 border-t border-white/10 pt-8 md:grid-cols-3"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/25">
              Architecture
            </p>

            <p className="mt-3 text-sm text-white/50">
              Modular. Scalable. Maintainable.
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/25">
              Performance
            </p>

            <p className="mt-3 text-sm text-white/50">
              GPU accelerated experiences.
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/25">
              Philosophy
            </p>

            <p className="mt-3 text-sm text-white/50">
              Technology should disappear into the experience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}