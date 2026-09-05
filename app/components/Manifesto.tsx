"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const lines = [
  "WE DON'T BUILD",
  "WEBSITES.",
  "WE BUILD",
  "EXPERIENCES.",
];

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const linesRef = useRef<HTMLDivElement[]>([]);
  const statementRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      /* ===================================================== */
      /* REDUCED MOTION                                          */
      /* ===================================================== */

      if (reducedMotion) {
        gsap.set(linesRef.current, {
          yPercent: 0,
          opacity: 1,
        });

        gsap.set(
          [descriptionRef.current, numberRef.current],
          {
            opacity: 1,
            y: 0,
          }
        );

        return;
      }

      /* ===================================================== */
      /* LINE REVEAL                                              */
      /* ===================================================== */

      gsap.fromTo(
        linesRef.current,
        {
          yPercent: 115,
          opacity: 0,
        },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.15,
          stagger: 0.13,
          ease: "power4.out",
          scrollTrigger: {
            trigger: section,
            start: "top 72%",
            once: true,
          },
        }
      );

      /* ===================================================== */
      /* METADATA                                                 */
      /* ===================================================== */

      gsap.fromTo(
        numberRef.current,
        {
          opacity: 0,
          y: 18,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            once: true,
          },
        }
      );

      /* ===================================================== */
      /* DESCRIPTION                                              */
      /* ===================================================== */

      gsap.fromTo(
        descriptionRef.current,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 64%",
            once: true,
          },
        }
      );

      /* ===================================================== */
      /* STATEMENT PARALLAX                                       */
      /* ===================================================== */

      if (statementRef.current) {
        gsap.to(statementRef.current, {
          y: -70,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }

      /* ===================================================== */
      /* DESCRIPTION DEPTH                                       */
      /* ===================================================== */

      if (descriptionRef.current) {
        gsap.to(descriptionRef.current, {
          y: -35,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }

      /* ===================================================== */
      /* ATMOSPHERIC GLOW                                        */
      /* ===================================================== */

      if (glowRef.current) {
        gsap.to(glowRef.current, {
          x: 120,
          y: -80,
          scale: 1.15,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        });
      }
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="manifesto"
      className="relative overflow-hidden bg-black px-6 py-40 text-white md:px-10 md:py-56"
    >
      {/* =================================================== */}
      {/* ATMOSPHERE                                            */}
      {/* =================================================== */}

      <div
        ref={glowRef}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.025] blur-[120px]"
      />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(0,255,255,0.018),transparent_48%)]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* =================================================== */}
        {/* TOP METADATA                                          */}
        {/* =================================================== */}

        <div
          ref={numberRef}
          className="manifesto-number mb-16 flex items-center justify-between border-b border-white/10 pb-6 text-[10px] uppercase tracking-[0.3em] text-white/30"
        >
          <span>04 / Manifesto</span>

          <span>Beyond the ordinary</span>
        </div>

        {/* =================================================== */}
        {/* MAIN STATEMENT                                        */}
        {/* =================================================== */}

        <div
          ref={statementRef}
          className="max-w-6xl will-change-transform"
        >
          {lines.map((line, index) => (
            <div
              key={line}
              className="overflow-hidden"
            >
              <div
                ref={(element) => {
                  if (element) {
                    linesRef.current[index] = element;
                  }
                }}
                className={`will-change-transform text-[clamp(3.2rem,9vw,9rem)] font-medium leading-[0.88] tracking-[-0.07em] ${
                  index === 1 || index === 3
                    ? "text-white/25"
                    : "text-white"
                }`}
              >
                {line}
              </div>
            </div>
          ))}
        </div>

        {/* =================================================== */}
        {/* BOTTOM CONTENT                                        */}
        {/* =================================================== */}

        <div
          ref={descriptionRef}
          className="manifesto-description mt-24 grid gap-10 border-t border-white/10 pt-8 will-change-transform md:grid-cols-[1fr_2fr]"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/30">
              Our perspective
            </p>
          </div>

          <div className="max-w-2xl">
            <p className="text-xl leading-8 text-white/50 md:text-2xl md:leading-9">
              Technology is only the beginning. The real work is
              creating digital experiences that feel considered,
              alive and impossible to ignore.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}