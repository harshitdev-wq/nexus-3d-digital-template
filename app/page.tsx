"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Float,
  Sparkles,
} from "@react-three/drei";
import {
  Bloom,
  EffectComposer,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Loader from "./components/Loader";
import Cursor from "./components/Cursor";
import Navbar from "./components/Navbar";
import Showcase from "./components/Showcase";
import Technology from "./components/Technology";
import Manifesto from "./components/Manifesto";
import Process from "./components/Process";
import Contact from "./components/Contact";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────
   HERO 3D CORE
───────────────────────────────────────────── */

function Core() {
  const coreRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const ringOneRef = useRef<THREE.Mesh>(null);
  const ringTwoRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!coreRef.current || !meshRef.current) return;

    const mouse = state.mouse;

    // Core rotation
    meshRef.current.rotation.x += delta * 0.18;
    meshRef.current.rotation.y += delta * 0.28;

    // Mouse interaction
    const targetX = mouse.y * 0.5;
    const targetY = mouse.x * 0.5;

    coreRef.current.rotation.x = THREE.MathUtils.lerp(
      coreRef.current.rotation.x,
      targetX,
      0.035
    );

    coreRef.current.rotation.y = THREE.MathUtils.lerp(
      coreRef.current.rotation.y,
      targetY,
      0.035
    );

    // Subtle depth movement
    const targetZ = Math.abs(mouse.x) * 0.18;

    coreRef.current.position.z = THREE.MathUtils.lerp(
      coreRef.current.position.z,
      targetZ,
      0.025
    );

    // Orbit ring 1
    if (ringOneRef.current) {
      ringOneRef.current.rotation.z += delta * 0.12;

      ringOneRef.current.rotation.y = THREE.MathUtils.lerp(
        ringOneRef.current.rotation.y,
        mouse.x * 0.15,
        0.015
      );
    }

    // Orbit ring 2
    if (ringTwoRef.current) {
      ringTwoRef.current.rotation.x += delta * 0.08;
      ringTwoRef.current.rotation.z -= delta * 0.1;

      ringTwoRef.current.rotation.x = THREE.MathUtils.lerp(
        ringTwoRef.current.rotation.x,
        0.8 + mouse.y * 0.12,
        0.01
      );
    }
  });

  return (
    <group ref={coreRef}>
      <Float
        speed={2}
        rotationIntensity={0.4}
        floatIntensity={0.8}
      >
        {/* Outer wireframe */}
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[2.2, 4]} />

          <meshStandardMaterial
            color="#ffffff"
            wireframe
            transparent
            opacity={0.25}
            emissive="#00ffff"
            emissiveIntensity={1.5}
          />
        </mesh>

        {/* Inner core */}
        <mesh scale={0.72}>
          <icosahedronGeometry args={[2.2, 4]} />

          <meshPhysicalMaterial
            color="#050505"
            metalness={0.9}
            roughness={0.15}
            transmission={0.15}
            thickness={1}
            emissive="#001f22"
            emissiveIntensity={1}
          />
        </mesh>
      </Float>

      {/* Cyan orbit */}
      <mesh
        ref={ringOneRef}
        rotation={[Math.PI / 2.5, 0, 0]}
      >
        <torusGeometry
          args={[2.8, 0.012, 16, 160]}
        />

        <meshBasicMaterial
          color="#67e8f9"
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* White orbit */}
      <mesh
        ref={ringTwoRef}
        rotation={[0.8, 0.5, 0.3]}
      >
        <torusGeometry
          args={[3.2, 0.008, 16, 160]}
        />

        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
}

/* ─────────────────────────────────────────────
   HERO SCENE
───────────────────────────────────────────── */

function HeroScene() {
  return (
    <>
      <ambientLight intensity={0.35} />

      <pointLight
        position={[4, 4, 5]}
        intensity={20}
        color="#67e8f9"
      />

      <pointLight
        position={[-4, -2, 3]}
        intensity={8}
        color="#ffffff"
      />

      <Environment preset="city" />

      <Core />

      <Sparkles
        count={180}
        scale={8}
        size={1.3}
        speed={0.25}
        opacity={0.5}
      />

      <EffectComposer>
        <Bloom
          intensity={1.25}
          luminanceThreshold={0.18}
          luminanceSmoothing={0.8}
        />

        <Noise opacity={0.025} />

        <Vignette
          darkness={0.55}
          eskil={false}
        />
      </EffectComposer>
    </>
  );
}

/* ─────────────────────────────────────────────
   LAZY SECTION MOUNT
───────────────────────────────────────────── */

function LazyMount({
  children,
}: {
  children: React.ReactNode;
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "500px",
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {visible && children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   HERO ANIMATION
───────────────────────────────────────────── */

function HeroContent() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;

    if (!hero) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        delay: 1.9,
      });

      tl.fromTo(
        ".hero-label",
        {
          opacity: 0,
          y: 20,
          letterSpacing: "0.8em",
        },
        {
          opacity: 1,
          y: 0,
          letterSpacing: "0.45em",
          duration: 1,
          ease: "power3.out",
        }
      );

      tl.fromTo(
        ".hero-title",
        {
          opacity: 0,
          y: 100,
          scale: 0.96,
          filter: "blur(12px)",
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.4,
          ease: "power4.out",
        },
        "-=0.45"
      );

      tl.fromTo(
        ".hero-description",
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
        },
        "-=0.7"
      );

      tl.fromTo(
        ".hero-actions",
        {
          opacity: 0,
          y: 25,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.5"
      );

      gsap.to(".hero-title", {
        y: -12,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, hero);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={heroRef}
      className="pointer-events-none absolute inset-0 z-10 flex items-center"
    >
      <div className="mx-auto w-full max-w-7xl px-6 md:px-12">
        <div className="max-w-4xl">
          <p className="hero-label mb-7 text-[10px] tracking-[0.45em] text-cyan-300/70">
            NEXUS / DIGITAL SYSTEMS
          </p>

          <h1 className="hero-title text-[clamp(4rem,11vw,10rem)] font-semibold leading-[0.82] tracking-[-0.07em] text-white">
            BUILD
            <br />
            <span className="text-white/20">
              BEYOND.
            </span>
          </h1>

          <p className="hero-description mt-10 max-w-xl text-sm leading-7 text-white/40 md:text-base">
            We design and engineer digital experiences
            where technology, motion and visual systems
            become one.
          </p>

          <div className="hero-actions pointer-events-auto mt-9 flex flex-wrap gap-4">
            <a
              href="#capabilities"
              data-cursor
              className="group flex items-center gap-5 rounded-full bg-white px-6 py-3 text-[10px] font-medium tracking-[0.2em] text-black transition-transform duration-300 hover:scale-105"
            >
              <span>EXPLORE EXPERIENCE</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>

            <a
              href="#technology"
              data-cursor
              className="rounded-full border border-white/15 px-6 py-3 text-[10px] tracking-[0.2em] text-white/60 transition-all duration-300 hover:border-white/40 hover:text-white"
            >
              VIEW PROJECTS
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */

export default function Home() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>(
        "main > section"
      );

      sections.forEach((section, index) => {
        if (index === 0) return;

        gsap.fromTo(
          section,
          {
            opacity: 0.35,
            y: 40,
          },
          {
            opacity: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              end: "top 45%",
              scrub: true,
            },
          }
        );
      });

      // Subtle scale/zoom effect as sections enter
      sections.forEach((section, index) => {
        if (index === 0) return;

        gsap.fromTo(
          section,
          {
            scale: 0.985,
          },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 90%",
              end: "top 50%",
              scrub: true,
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Loader />
      <Cursor />
      <Navbar />

      <main className="bg-black">

        {/* HERO */}
        <section
          id="hero"
          className="relative h-screen min-h-[700px] overflow-hidden bg-black"
        >
          <div className="absolute inset-0">
            <Canvas
              camera={{
                position: [0, 0, 8],
                fov: 45,
              }}
              dpr={[1, 2]}
            >
              <HeroScene />
            </Canvas>
          </div>

          <HeroContent />

          <div className="pointer-events-none absolute bottom-8 left-6 z-20 text-[9px] tracking-[0.35em] text-white/20 md:left-12">
            SCROLL TO EXPLORE
          </div>

          <div className="pointer-events-none absolute bottom-8 right-6 z-20 font-mono text-[9px] text-white/20 md:right-12">
            001 / 006
          </div>
        </section>

        {/* PHILOSOPHY */}
        <section
          id="philosophy"
          className="relative flex min-h-screen items-center overflow-hidden bg-black px-6 py-40 text-white md:px-12"
        >
          <div className="mx-auto w-full max-w-7xl">
            <div className="grid gap-16 md:grid-cols-[180px_1fr]">
              <div>
                <p className="text-[10px] tracking-[0.4em] text-cyan-300/60">
                  002 / PHILOSOPHY
                </p>
              </div>

              <div>
                <h2 className="max-w-6xl text-[clamp(3rem,7vw,7rem)] font-semibold leading-[0.95] tracking-[-0.05em]">
                  Technology should
                  <br />
                  <span className="text-white/20">
                    disappear into
                  </span>
                  <br />
                  the experience.
                </h2>

                <p className="mt-12 max-w-xl text-sm leading-8 text-white/40">
                  We believe the best digital products feel
                  effortless. Behind that simplicity is
                  thoughtful engineering, intentional motion
                  and obsessive attention to detail.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SHOWCASE */}
        <LazyMount>
          <Showcase />
        </LazyMount>

        {/* TECHNOLOGY */}
        <LazyMount>
          <Technology />
        </LazyMount>

        {/* MANIFESTO */}
        <Manifesto />

        {/* PROCESS */}
        <Process />

        {/* CONTACT */}
        <Contact />

        {/* FOOTER */}
        <footer className="border-t border-white/10 bg-black px-6 py-8 text-white/20 md:px-12">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-[9px] tracking-[0.3em] sm:flex-row">
            <span>NEXUS DIGITAL SYSTEMS</span>

            <span>
              © 2026 / ALL SYSTEMS OPERATIONAL
            </span>
          </div>
        </footer>

      </main>
    </>
  );
}